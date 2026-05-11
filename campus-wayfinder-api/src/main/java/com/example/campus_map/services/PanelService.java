package com.example.campus_map.services;

import com.example.campus_map.entities.Panel;
import com.example.campus_map.repositories.PanelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Optional;

@Service
public class PanelService {

    @Autowired
    private PanelRepository panelRepository;

    public List<Panel> getAllPanels() {
        return panelRepository.findAll();
    }

    public Panel getPanelById(Long id) {
        return panelRepository.findById(id).orElse(null);
    }

    public Panel addPanel(Panel panel) {
        return panelRepository.save(panel);
    }

    public Panel updatePanel(Long id, Panel updatedPanel) {
        Panel panel = getPanelById(id);
        if (panel != null) {
            panel.setIpAddress(updatedPanel.getIpAddress());
            panel.setLatitude(updatedPanel.getLatitude());
            panel.setLongitude(updatedPanel.getLongitude());
            panel.setBuildingName(updatedPanel.getBuildingName());
            panel.setStatus(updatedPanel.getStatus());
            return panelRepository.save(panel);
        }
        return null;
    }

    public void deletePanel(Long id) {
        panelRepository.deleteById(id);
    }

    public List<Panel> getPendingPanels() {
        return panelRepository.findByStatus("PENDING");
    }


    public Panel approvePanel(Long id, Panel panelDetails) {
        Optional<Panel> panelOptional = panelRepository.findById(id);
        if (panelOptional.isPresent()) {
            Panel panel = panelOptional.get();
            panel.setBuildingName(panelDetails.getBuildingName());
            panel.setLatitude(panelDetails.getLatitude());
            panel.setLongitude(panelDetails.getLongitude());
            panel.setStatus("APPROVED");
            return panelRepository.save(panel);
        }
        return null;
    }
    public void rejectPanel(Long id) {
        panelRepository.deleteById(id);
    }
    public Panel getApprovedPanelByIP(String ipAddress) {
        return panelRepository.findByIpAddressAndStatus(ipAddress, "APPROVED");
    }
    public List<Panel> getApprovedPanels() {
        return panelRepository.findByStatus("APPROVED");
    }

}
