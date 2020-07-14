package com.datawheel.demo.controller;

import com.datawheel.demo.DemoApplication;
import com.datawheel.demo.domain.Counter;
import com.datawheel.demo.repository.CounterRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = DemoApplication.class)
@AutoConfigureMockMvc
@Transactional
class CounterCrtlTest {
    @Autowired
    private CounterRepository counterRepository;

    @Autowired
    private MockMvc restUserMockMvc;

    public Counter createCounter() {
        Counter counter = new Counter();
        counter.setTotalClicks(12L);
        return (counter);
    }

    @BeforeEach
    void cleanUp() {
        counterRepository.deleteAll();
    }

    @Test
    void getCountShouldThrow() throws Exception {
        restUserMockMvc.perform(get("/api/counter")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.detail").value("Counter not found"));

    }

    @Test
    void getCounter() throws Exception {
        Counter counter = createCounter();
        counterRepository.saveAndFlush(counter);
        restUserMockMvc.perform(get("/api/counter")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.totalClicks").value(counter.getTotalClicks()));

    }

    @Test
    void createCounters() throws Exception {
        // should create a new counter
        restUserMockMvc.perform(post("/api/counter")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"totalClicks\": 6 }"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.totalClicks").value(6));
    }

    @Test
    void createCounterShouldThrowBadRequestError() throws Exception {
        restUserMockMvc.perform(post("/api/counter")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"totalClicks\": 56,  \"id\": 8 }"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.detail").value("Use PUT request to update entity"));
    }

    @Test
    void updateExistingCounter() throws Exception {
        Counter counter = createCounter();
        counter = counterRepository.saveAndFlush(counter);

        restUserMockMvc.perform(put("/api/counter")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"totalClicks\": 56, \"id\": " + counter.getId() + " }"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.totalClicks").value(56));

        assertThat(counterRepository.getOne(counter.getId()).getTotalClicks()).isEqualTo(56L);
    }

    @Test
    void updateCounterShouldCreateCounterIfNotExist() throws Exception {

        restUserMockMvc.perform(put("/api/counter")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"totalClicks\": 56 }"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.totalClicks").value(56));

    }
}
