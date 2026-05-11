package com.example.campus_map.controllers;

import com.example.campus_map.entities.MapInteraction;
import com.example.campus_map.services.MapInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interactions")
public class MapInteractionController {

    @Autowired
    private MapInteractionService mapInteractionService;

    @GetMapping
    public List<MapInteraction> getAllInteractions() {
        return mapInteractionService.getAllInteractions();
    }

    @GetMapping("/{id}")
    public MapInteraction getInteractionById(@PathVariable Long id) {
        return mapInteractionService.getInteractionById(id);
    }

    @PostMapping
    public MapInteraction logInteraction(@RequestBody MapInteraction interaction) {
        return mapInteractionService.addInteraction(interaction);
    }

    @DeleteMapping("/{id}")
    public void deleteInteraction(@PathVariable Long id) {
        mapInteractionService.deleteInteraction(id);
    }
}
