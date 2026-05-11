package com.example.campus_map.services;

import com.example.campus_map.config.MapboxConfig;
import com.example.campus_map.entities.Route;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MapboxService {

    @Autowired
    private MapboxConfig mapboxConfig;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getDirections(String start, String end) {
        String url = "https://api.mapbox.com/directions/v5/mapbox/driving/{start};{end}?access_token={token}&geometries=geojson";
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("start", start);
        uriVariables.put("end", end);
        uriVariables.put("token", mapboxConfig.getSecretToken()); // Use the secret token for backend requests

        return restTemplate.getForObject(url, String.class, uriVariables);
    }

    public String geocode(String address) {
        String url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{address}.json?access_token={token}";
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("address", address);
        uriVariables.put("token", mapboxConfig.getSecretToken()); // Use the secret token for backend requests

        return restTemplate.getForObject(url, String.class, uriVariables);
    }

    public double[] parseGeocodeResponse(String geocodeResponse) {
        JSONObject jsonResponse = new JSONObject(geocodeResponse);
        JSONArray coordinates = jsonResponse.getJSONArray("features")
                .getJSONObject(0)
                .getJSONObject("geometry")
                .getJSONArray("coordinates");

        double longitude = coordinates.getDouble(0);
        double latitude = coordinates.getDouble(1);

        return new double[]{latitude, longitude};
    }

    public Route parseDirectionsResponse(String directions, Route newRoute) {
        JSONObject jsonResponse = new JSONObject(directions);
        double distance = jsonResponse.getJSONArray("routes")
                .getJSONObject(0)
                .getDouble("distance");
        double duration = jsonResponse.getJSONArray("routes")
                .getJSONObject(0)
                .getDouble("duration");

        double estimatedTime = duration / 60.0;

        newRoute.setDistance(distance);
        newRoute.setEstimatedTime(estimatedTime);

        return newRoute;
    }

    public String getPublicToken() {
        return mapboxConfig.getPublicToken(); // Provide the public token for frontend use
    }
}
