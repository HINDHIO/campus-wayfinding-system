package com.example.campus_map.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapboxConfig {

    @Value("${mapbox.secret.token}")
    private String secretToken;

    @Value("${mapbox.public.token}")
    private String publicToken;

    public String getSecretToken() {
        return secretToken;
    }

    public String getPublicToken() {
        return publicToken;
    }
}
