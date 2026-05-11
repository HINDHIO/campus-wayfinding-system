import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model'; // Import Panel model
import { PanelService } from 'src/service/panel.service';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/service/location.service';

@Component({
  selector: 'app-panelregistration',
  templateUrl: './panel-registration.component.html',
  styleUrls: ['./panel-registration.component.scss'],
})
export class PanelRegistrationComponent implements OnInit {
  pendingPanels: Panel[] = [];
  selectedPanel: Panel | null = null;
  locations: Location[] = [];
  selectedLocation: Location | null = null;
  message: string | null = null; // Added for displaying messages
  messageType: 'success' | 'error' | null = null; // Added for message type

  constructor(
    private panelService: PanelService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadPendingPanels();
    this.loadLocations();
  }

  loadPendingPanels(): void {
    this.panelService.getPendingPanels().subscribe({
      next: (panels) => (this.pendingPanels = panels),
      error: (err) => {
        console.error('Error loading pending panels:', err);
        this.showMessage('Failed to load pending panels.', 'error');
      },
    });
  }

  loadLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: (locations) => (this.locations = locations),
      error: (err) => {
        console.error('Error loading locations:', err);
        this.showMessage('Failed to load locations.', 'error');
      },
    });
  }

  selectPanel(panel: Panel): void {
    this.selectedPanel = panel;
  }

  approvePanel(): void {
    if (!this.selectedPanel || !this.selectedLocation) {
      this.showMessage('Please select a location.', 'error');
      return;
    }

    const panelData = {
      buildingName: this.selectedLocation.name,
      latitude: this.selectedLocation.latitude,
      longitude: this.selectedLocation.longitude,
      status: 'APPROVED',
    };

    this.panelService.approvePanel(this.selectedPanel.id!, panelData).subscribe({
      next: () => {
        this.selectedPanel = null;
        this.selectedLocation = null;
        this.loadPendingPanels();
        this.showMessage('Panel approved successfully.', 'success');
      },
      error: (err) => {
        console.error('Error approving panel:', err);
        this.showMessage('Failed to approve panel.', 'error');
      },
    });
  }

  rejectPanel(panelId: number): void {
    this.panelService.rejectPanel(panelId).subscribe({
      next: () => {
        this.loadPendingPanels();
        this.showMessage('Panel rejected successfully.', 'success');
      },
      error: (err) => {
        console.error('Error rejecting panel:', err);
        this.showMessage('Failed to reject panel.', 'error');
      },
    });
  }

  cancelApproval(): void {
    this.selectedPanel = null;
    this.selectedLocation = null;
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 3000);
  }
}
