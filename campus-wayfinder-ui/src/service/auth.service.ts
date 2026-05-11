// AuthService for Admin Entity
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Replace with your backend URL
  private tokenKey = 'auth-token';
  private adminKey = 'admin-info';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admins/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.jwt) {
            // Store token and admin details in localStorage
            localStorage.setItem(this.tokenKey, response.jwt);
            const adminInfo = {
              id: response.id,
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              position: response.position,
              phoneNumber: response.phoneNumber
            };
            localStorage.setItem(this.adminKey, JSON.stringify(adminInfo));
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    this.http.post(`${this.baseUrl}/admins/logout`, {}, { responseType: 'text', withCredentials: true })
      .subscribe(
        (response: string) => {
          if (response === "Logout successful") {
            // Clear user data from localStorage
            localStorage.removeItem(this.tokenKey);
            localStorage.removeItem(this.adminKey);
            this.isAuthenticatedSubject.next(false);
            this.router.navigate(['/login']).then(() => {
              window.location.reload(); // Ensure full reload to clear session
            });
          } else {
            console.error('Unexpected response from server:', response);
          }
        },
        error => {
          console.error('Logout error:', error);
          alert('An error occurred during logout. Please try again.');
        }
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getAdminInfo(): any {
    const adminInfo = localStorage.getItem(this.adminKey);
    return adminInfo ? JSON.parse(adminInfo) : null;
  }
}
