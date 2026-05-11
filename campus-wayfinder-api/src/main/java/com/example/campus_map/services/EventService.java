package com.example.campus_map.services;

import com.example.campus_map.dto.EventDTO;
import com.example.campus_map.entities.Event;
import com.example.campus_map.entities.Location;
import com.example.campus_map.repositories.EventRepository;
import com.example.campus_map.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private LocationRepository locationRepository;

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream().map(Event::toDTO).collect(Collectors.toList());
    }

    public EventDTO getEventById(Long id) {
        return eventRepository.findById(id).map(Event::toDTO).orElse(null);
    }

    public EventDTO addEvent(EventDTO eventDTO) {
        Location location = locationRepository.findById(eventDTO.getLocation().getId())
                .orElseThrow(() -> new RuntimeException("Location not found"));
        Event event = new Event(
                null,
                eventDTO.getEventName(),
                eventDTO.getDescription(),
                eventDTO.getStartTime(),
                eventDTO.getEndTime(),
                location
        );
        return eventRepository.save(event).toDTO();
    }

    public EventDTO updateEvent(Long id, EventDTO updatedEventDTO) {
        Event event = eventRepository.findById(id).orElse(null);
        if (event != null) {
            Location location = locationRepository.findById(updatedEventDTO.getLocation().getId())
                    .orElseThrow(() -> new RuntimeException("Location not found"));
            event.setEventName(updatedEventDTO.getEventName());
            event.setDescription(updatedEventDTO.getDescription());
            event.setStartTime(updatedEventDTO.getStartTime());
            event.setEndTime(updatedEventDTO.getEndTime());
            event.setLocation(location);
            return eventRepository.save(event).toDTO();
        }
        return null;
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
    public long countUpcomingEvents() {
        return eventRepository.countByStartTimeAfter(LocalDateTime.now());
    }

    public long countActiveLocations() {
        return eventRepository.findDistinctByStartTimeAfter(LocalDateTime.now()).stream()
                .map(event -> event.getLocation().getId())
                .distinct()
                .count();
    }
    public List<EventDTO> getAllEventLocations() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(Event::toDTO)
                .collect(Collectors.toList());
    }
}
