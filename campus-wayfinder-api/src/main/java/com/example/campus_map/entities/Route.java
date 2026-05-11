package com.example.campus_map.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private double startLatitude;

    @NotNull
    private double startLongitude;

    @NotNull
    private double endLatitude;

    @NotNull
    private double endLongitude;

    @NotNull
    private double distance;  // Distance in meters

    private double estimatedTime;
}
