package com.example.campus_map.repositories;

import com.example.campus_map.entities.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Page<Location> findByNameContainingIgnoreCase(String name, Pageable pageable);

}
