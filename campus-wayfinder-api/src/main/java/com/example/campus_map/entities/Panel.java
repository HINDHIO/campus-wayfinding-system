package com.example.campus_map.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Panel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String ipAddress;

    @NotNull
    private double latitude;

    @NotNull
    private double longitude;

    @NotNull
    private String buildingName;

    @NotNull
    private String status; // PENDING, APPROVED, REJECTED

}
