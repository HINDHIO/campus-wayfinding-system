package com.example.campus_map.dto;

import com.example.campus_map.entities.Location;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationDTO {
    private Long id;
    private String name;
    private String type;
    private double latitude;
    private double longitude;
    private String description;
    private String area;

    public LocationDTO(Location location) {
        this.id = location.getId();
        this.name = location.getName();
        this.type = location.getType();
        this.area = location.getArea();
        this.latitude = location.getLatitude();
        this.longitude = location.getLongitude();
    }
}
