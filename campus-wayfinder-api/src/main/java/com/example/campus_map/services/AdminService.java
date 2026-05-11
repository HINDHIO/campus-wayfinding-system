package com.example.campus_map.services;

import com.example.campus_map.entities.Admin;
import com.example.campus_map.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public Admin addAdmin(Admin admin) {
        // Check if ID already exists
        if (adminRepository.existsById(admin.getId())) {
            throw new IllegalArgumentException("Admin ID already exists");
        }

        // Encode the password before saving
        String encodedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(encodedPassword);
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        Admin admin = getAdminById(id);
        if (admin != null) {
            admin.setFirstName(updatedAdmin.getFirstName());
            admin.setLastName(updatedAdmin.getLastName());
            admin.setEmail(updatedAdmin.getEmail());
            admin.setPhoneNumber(updatedAdmin.getPhoneNumber());

            // Encode the password only if it's provided and not empty
            if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
                String encodedPassword = passwordEncoder.encode(updatedAdmin.getPassword());
                admin.setPassword(encodedPassword);
            }

            return adminRepository.save(admin);
        }
        return null;
    }

    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public boolean isAdminIdExists(Long id) {
        return adminRepository.existsById(id);
    }
}
