package com.example.campus_map.repositories;

import com.example.campus_map.entities.MapInteraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapInteractionRepository extends JpaRepository<MapInteraction, Long> {
}
