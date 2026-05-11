import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/service/admin.service';
import { Admin } from 'src/app/models/admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  adminForm: FormGroup;
  admin: Admin | undefined;
  isEditing = false;
  errorMessage = ''; // For error messages

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserProfile();
  }

  private initializeForm(): void {
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: [''], // Optional unless updating
      position: [''], // Add position field
    });
  }

  private loadUserProfile(): void {
    const adminInfoRaw = localStorage.getItem('admin-info');
    if (!adminInfoRaw) {
      this.router.navigate(['/login']); // Redirect to login
      return;
    }

    const adminInfo = JSON.parse(adminInfoRaw);
    if (adminInfo && adminInfo.id) {
      this.adminService.getAdminById(adminInfo.id).subscribe(
        (data: Admin) => {
          this.admin = data;
          this.adminForm.patchValue(this.admin);
        },
        (error) => {
          console.error('Failed to load user profile:', error);
          this.errorMessage = 'Failed to load user profile.';
        }
      );
    } else {
      this.router.navigate(['/login']); // Redirect if invalid session
    }
  }


  enableEditing(): void {
    this.isEditing = true;
  }

  onSubmit(): void {
    if (this.adminForm.valid && this.admin) {
      const updatedAdmin: Admin = {
        ...this.admin,
        ...this.adminForm.value,
        password: this.adminForm.value.password || this.admin.password, // Retain password if not updated
      };

      this.adminService.updateAdmin(this.admin.id, updatedAdmin).subscribe(
        () => {
          this.isEditing = false;
        },
        (error) => {
          this.errorMessage = 'Failed to update user profile.';
        }
      );
    }
  }

  onCancel(): void {
    this.isEditing = false;
    this.loadUserProfile(); // Reload profile
  }
}
