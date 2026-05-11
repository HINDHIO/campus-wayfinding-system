import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  private baseUrl = 'http://localhost:8080/api/mapbox';

  constructor(private http: HttpClient) {}

  getMapboxToken(): Observable<string> {
    return this.http.get(`${this.baseUrl}/token`, { responseType: 'text' }); // Expect plain text
  }

  getDirections(start: string, end: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/directions`, { params: { start, end } });
  }

  geocodeAddress(address: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/geocode`, { params: { address } });
  }
}
