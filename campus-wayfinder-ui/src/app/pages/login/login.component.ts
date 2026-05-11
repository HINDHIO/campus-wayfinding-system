import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/service/admin.service';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/admin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // Define the admin property to handle login form data
  admin: AuthenticationRequest = {
    email: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private adminService: AdminService, private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  // Add a method to handle the login action
  login(): void {
    this.adminService.login(this.admin).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Store both token and admin details in localStorage
        localStorage.setItem('authToken', response.token);
        const adminInfo = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          position: response.position,
          phoneNumber: response.phoneNumber
        };
        localStorage.setItem('admin-info', JSON.stringify(adminInfo));
        // Navigate to the admin dashboard
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else {
          this.errorMessage = 'An error occurred during login. Please try again later.';
        }
        console.error('Login failed:', err);
      },
    });
  }

}
