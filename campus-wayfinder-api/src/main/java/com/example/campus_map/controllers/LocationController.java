package com.example.campus_map.controllers;

import com.example.campus_map.dto.LocationDTO;
import com.example.campus_map.entities.Location;
import com.example.campus_map.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    // Get all locations as DTOs
    @GetMapping
    public ResponseEntity<List<LocationDTO>> getAllLocations() {
        try {
            List<LocationDTO> locationDTOs = locationService.getAllLocationDTOs();
            return ResponseEntity.ok(locationDTOs);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(500).build(); // Return a 500 error if something goes wrong
        }
    }

    // Get location by ID
    @GetMapping("/{id}")
    public ResponseEntity<LocationDTO> getLocationById(@PathVariable Long id) {
        Location location = locationService.getLocationById(id);
        if (location != null) {
            LocationDTO dto = new LocationDTO();
            dto.setId(location.getId());
            dto.setName(location.getName());
            dto.setType(location.getType());
            dto.setDescription(location.getDescription());
            dto.setLatitude(location.getLatitude());
            dto.setLongitude(location.getLongitude());
            dto.setArea(location.getArea());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create multiple locations
    @PostMapping("/bulk")
    public ResponseEntity<List<Location>> createLocations(@RequestBody List<Location> locations) {
        try {
            List<Location> createdLocations = locationService.addLocations(locations);
            return ResponseEntity.ok(createdLocations);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(500).build(); // Return a 500 error if something goes wrong
        }
    }

    // Update a location by ID
    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location location) {
        Location updatedLocation = locationService.updateLocation(id, location);
        if (updatedLocation != null) {
            return ResponseEntity.ok(updatedLocation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a location by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        try {
            locationService.deleteLocation(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(500).build(); // Return a 500 error if something goes wrong
        }
    }
}
