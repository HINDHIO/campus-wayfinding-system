import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public listTitles: any[];
  public location: Location;
  public pageTitle: string = 'Dashboard';
  public userName: string = '';
  public userPoste: string | null = '';

  constructor(location: Location, private element: ElementRef, private router: Router, private authService: AuthService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    // Update page title based on navigation changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.pageTitle = this.getTitle();
    });

    // Get user data from AuthService
    const userInfo = this.authService.getAdminInfo();
    if (userInfo) {
      this.userName = `${userInfo.firstName} ${userInfo.lastName}`;
      this.userPoste = userInfo.position;
    }
  }

  getTitle() {
    let path = this.location.prepareExternalUrl(this.location.path());
    if (path.charAt(0) === '#') {
      path = path.slice(1);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === path) {
        return this.listTitles[item].title;
      }
      if (this.listTitles[item].children) {
        for (let child of this.listTitles[item].children) {
          if (child.path === path) {
            return child.title;
          }
        }
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.authService.logout();
  }
}
