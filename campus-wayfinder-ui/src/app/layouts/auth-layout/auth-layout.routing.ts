import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import {ModeSelectionComponent} from "../../pages/Admin_UserSelection/mode-selection.component";

export const AuthLayoutRoutes: Routes = [
  { path: '', component: ModeSelectionComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];
