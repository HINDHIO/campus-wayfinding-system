package com.example.campus_map.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class AuthenticationRequest {
    private String email;
    private String password;

}
