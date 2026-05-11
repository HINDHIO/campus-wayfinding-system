import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapInteraction } from 'src/app/models/mapinteraction.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapInteractionService {
  private baseUrl = `${environment.apiUrl}/interactions`;

  constructor(private http: HttpClient) {}

  getAllInteractions(): Observable<MapInteraction[]> {
    return this.http.get<MapInteraction[]>(this.baseUrl);
  }

  getInteractionById(id: number): Observable<MapInteraction> {
    return this.http.get<MapInteraction>(`${this.baseUrl}/${id}`);
  }

  logInteraction(interaction: MapInteraction): Observable<MapInteraction> {
    return this.http.post<MapInteraction>(this.baseUrl, interaction);
  }

  deleteInteraction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
