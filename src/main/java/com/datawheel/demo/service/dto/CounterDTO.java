package com.datawheel.demo.service.dto;

import com.datawheel.demo.domain.Counter;

public class CounterDTO {
    public Long id;
    private Long count;

    public CounterDTO() {
    }

    public CounterDTO(Counter counter) {
        this.id = counter.getId();
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
