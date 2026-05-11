package com.example.campus_map.repositories;

import com.example.campus_map.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    long countByStartTimeAfter(LocalDateTime currentDate);

    List<Event> findDistinctByStartTimeAfter(LocalDateTime currentDate);
}