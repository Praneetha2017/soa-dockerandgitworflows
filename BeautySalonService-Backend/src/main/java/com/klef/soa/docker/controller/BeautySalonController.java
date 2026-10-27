
package com.klef.soa.docker.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.docker.dto.BeautySalonRequest;
import com.klef.soa.docker.dto.BeautySalonResponse;
import com.klef.soa.docker.service.BeautySalonService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")

@RestController
@Validated
@RequestMapping("/beautysalon")
public class BeautySalonController {

    @Autowired
    private BeautySalonService service;

    @GetMapping("/")
    public String home() {
        return "Beauty Salon Project";
    }

    @PostMapping("/add")
    public ResponseEntity<BeautySalonResponse> addBeautySalon(
            @Valid @RequestBody BeautySalonRequest request) {

        return new ResponseEntity<>(
                service.add(request), HttpStatus.CREATED);
    }

    @GetMapping("/displayall")
    public ResponseEntity<List<BeautySalonResponse>> displayAll() {
        return ResponseEntity.ok(service.displayAll());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBeautySalon(
            @PathVariable Long id) {

        service.delete(id);
        return ResponseEntity.ok("Beauty salon deleted successfully.");
    }
}
