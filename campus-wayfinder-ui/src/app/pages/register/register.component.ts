import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/service/admin.service';
import { Admin } from 'src/app/models/admin.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  admin: Admin = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    position: '',
    phoneNumber: ''
  };

  errorMessage: string | null = null;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {}

  register(): void {
    if (!this.admin.id) {
      this.errorMessage = 'ID is required and must be provided by the admin.';
      return;
    }

    this.adminService.createAdmin(this.admin).subscribe({
      next: (response) => {
        console.log('Admin created successfully', response);
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error) {
          if (typeof err.error === 'object') {
            // Assume it's a validation error response with field-specific messages
            this.errorMessage = Object.entries(err.error)
              .map(([field, message]) => `${field}: ${message}`)
              .join(' | ');
          } else {
            this.errorMessage = err.error; // If it's a string error message
          }
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      }
    });



  this.adminService.createAdmin(this.admin).subscribe({
      next: (response) => {
        console.log('Admin created successfully', response);
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error && typeof err.error === 'string') {
          this.errorMessage = err.error; // Display the error message from backend
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      }
    });
  }
}
