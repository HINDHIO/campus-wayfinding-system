<div align="center">


# Campus Wayfinding System
### Al Akhawayn University

**Interactive 3D Navigation · Event Management · Kiosk Panels · Admin Dashboard**

[![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Mapbox](https://img.shields.io/badge/Mapbox_GL_JS-3D_Maps-000000?style=flat-square&logo=mapbox&logoColor=white)](https://www.mapbox.com)
[![Spring Security](https://img.shields.io/badge/Spring_Security-JWT-6DB33F?style=flat-square&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

A full-stack GIS campus navigation platform delivering interactive 3D maps,
intelligent route planning, real-time event management, and IP-aware kiosk
panel displays for Al Akhawayn University.

</div>

---

## 📸 Screenshots

| **3D Map & Navigation** | **Admin Dashboard** |
|:---:|:---:|
| <img width="1200" alt="3D Map" src="https://github.com/user-attachments/assets/ca15090f-60d9-450d-82ba-28201f5aad5c" /> | <img width="1200" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/c2b7f57b-b638-4c03-bcf1-f319b8a6fafe" /> |
| **Event Management** | **Panel Registration** |
| <img width="1200" alt="Event Management" src="https://github.com/user-attachments/assets/325d4f08-b1f6-4273-85ec-6166990ca3f0" /> | <img width="1200" alt="Panel Registration" src="https://github.com/user-attachments/assets/86488c23-7cf3-49e5-9d01-94671192c62d" /> |


---

## 🔍 What It Does

The Campus Wayfinding System solves a real problem at Al Akhawayn University:
students, faculty, and visitors need an intuitive way to navigate an unfamiliar
campus, find live event information, and locate specific facilities — all from
both personal devices and fixed kiosk terminals.

The system operates in two distinct modes:

### 🔐 Admin Mode
A secure web portal for authorised staff to manage the entire campus data layer:
- Login via JWT-authenticated portal
- Create, edit, and delete campus events with location pinning on the map
- Add and update buildings, facilities, and accessibility information
- Register physical kiosk panels by IP address and assign their campus coordinates
- Full visibility over map interactions and user activity

### 🖥️ User / Kiosk Mode
A touch-optimised display deployed on physical campus panels — no login required:
- Real-time 3D interactive campus map (pan, zoom, rotate)
- Automatic IP-based location detection on first boot
- Admin-triggered panel registration linking the device to its physical coordinates
- Location-aware content — nearby events and facilities surface automatically
- Building popups with name, purpose, accessibility features, and current events

---

## ✨ Feature Highlights

| Feature | Detail |
|---|---|
| **3D Campus Map** | Mapbox GL JS with custom campus coordinates, textured buildings, and landmark highlights |
| **Route Planning** | Point-to-point route calculation with visual overlay on the 3D map |
| **Accessibility Routing** | Buildings with ramps, elevators, and accessible entrances are marked and filterable |
| **Event Management** | Full CRUD — events linked to map locations with name, description, date, and time |
| **Panel System** | IP-detected kiosk registration; location-aware content per panel |
| **Building Info Popups** | Click any building for purpose, accessibility info, and live events |
| **Admin Dashboard** | Role-based access, full system control, map interaction analytics |
| **JWT Security** | Protected API endpoints, role separation (Admin vs User) |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Angular Frontend (SPA)                     │
│        Components · Pages · Services · Mapbox GL JS          │
└───────────────────────────┬──────────────────────────────────┘
                            │  REST API  (HTTP / JSON)
┌───────────────────────────▼──────────────────────────────────┐
│                Spring Boot Backend                            │
│     Controllers ──► Services ──► Repositories ──► Entities   │
└───────────────────────────┬──────────────────────────────────┘
                            │  JPA / Hibernate
┌───────────────────────────▼──────────────────────────────────┐
│                      Database                                 │
│                 MySQL / PostgreSQL                            │
└───────────────────────────┬──────────────────────────────────┘
                            │  External API
┌───────────────────────────▼──────────────────────────────────┐
│                   Mapbox API                                  │
│          3D Tiles · Routing · Geocoding                       │
└──────────────────────────────────────────────────────────────┘
```

---

## 🟦 Backend — Spring Boot

**Root package:** `com.example.campus_map`

```
campus-wayfinder-api/
└── src/main/java/com/example/campus_map/
    │
    ├── controllers/                  # HTTP layer — handles all incoming requests
    │   ├── AdminController           # Admin CRUD operations
    │   ├── EventController           # Event create / read / update / delete
    │   ├── LocationController        # Campus building and facility endpoints
    │   ├── MapboxController          # Secure Mapbox token delivery
    │   ├── MapInteractionController  # Logs and retrieves map interaction events
    │   ├── PanelController           # Kiosk panel registration and management
    │   └── RouteController           # Route calculation and retrieval
    │
    ├── services/                     # Business logic — all rules live here
    │   ├── AdminService
    │   ├── EventService
    │   ├── LocationService
    │   ├── MapboxService
    │   ├── MapInteractionService
    │   ├── PanelService
    │   └── RouteService
    │
    ├── entities/                     # JPA database models (mapped to tables)
    │   ├── Admin
    │   ├── Event
    │   ├── Location
    │   ├── MapInteraction
    │   ├── Panel
    │   └── Route
    │
    ├── dto/                          # Data Transfer Objects (API contracts)
    │   ├── AuthenticationRequest
    │   ├── AuthenticationResponse
    │   ├── EventDTO
    │   └── LocationDTO
    │
    ├── repositories/                 # Spring Data JPA interfaces
    │   ├── AdminRepository
    │   ├── EventRepository
    │   ├── LocationRepository
    │   ├── MapInteractionRepository
    │   ├── PanelRepository
    │   └── RouteRepository
    │
    └── config/                       # Application-wide configuration
        ├── SecurityConfig            # JWT authentication + role-based access
        ├── WebConfig                 # CORS and MVC configuration
        └── MapboxConfig              # Mapbox API integration settings
```

### REST API Reference

| Domain | Method | Endpoint | Auth | Description |
|---|---|---|---|---|
| Auth | `POST` | `/api/auth/login` | ❌ | Admin login → returns JWT |
| Events | `GET` | `/api/events` | ❌ | List all events |
| Events | `POST` | `/api/events` | ✅ | Create new event |
| Events | `PUT` | `/api/events/{id}` | ✅ | Update event |
| Events | `DELETE` | `/api/events/{id}` | ✅ | Delete event |
| Locations | `GET` | `/api/locations` | ❌ | List all campus locations |
| Locations | `POST` | `/api/locations` | ✅ | Add new location |
| Locations | `PUT` | `/api/locations/{id}` | ✅ | Update location |
| Routes | `GET` | `/api/routes` | ❌ | Get available routes |
| Routes | `POST` | `/api/routes` | ✅ | Create route |
| Panels | `GET` | `/api/panels` | ✅ | List registered panels |
| Panels | `POST` | `/api/panels/register` | ✅ | Register kiosk panel |
| Mapbox | `GET` | `/api/mapbox/token` | ❌ | Retrieve secure Mapbox token |
| Interactions | `POST` | `/api/interactions` | ❌ | Log map interaction event |

✅ = Requires JWT · ❌ = Public

---

## 🟨 Frontend — Angular

**Root path:** `campus-wayfinder-ui/src/app`
Built on the **Argon Dashboard** Angular template, fully customised for campus navigation.

```
campus-wayfinder-ui/src/app/
│
├── components/                   # Reusable UI building blocks
│   ├── navbar/                   # Top navigation bar
│   ├── sidebar/                  # Admin sidebar navigation
│   ├── footer/                   # Page footer
│   ├── event/                    # Event form + event list card
│   ├── approved-panels/          # Panel approval display
│   └── panel-registration/       # Panel IP registration form
│
├── pages/                        # Full route-level screens
│   ├── dashboard/                # Admin analytics overview
│   ├── login/                    # Admin authentication
│   ├── register/                 # Admin account creation
│   ├── maps/                     # Core 3D navigation interface (Mapbox)
│   ├── tables/                   # Data tables for locations / events
│   ├── icons/                    # UI icon reference
│   ├── user-profile/             # Admin profile management
│   └── Admin_UserSelection/      # Mode switching (Admin vs Kiosk)
│
├── layouts/                      # Application shell templates
│   ├── admin-layout/             # Authenticated app shell (sidebar + navbar)
│   └── auth-layout/              # Login / register shell
│
├── models/                       # TypeScript interfaces (type safety)
│   ├── admin.model.ts
│   ├── event.model.ts
│   ├── location.model.ts
│   ├── route.model.ts
│   ├── panel.model.ts
│   ├── map-interaction.model.ts
│   └── auth.models.ts
│
├── service/                      # HTTP API communication layer
│   ├── auth.service.ts           # Login, token storage, auth guards
│   ├── admin.service.ts
│   ├── event.service.ts
│   ├── location.service.ts
│   ├── mapbox.service.ts         # Mapbox token retrieval + map init
│   ├── route.service.ts
│   ├── panel.service.ts
│   └── map-interaction.service.ts
│
└── environments/
    ├── environment.ts            # Development config
    └── environment.prod.ts       # Production config
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend Language** | Java 17+ |
| **Backend Framework** | Spring Boot 3.x |
| **Security** | Spring Security · JWT |
| **Data Access** | Spring Data JPA · Hibernate |
| **Build Tool** | Maven |
| **Frontend Framework** | Angular 17+ |
| **Frontend Language** | TypeScript 5.x |
| **UI Template** | Argon Dashboard Angular |
| **Styling** | SCSS |
| **Map Engine** | Mapbox GL JS (3D GIS rendering) |
| **Database** | MySQL / PostgreSQL |

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+ · npm
- Angular CLI — `npm install -g @angular/cli`
- MySQL or PostgreSQL running locally
- [Mapbox account](https://account.mapbox.com/) with an access token

---

### 🟦 Backend

```bash
# 1. Enter the backend directory
cd campus-wayfinder-api

# 2. Configure application.properties
# src/main/resources/application.properties
```

```properties
spring.application.name=Campus_map
spring.datasource.url=jdbc:mysql://localhost:3306/wayfinding_db?createDatabaseIfNotExists=true
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
server.port=8080
spring.jpa.hibernate.ddl-auto=update
spring.jpa.generate-ddl=true
spring.jpa.properties.hibernate.dialect= org.hibernate.dialect.MariaDBDialect
spring.jpa.show-sql=true
spring.jpa.open-in-view=false
server.address=0.0.0.0

mapbox.access-token=YOUR_MAPBOX_TOKEN

jwt.secret=YOUR_JWT_SECRET_KEY
jwt.expiration=86400000
```

```bash
# 3. Build and run
mvn clean install
mvn spring-boot:run
```

API available at → **http://localhost:8080**

---

### 🟨 Frontend

```bash
# 1. Enter the frontend directory
cd campus-wayfinder-ui

# 2. Install dependencies
npm install

# 3. Configure environment
# src/environments/environment.ts
```

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  mapbox: {
    accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN'
  }
};
```

```bash
# 4. Start the dev server
ng serve
```

App available at → **http://localhost:4200**

---

## 🔐 Secrets & Environment Variables

> ⚠️ Never commit real credentials. All secrets belong in environment config only.

| Variable | File | Description |
|---|---|---|
| `spring.datasource.url` | `application.properties` | Database connection URL |
| `spring.datasource.username` | `application.properties` | Database username |
| `spring.datasource.password` | `application.properties` | Database password |
| `mapbox.access-token` | `application.properties` | Mapbox token (backend) |
| `jwt.secret` | `application.properties` | JWT signing key |
| `environment.mapbox.accessToken` | `environment.ts` | Mapbox token (frontend) |

Add `application.properties` and `environment.ts` to your `.gitignore`
or use placeholder values and document real setup in this README only.

---

## 🗺️ Roadmap

- [ ] Real-time indoor positioning via BLE beacons
- [ ] Mobile application (Flutter / React Native)
- [ ] AI-based route optimisation
- [ ] QR-code physical location tagging
- [ ] WebSocket live event push updates
- [ ] Multilingual UI (Arabic · French · English)

---

## 👩‍💻 Author

**Hind Faiz**
MSc Informatics for Digital Health — University of Pisa
BSc Computer Science — Al Akhawayn University

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hind_Faiz-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/hind-faiz-6b466a288)
[![GitHub](https://img.shields.io/badge/GitHub-HINDHIO-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/HINDHIO)

---

## 📝 License

MIT — see [LICENSE](LICENSE)
