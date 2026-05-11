import { Component, OnDestroy } from '@angular/core';
import { PanelService } from 'src/service/panel.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-mode-selection',
  templateUrl: './mode-selection.component.html',
  styleUrls: ['./mode-selection.component.scss']
})
export class ModeSelectionComponent implements OnDestroy {
  isLoading = false;
  private pollingSubscription: Subscription | null = null;

  constructor(private panelService: PanelService, private router: Router) {}

  selectAdmin() {
    this.router.navigate(['/login']);
  }

  selectUser() {
    this.isLoading = true;

    this.getIPAddress()
      .then((ipAddress) => {
        const panelData = {
          ipAddress,
          latitude: 0, // Default value, to be updated by admin
          longitude: 0, // Default value, to be updated by admin
          buildingName: null, // Admin will set the location
          status: 'PENDING', // Initial status
        };

        // Pass the panelData object to registerPanel
        this.panelService.registerPanel(panelData).subscribe({
          next: (panel) => {
            this.isLoading = false;
            alert('Registration request sent. Please wait for admin approval.');

            // Start polling to check if the panel is approved
            this.pollForApproval(panel.id!);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error:', error);
            alert('Panel registration failed. Please try again.');
          },
        });
      })
      .catch((error) => {
        this.isLoading = false;
        console.error('IP Fetch Error:', error);
        alert('Could not fetch IP address. Please check your network.');
      });
  }

  private pollForApproval(panelId: number): void {
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.panelService.getPanelById(panelId).subscribe({
        next: (panel) => {
          if (panel && panel.status === 'APPROVED') {
            this.pollingSubscription?.unsubscribe(); // Stop polling
            this.router.navigate(['/maps']); // Redirect to the global /maps route
          }
        },
        error: (error) => {
          console.error('Error polling for approval:', error);
        },
      });
    });
  }



  private async getIPAddress(): Promise<string> {
    try {
      const response: any = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to fetch IP address:', error);
      throw new Error('IP fetch failed');
    }
  }

  ngOnDestroy(): void {
    // Clean up polling subscription if the component is destroyed
    this.pollingSubscription?.unsubscribe();
  }
}
