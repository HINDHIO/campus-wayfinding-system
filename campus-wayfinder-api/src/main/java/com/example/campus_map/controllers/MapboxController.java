package com.example.campus_map.controllers;

import com.example.campus_map.services.MapboxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mapbox")
public class MapboxController {

    @Autowired
    private MapboxService mapboxService;

    @GetMapping("/directions")
    public String getDirections(@RequestParam String start, @RequestParam String end) {
        return mapboxService.getDirections(start, end);
    }

    @GetMapping("/geocode")
    public double[] geocodeAddress(@RequestParam String address) {
        String geocodeResponse = mapboxService.geocode(address);
        return mapboxService.parseGeocodeResponse(geocodeResponse);
    }

    @GetMapping("/token")
    public ResponseEntity<String> getMapboxToken() {
        return ResponseEntity.ok()
                .header("Content-Type", "text/plain") // Ensure plain text response
                .body(mapboxService.getPublicToken());
    }

}
