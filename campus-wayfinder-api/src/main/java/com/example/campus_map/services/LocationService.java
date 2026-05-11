package com.example.campus_map.services;

import com.example.campus_map.dto.LocationDTO;
import com.example.campus_map.entities.Location;
import com.example.campus_map.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<LocationDTO> getAllLocationDTOs() {
        List<Location> locations = locationRepository.findAll();
        return locations.stream().map(location -> {
            LocationDTO dto = new LocationDTO();
            dto.setId(location.getId());
            dto.setName(location.getName());
            dto.setType(location.getType());
            dto.setDescription(location.getDescription());
            dto.setLatitude(location.getLatitude());
            dto.setLongitude(location.getLongitude());
            dto.setArea(location.getArea());
            return dto;
        }).collect(Collectors.toList());
    }

    public Location getLocationById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }

    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<Location> addLocations(List<Location> locations) {
        return locationRepository.saveAll(locations);
    }

    public Location updateLocation(Long id, Location updatedLocation) {
        Location location = getLocationById(id);
        if (location != null) {
            location.setName(updatedLocation.getName());
            location.setType(updatedLocation.getType());
            location.setLatitude(updatedLocation.getLatitude());
            location.setLongitude(updatedLocation.getLongitude());
            location.setDescription(updatedLocation.getDescription());
            location.setArea(updatedLocation.getArea());
            return locationRepository.save(location);
        }
        return null;
    }

    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }
}
