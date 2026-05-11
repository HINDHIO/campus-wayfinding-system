import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {EventListComponent} from "../../components/event/event-list/event-list.component";
import {EventFormComponent} from "../../components/event/event-form/event-form.component";
import {PanelRegistrationComponent} from "../../components/panel-registration/panel-registration.component";
import {ApprovedPanelsComponent} from "../../components/approved-panels/approved-panels.component";

export const AdminLayoutRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to Dashboard by default
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'event/event-form', component: EventFormComponent },
  { path: 'event/event-list', component: EventListComponent },
  { path: 'panel-registration', component: PanelRegistrationComponent },
  { path: 'approved-panels', component: ApprovedPanelsComponent }, // Add route for approved panels

];


