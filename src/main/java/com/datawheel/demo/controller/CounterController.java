package com.datawheel.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/counter")
public class CounterController {
    @PutMapping("/increment")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCounter() {

    }

}
