package com.example.campus_map.controllers;

import com.example.campus_map.dto.AuthenticationRequest;
import com.example.campus_map.dto.AuthenticationResponse;
import com.example.campus_map.entities.Admin;
import com.example.campus_map.services.AdminService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admins")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private AdminService adminService;

    private static final String JWT_SECRET = "Hind@17@2002=";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable Long id) {
        Optional<Admin> admin = Optional.ofNullable(adminService.getAdminById(id));
        if (admin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }
        return ResponseEntity.ok(admin.get());
    }

    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        if (adminService.isAdminIdExists(admin.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Admin ID already exists");
        }

        Admin createdAdmin = adminService.addAdmin(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody Admin admin) {
        if (!adminService.isAdminIdExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }

        Admin existingAdmin = adminService.getAdminById(id);

        // Update only if a new password is provided
        if (admin.getPassword() != null && !admin.getPassword().isEmpty()) {
            admin.setPassword(passwordEncoder.encode(admin.getPassword())); // Hash the new password
        } else {
            admin.setPassword(existingAdmin.getPassword()); // Retain the old password
        }

        Admin updatedAdmin = adminService.updateAdmin(id, admin);
        return ResponseEntity.ok(updatedAdmin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        if (!adminService.isAdminIdExists(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }

        adminService.deleteAdmin(id);
        return ResponseEntity.ok("Admin deleted successfully.");
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            Optional<Admin> optionalAdmin = adminService.findByEmail(authenticationRequest.getEmail());

            if (optionalAdmin.isEmpty()) {
                logger.warn("Login attempt failed for email: {}", authenticationRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
            }

            Admin admin = optionalAdmin.get();

            // Check password match
            boolean isPasswordMatch = passwordEncoder.matches(authenticationRequest.getPassword(), admin.getPassword());
            if (!isPasswordMatch) {
                logger.warn("Password mismatch for email: {}", authenticationRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
            }

            // Generate the JWT token
            String token = Jwts.builder()
                    .setSubject(authenticationRequest.getEmail())
                    .claim("roles", admin.getRole())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                    .signWith(SignatureAlgorithm.HS512, JWT_SECRET.getBytes())
                    .compact();

            // Construct response with all fields populated
            AuthenticationResponse response = new AuthenticationResponse(
                    token,
                    admin.getId(),
                    admin.getFirstName(),
                    admin.getLastName(),
                    admin.getEmail(),
                    admin.getPosition(),
                    admin.getPhoneNumber()
            );

            // Log response for debugging purposes
            logger.info("Authentication response: {}", response);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("An error occurred during login for email: {}", authenticationRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login.");
        }
    }



    // Logout Endpoint for Admin
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout successful");
    }
}
