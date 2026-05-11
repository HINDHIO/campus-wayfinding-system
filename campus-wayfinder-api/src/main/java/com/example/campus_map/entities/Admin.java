package com.example.campus_map.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Admin {
    @Id
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String firstName;

    @NotNull
    @Size(min = 2, max = 50)
    private String lastName;


    @NotNull
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;


    private String position;

    @Email
    private String email;

    private String phoneNumber;

    @NotNull
    private String role = "ADMIN";
}
