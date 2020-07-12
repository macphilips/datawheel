package com.datawheel.demo.service;

import com.datawheel.demo.domain.Counter;
import com.datawheel.demo.repository.CounterRepository;
import com.datawheel.demo.service.dto.CounterDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class CounterService {
    private final CounterRepository counterRepository;

    public CounterService(CounterRepository counterRepository) {
        this.counterRepository = counterRepository;
    }

    public Optional<Counter> getCounter() {
        List<Counter> all = counterRepository.findAll();
        Counter counter = all.size() == 1 ? all.get(0) : null;
        return Optional.ofNullable(counter);
    }

    public Counter updateOrCreateCounter(CounterDTO counterDTO) {
        Counter counter = getCounter()
            .orElse(new Counter());

        counter.setCount(counterDTO.getTotalCount());
        counter.setCounterHistory(counterDTO.getCounterHistory());
        return counterRepository.save(counter);
    }

}
