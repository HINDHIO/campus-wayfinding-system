import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/service/location.service';
import { EventService } from 'src/service/event.service';
import { Event } from 'src/app/models/event.model';
import { Location } from 'src/app/models/location.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  locations: Location[] = []; // List of all locations
  paginatedLocations: Location[] = []; // Locations to be displayed on the current page
  searchQuery: string = '';
  selectedLocation: Location | null = null; // Selected location for adding an event
  eventForm: FormGroup; // Form group for event details
  currentPage: number = 1;
  pageSize: number = 5;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  constructor(
    private locationService: LocationService,
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    // Initialize the event form with validation
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadLocations();
  }

  // Load all locations
  loadLocations() {
    this.locationService.getAllLocations().subscribe(
      (data) => {
        console.log('Fetched Locations Data:', data);
        this.locations = data;
        this.updatePaginatedLocations();
      },
      (error) => {
        console.error('Error loading locations:', error);
      }
    );
  }

  // Filter locations based on the search query and update pagination
  get filteredLocations(): Location[] {
    if (!this.searchQuery) {
      return this.locations;
    }
    return this.locations.filter((location) =>
      location.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Update paginated locations based on the current page and page size
  updatePaginatedLocations(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedLocations = this.filteredLocations.slice(startIndex, startIndex + this.pageSize);
  }

  // Handle search input change
  onSearch() {
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedLocations();
  }

  // Navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedLocations();
    }
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < Math.ceil(this.filteredLocations.length / this.pageSize)) {
      this.currentPage++;
      this.updatePaginatedLocations();
    }
  }

  // Select a location for adding an event
  selectLocation(location: Location) {
    this.selectedLocation = location;
  }

  // Submit the event form
  onSubmit() {
    if (this.eventForm.valid && this.selectedLocation) {
      const newEvent: Event = {
        ...this.eventForm.value,
        location: this.selectedLocation // Assign selected location directly to the event
      };

      this.eventService.createEvent(newEvent).subscribe(
        (response) => {
          console.log('Event added successfully:', response);
          this.selectedLocation = null; // Clear selection after submission
          this.eventForm.reset(); // Reset the form
          this.message = 'Event added successfully!';
          this.messageType = 'success';
          setTimeout(() => {
            this.message = null;
            this.messageType = null;
          }, 3000);
        },
        (error) => {
          console.error('Error adding event:', error);
          this.message = 'Failed to add event.';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = null;
            this.messageType = null;
          }, 3000);
        }
      );
    } else {
      this.message = 'Please select a location and fill in all required fields.';
      this.messageType = 'error';
      setTimeout(() => {
        this.message = null;
        this.messageType = null;
      }, 3000);
    }
  }

  // Cancel the event creation process
  cancelEventCreation(): void {
    this.selectedLocation = null;
    this.eventForm.reset();
  }

  protected readonly Math = Math;
}
