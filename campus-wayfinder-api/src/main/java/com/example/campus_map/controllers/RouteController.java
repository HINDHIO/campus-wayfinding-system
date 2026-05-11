package com.example.campus_map.controllers;

import com.example.campus_map.entities.Route;
import com.example.campus_map.services.MapboxService;
import com.example.campus_map.services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @Autowired
    private MapboxService mapboxService;

    @GetMapping
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/{id}")
    public Route getRouteById(@PathVariable Long id) {
        return routeService.getRouteById(id);
    }

    @PostMapping("/calculate")
    public Route createRouteWithMapbox(@RequestParam String start, @RequestParam String end) {
        // Get directions from Mapbox API
        String directions = mapboxService.getDirections(start, end);

        // Create a new Route object with start and end coordinates
        Route newRoute = new Route();
        newRoute.setStartLatitude(Double.parseDouble(start.split(",")[1]));
        newRoute.setStartLongitude(Double.parseDouble(start.split(",")[0]));
        newRoute.setEndLatitude(Double.parseDouble(end.split(",")[1]));
        newRoute.setEndLongitude(Double.parseDouble(end.split(",")[0]));

        // Parse the response from Mapbox to set distance and estimated time
        newRoute = mapboxService.parseDirectionsResponse(directions, newRoute);

        // Save the route to the database
        return routeService.addRoute(newRoute);
    }

    @PutMapping("/{id}")
    public Route updateRoute(@PathVariable Long id, @RequestBody Route route) {
        return routeService.updateRoute(id, route);
    }

    @DeleteMapping("/{id}")
    public void deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
    }
}