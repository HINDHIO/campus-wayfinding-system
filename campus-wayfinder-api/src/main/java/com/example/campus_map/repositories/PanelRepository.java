package com.example.campus_map.repositories;

import com.example.campus_map.entities.Panel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanelRepository extends JpaRepository<Panel, Long> {
    List<Panel> findByStatus(String status);
    Panel findByIpAddressAndStatus(String ipAddress, String status);


}
