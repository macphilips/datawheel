package com.datawheel.demo.service.dto;

import com.datawheel.demo.domain.Counter;

public class CounterDTO {
    private Long id;
    private Long totalCount;

    public CounterDTO() {
    }

    public CounterDTO(Counter counter) {
        this.id = counter.getId();
        this.totalCount = counter.getCount();
    }

    public Long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Long totalCount) {
        this.totalCount = totalCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "CounterDTO{" +
            "id=" + id +
            ", totalCount=" + totalCount +
            '}';
    }
}
