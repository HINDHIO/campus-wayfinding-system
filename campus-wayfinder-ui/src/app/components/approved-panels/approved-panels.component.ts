import { Component, OnInit } from '@angular/core';
import { PanelService } from 'src/service/panel.service';
import { Panel } from 'src/app/models/panel.model';

@Component({
  selector: 'app-approved-panels',
  templateUrl: './approved-panels.component.html',
  styleUrls: ['./approved-panels.component.scss'],
})
export class ApprovedPanelsComponent implements OnInit {
  approvedPanels: Panel[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  message: string = ''; // Snackbar message
  messageType: string = ''; // Snackbar message type ('success' or 'error')

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.loadApprovedPanels();
  }

  loadApprovedPanels(): void {
    this.isLoading = true;
    this.panelService.getApprovedPanels().subscribe({
      next: (panels) => {
        this.approvedPanels = panels;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching approved panels:', error);
        this.errorMessage = 'Failed to load approved panels.';
        this.isLoading = false;
      },
    });
  }

  deletePanel(panelId: number): void {
    if (confirm('Are you sure you want to delete this panel?')) {
      this.panelService.deletePanel(panelId).subscribe({
        next: () => {
          this.approvedPanels = this.approvedPanels.filter(
            (panel) => panel.id !== panelId
          );
          this.showMessage('Panel deleted successfully.', 'success');
        },
        error: (error) => {
          console.error('Error deleting panel:', error);
          this.showMessage('Failed to delete the panel.', 'error');
        },
      });
    }
  }

  showMessage(msg: string, type: string): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000); // Snackbar disappears after 3 seconds
  }
}
