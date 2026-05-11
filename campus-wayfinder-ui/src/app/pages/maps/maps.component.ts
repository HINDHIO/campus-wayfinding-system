import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { EventService } from 'src/service/event.service';
import { MapboxService } from 'src/service/mapbox.service';
import { LocationService } from 'src/service/location.service';
import { PanelService } from 'src/service/panel.service';
import { Event } from 'src/app/models/event.model';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  map!: mapboxgl.Map;
  events: Event[] = [];
  locations: Location[] = [];
  selectedEvents: Event[] = [];
  selectedDestination: Location | null = null; // Selected destination from the dropdown
  userLocation: { latitude: number; longitude: number } | null = null; // User's current location
  routeLayer: mapboxgl.Layer | null = null; // Layer for the highlighted route
  showEventDetailsModal: boolean = false;
  selectedEvent: Event | null = null;

  constructor(
    private eventService: EventService,
    private mapboxService: MapboxService,
    private locationService: LocationService,
    private panelService: PanelService
  ) {}

  ngOnInit() {
    this.mapboxService.getMapboxToken().subscribe((token) => {
      (mapboxgl as any).accessToken = token;
      this.initializeMap();
    });
  }

  initializeMap() {
    const bounds: mapboxgl.LngLatBoundsLike = [
      [-5.10941, 33.53484], // Southwest corner
      [-5.10285, 33.54215]  // Northeast corner
    ];

    this.map = new mapboxgl.Map({
      container: 'map-canvas',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [-5.10631, 33.53912],
      zoom: 13,
      maxBounds: bounds
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.map.fitBounds(bounds, { padding: 50 });
      this.loadLocationsAndEvents();
      this.addUserLocationMarker();
    });
  }

  loadLocationsAndEvents() {
    this.locationService.getAllLocations().subscribe((locations) => {
      this.locations = locations;

      this.eventService.getAllEvents().subscribe((events) => {
        this.events = events;
        this.addEventMarkers();
      });
    });
  }

  addEventMarkers() {
    const locationEventsMap: { [key: number]: Event[] } = {};

    this.events.forEach((event) => {
      const location = this.locations.find((loc) => loc.id === event.location.id);
      if (!location) {
        console.warn(`No location found for event: ${event.eventName}`);
        return;
      }

      if (!locationEventsMap[location.id]) {
        locationEventsMap[location.id] = [];
      }
      locationEventsMap[location.id].push(event);
    });

    Object.keys(locationEventsMap).forEach((locationId) => {
      const location = this.locations.find((loc) => loc.id === +locationId);
      if (!location) {
        console.warn(`Location not found for ID: ${locationId}`);
        return;
      }

      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#2ecc71">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
      </svg>
    `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .addTo(this.map);

      marker.getElement().addEventListener('click', () => {
        this.selectedEvents = locationEventsMap[+locationId];
        this.showEventDetailsModal = true;
      });
    });
  }

  addUserLocationMarker() {
    this.getIPAddress().then((ipAddress) => {
      this.panelService.getApprovedPanelByIP(ipAddress).subscribe({
        next: (panel) => {
          if (panel) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="red">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
            </svg>
            <div style="position: absolute; top: 30px; left: -20px; color: red; font-weight: bold;">You are here</div>
            `;

            new mapboxgl.Marker(el)
              .setLngLat([panel.longitude, panel.latitude])
              .addTo(this.map);

            this.userLocation = { latitude: panel.latitude, longitude: panel.longitude };

            this.map.flyTo({
              center: [panel.longitude, panel.latitude],
              zoom: 15,
            });
          }
        },
        error: (error) => {
          console.error('Error fetching approved panel:', error);
        },
      });
    });
  }

  highlightRouteToDestination() {
    if (!this.userLocation || !this.selectedDestination) return;

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${this.userLocation.longitude},${this.userLocation.latitude};${this.selectedDestination.longitude},${this.selectedDestination.latitude}?geometries=geojson&access_token=${(mapboxgl as any).accessToken}`;

    fetch(directionsUrl)
      .then((response) => response.json())
      .then((data) => {
        if (!data.routes || data.routes.length === 0) {
          console.error('No routes found from API');
          return;
        }

        const route = data.routes[0].geometry;

        if (this.routeLayer) {
          this.map.removeLayer('route');
          this.map.removeSource('route');
        }

        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route,
            properties: {},
          },
        });

        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#0f3dd5', // Highlight color for the route
            'line-width': 4,
          },
        });

        this.routeLayer = this.map.getLayer('route');
      })
      .catch((error) => console.error('Error fetching route:', error));
  }



  onDestinationSelected(location: Location | null) {
    if (!location) {
      this.clearRoute(); // Clear the route if "No Destination" is selected
      return;
    }
    this.selectedDestination = location;
    this.highlightRouteToDestination();
  }


  private async getIPAddress(): Promise<string> {
    try {
      const response: any = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to fetch IP address:', error);
      throw new Error('IP fetch failed');
    }
  }

  viewEventDetails(event: Event) {
    this.selectedEvent = event;
  }

  closeEventDetailsModal() {
    this.showEventDetailsModal = false;
    this.selectedEvent = null;
  }

  clearRoute(): void {
    if (this.routeLayer) {
      this.map.removeLayer('route'); // Remove the route layer
      this.map.removeSource('route'); // Remove the route source
      this.routeLayer = null; // Reset the routeLayer variable
    }
    this.selectedDestination = null; // Reset the destination
  }


}
