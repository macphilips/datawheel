package com.datawheel.demo.service;

import com.datawheel.demo.domain.Counter;
import com.datawheel.demo.repository.CounterRepository;
import com.datawheel.demo.service.dto.CounterDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
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
        Counter counter = Optional.ofNullable(counterDTO.getId())
            .flatMap(counterRepository::findById)
            .orElse(new Counter());

        counter.setCount(counterDTO.getTotalCount());
        return counterRepository.save(counter);
    }

}
