package com.example.campus_map.controllers;

import com.example.campus_map.dto.EventDTO;
import com.example.campus_map.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<EventDTO> eventDTOs = eventService.getAllEvents();
        return ResponseEntity.ok(eventDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        EventDTO eventDTO = eventService.getEventById(id);
        return eventDTO != null ? ResponseEntity.ok(eventDTO) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        try {
            EventDTO createdEvent = eventService.addEvent(eventDTO);
            return ResponseEntity.ok(createdEvent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO) {
        try {
            EventDTO updatedEvent = eventService.updateEvent(id, eventDTO);
            return updatedEvent != null ? ResponseEntity.ok(updatedEvent) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/upcoming/count")
    public ResponseEntity<Long> getUpcomingEventsCount() {
        long count = eventService.countUpcomingEvents();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/active-locations/count")
    public ResponseEntity<Long> getActiveLocationsCount() {
        long count = eventService.countActiveLocations();
        return ResponseEntity.ok(count);
    }
    @GetMapping("/locations")
    public ResponseEntity<?> getAllEventLocations() {
        try {
            List<EventDTO> eventLocations = eventService.getAllEventLocations();
            return ResponseEntity.ok(eventLocations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch event locations.");
        }
    }
}
