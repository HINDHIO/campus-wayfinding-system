package com.example.campus_map.entities;

import com.example.campus_map.dto.EventDTO;
import com.example.campus_map.dto.LocationDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    private String eventName;

    @NotNull
    @Column(length = 500)
    private String description;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;



    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    public EventDTO toDTO() {
        LocationDTO locationDTO = location != null ? new LocationDTO(location) : null;
        return new EventDTO(id, eventName, description, startTime, endTime, locationDTO);
    }


}
