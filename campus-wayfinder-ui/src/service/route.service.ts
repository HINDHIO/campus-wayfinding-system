import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from 'src/app/models/route.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private baseUrl = `${environment.apiUrl}/routes`;

  constructor(private http: HttpClient) {}

  getAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.baseUrl);
  }

  getRouteById(id: number): Observable<Route> {
    return this.http.get<Route>(`${this.baseUrl}/${id}`);
  }

  createRouteWithMapbox(start: string, end: string): Observable<Route> {
    return this.http.post<Route>(`${this.baseUrl}/calculate?start=${start}&end=${end}`, {});
  }

  updateRoute(id: number, route: Route): Observable<Route> {
    return this.http.put<Route>(`${this.baseUrl}/${id}`, route);
  }

  deleteRoute(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
