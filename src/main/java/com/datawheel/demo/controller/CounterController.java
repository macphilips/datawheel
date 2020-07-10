package com.datawheel.demo.controller;

import com.datawheel.demo.service.CounterService;
import com.datawheel.demo.service.dto.CounterDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/counter")
public class CounterController {
    private final CounterService counterService;

    public CounterController(CounterService counterService) {
        this.counterService = counterService;
    }

    @PostMapping
    public CounterDTO createCounter(@RequestBody CounterDTO counterDTO) {
        if (counterDTO.getId() != null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Counter not found");
        return new CounterDTO(counterService.updateOrCreateCounter(counterDTO));
    }

    @PutMapping
    public CounterDTO updateCounter(@RequestBody CounterDTO counterDTO) {
        if (counterDTO.getId() == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Counter not found");
        return new CounterDTO(counterService.updateOrCreateCounter(counterDTO));
    }

    @GetMapping
    public CounterDTO getCounter() {
        return counterService.getCounter()
            .map(CounterDTO::new)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Counter not found"));
    }

}
