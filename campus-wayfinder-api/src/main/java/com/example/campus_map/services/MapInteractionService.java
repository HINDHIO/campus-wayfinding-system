package com.example.campus_map.services;

import com.example.campus_map.entities.MapInteraction;
import com.example.campus_map.repositories.MapInteractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MapInteractionService {

    @Autowired
    private MapInteractionRepository mapInteractionRepository;

    public List<MapInteraction> getAllInteractions() {
        return mapInteractionRepository.findAll();
    }

    public MapInteraction getInteractionById(Long id) {
        return mapInteractionRepository.findById(id).orElse(null);
    }

    public MapInteraction addInteraction(MapInteraction interaction) {
        return mapInteractionRepository.save(interaction);
    }

    public void deleteInteraction(Long id) {
        mapInteractionRepository.deleteById(id);
    }
}