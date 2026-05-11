package com.example.campus_map.controllers;

import com.example.campus_map.entities.Panel;
import com.example.campus_map.services.PanelService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.List;

@RestController
@RequestMapping("/panels")
public class PanelController {

    @Autowired
    private PanelService panelService;

    @GetMapping
    public List<Panel> getAllPanels() {
        return panelService.getAllPanels();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Panel> getPanelById(@PathVariable Long id) {
        Panel panel = panelService.getPanelById(id);
        if (panel != null) {
            return ResponseEntity.ok(panel);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    @PostMapping("/register")
    public ResponseEntity<Panel> registerPanel(@RequestBody Panel panel) {
        try {
            String ipAddress = fetchPublicIpAddress(); // Fetch public IP
            panel.setIpAddress(ipAddress);
            panel.setBuildingName("Unknown Location");
            panel.setStatus("PENDING");

            Panel savedPanel = panelService.addPanel(panel);
            return ResponseEntity.ok(savedPanel);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @GetMapping("/pending")
    public List<Panel> getPendingPanels() {
        return panelService.getPendingPanels();
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Panel> approvePanel(
            @PathVariable Long id,
            @RequestBody Panel panelDetails
    ) {
        Panel panel = panelService.approvePanel(id, panelDetails);
        if (panel != null) {
            return ResponseEntity.ok(panel);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Void> rejectPanel(@PathVariable Long id) {
        try {
            panelService.rejectPanel(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String fetchPublicIpAddress() {
        try {
            URL url = new URL("https://api64.ipify.org?format=text");
            BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
            return in.readLine(); // Return the public IP address
        } catch (Exception e) {
            e.printStackTrace();
            return "UNKNOWN";
        }
    }
    @GetMapping("/approved")
    public ResponseEntity<Panel> getApprovedPanelByIP(@RequestParam String ipAddress) {
        Panel panel = panelService.getApprovedPanelByIP(ipAddress);
        if (panel != null && "APPROVED".equals(panel.getStatus())) {
            return ResponseEntity.ok(panel);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    @GetMapping("/all-approved")
    public List<Panel> getAllApprovedPanels() {
        return panelService.getApprovedPanels();
    }


}
