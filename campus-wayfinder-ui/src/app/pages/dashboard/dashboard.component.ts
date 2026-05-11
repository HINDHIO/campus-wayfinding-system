import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public upcomingEventsCount: number = 0;
  public activeLocationsCount: number = 0;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    // Fetch upcoming events count
    this.eventService.getUpcomingEventsCount().subscribe(
      (count) => {
        this.upcomingEventsCount = count;
      },
      (error) => {
        console.error('Error fetching upcoming events count:', error);
      }
    );

    // Fetch active locations count
    this.eventService.getActiveLocationsCount().subscribe(
      (count) => {
        this.activeLocationsCount = count;
      },
      (error) => {
        console.error('Error fetching active locations count:', error);
      }
    );
  }
}
