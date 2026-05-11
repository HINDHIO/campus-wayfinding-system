import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Panel } from 'src/app/models/panel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private baseUrl = `${environment.apiUrl}/panels`;

  constructor(private http: HttpClient) {}

  // Get all panels
  getAllPanels(): Observable<Panel[]> {
    return this.http.get<Panel[]>(this.baseUrl);
  }

  // Get a panel by ID
  getPanelById(panelId: number): Observable<Panel> {
    return this.http.get<Panel>(`${this.baseUrl}/${panelId}`);
  }
  getApprovedPanelByIP(ipAddress: string): Observable<Panel> {
    return this.http.get<Panel>(`${this.baseUrl}/approved`, {
      params: { ipAddress },
    });
  }


  // Register a new panel (User registration request)
  registerPanel(panelData: Partial<Panel>): Observable<Panel> {
    return this.http.post<Panel>(`${this.baseUrl}/register`, panelData);
  }

  // Fetch pending panel registration requests
  getPendingPanels(): Observable<Panel[]> {
    return this.http.get<Panel[]>(`${this.baseUrl}/pending`);
  }

  // Approve a panel registration request
  approvePanel(id: number, panelData: Partial<Panel>): Observable<Panel> {
    return this.http.put<Panel>(`${this.baseUrl}/${id}/approve`, panelData);
  }

  // Reject a panel registration request
  rejectPanel(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/reject`, {});
  }

  // Update an existing panel
  updatePanel(id: number, panelData: Panel): Observable<Panel> {
    return this.http.put<Panel>(`${this.baseUrl}/${id}`, panelData);
  }

  // Delete a panel
  deletePanel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getApprovedPanels(): Observable<Panel[]> {
    return this.http.get<Panel[]>(`${this.baseUrl}/all-approved`);
  }

}
