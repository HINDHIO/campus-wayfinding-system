import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/admin/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/admin/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/admin/event/event-form', title: 'Add New Event', icon: 'ni-calendar-grid-58 text-blue', class: '' },
  { path: '/admin/event/event-list', title: 'View Events', icon: 'ni-calendar-grid-58 text-blue', class: '' },
  { path: '/admin/panel-registration', title: 'Register Panel', icon: 'ni-settings text-green', class: '' },
  { path: '/admin/approved-panels', title: 'Approved Panels', icon: 'ni-check-bold text-info', class: '' }, // Add approved panels to the sidebar

];




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
