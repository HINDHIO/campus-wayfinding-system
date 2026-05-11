package com.example.campus_map.services;

import com.example.campus_map.entities.Route;
import com.example.campus_map.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route getRouteById(Long id) {
        return routeRepository.findById(id).orElse(null);
    }

    public Route addRoute(Route route) {
        return routeRepository.save(route);
    }

    public Route updateRoute(Long id, Route updatedRoute) {
        Route route = getRouteById(id);
        if (route != null) {
            route.setStartLatitude(updatedRoute.getStartLatitude());
            route.setStartLongitude(updatedRoute.getStartLongitude());
            route.setEndLatitude(updatedRoute.getEndLatitude());
            route.setEndLongitude(updatedRoute.getEndLongitude());
            route.setDistance(updatedRoute.getDistance());
            route.setEstimatedTime(updatedRoute.getEstimatedTime());
            return routeRepository.save(route);
        }
        return null;
    }

    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }
}