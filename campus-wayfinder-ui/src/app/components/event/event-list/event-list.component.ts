import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/event.service';
import { LocationService } from 'src/service/location.service';
import { Event } from 'src/app/models/event.model';
import { Location } from 'src/app/models/location.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  paginatedEvents: Event[] = [];
  locations: Location[] = []; // List to hold available locations
  selectedEvent: Event | null = null;
  currentPage = 1;
  pageSize = 5;
  updateForm: FormGroup;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  constructor(private eventService: EventService, private locationService: LocationService, private fb: FormBuilder) {
    // Initialize the update form with validation
    this.updateForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      locationId: ['', Validators.required], // Using locationId for dropdown
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadLocations(); // Load available locations for selection
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.events = data.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime)
        }));
        this.updatePaginatedEvents();
      },
      (error) => console.error('Error loading events:', error)
    );
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe(
      (locations) => {
        this.locations = locations;
      },
      (error) => console.error('Error loading locations:', error)
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedEvents();
  }

  updatePaginatedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedEvents = this.events.slice(startIndex, startIndex + this.pageSize);
  }

  get isNextPageDisabled(): boolean {
    return this.currentPage >= this.totalPages;
  }

  get totalPages(): number {
    return Math.ceil(this.events.length / this.pageSize);
  }

  editEvent(event: Event): void {
    this.selectedEvent = { ...event };
    this.updateForm.patchValue({
      eventName: event.eventName,
      description: event.description,
      startTime: (event.startTime instanceof Date) ? event.startTime.toISOString().slice(0, 16) : new Date(event.startTime).toISOString().slice(0, 16),
      endTime: (event.endTime instanceof Date) ? event.endTime.toISOString().slice(0, 16) : new Date(event.endTime).toISOString().slice(0, 16),
      locationId: event.location.id // Use location ID for selection in the form
    });
  }

  onUpdateSubmit(): void {
    if (this.updateForm.valid && this.selectedEvent) {
      const updatedEvent: Event = {
        ...this.selectedEvent,
        ...this.updateForm.value,
        startTime: new Date(this.updateForm.value.startTime),
        endTime: new Date(this.updateForm.value.endTime),
        location: this.locations.find(loc => loc.id === this.updateForm.value.locationId) // Set the location object
      };

      this.eventService.updateEvent(updatedEvent.id!, updatedEvent).subscribe(
        (response) => {
          console.log('Event updated successfully:', response);
          this.loadEvents(); // Refresh the event list
          this.selectedEvent = null; // Clear selection after update
          this.updateForm.reset(); // Reset the form
          this.displayMessage('Event updated successfully!', 'success');
        },
        (error) => {
          console.error('Error updating event:', error);
          this.displayMessage('Failed to update the event!', 'error');
        }
      );
    }
  }

  cancelUpdate(): void {
    this.selectedEvent = null;
    this.updateForm.reset();
  }

  onDelete(id: number): void {
    if (window.confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(
        () => {
          this.loadEvents(); // Refresh the event list after deletion
          this.displayMessage('Event deleted successfully!', 'success');
        },
        (error) => {
          console.error('Error deleting event:', error);
          this.displayMessage('Failed to delete the event!', 'error');
        }
      );
    }
  }

  private displayMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 3000);
  }
}
