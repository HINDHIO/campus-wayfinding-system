import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {EventFormComponent} from "../../components/event/event-form/event-form.component";
import {EventListComponent} from "../../components/event/event-list/event-list.component";
import {EventComponent} from "../../components/event/event.component";
import {PanelRegistrationComponent} from "../../components/panel-registration/panel-registration.component";
import {ApprovedPanelsComponent} from "../../components/approved-panels/approved-panels.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule, // To support reactive forms if needed for future functionalities
    HttpClientModule,    // To enable HTTP requests in MapsComponent for map data
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    EventFormComponent,
    EventListComponent,
    EventComponent,
    PanelRegistrationComponent,
    ApprovedPanelsComponent

  ]
})
export class AdminLayoutModule {}
