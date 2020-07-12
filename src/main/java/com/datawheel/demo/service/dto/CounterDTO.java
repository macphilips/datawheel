package com.datawheel.demo.service.dto;

import com.datawheel.demo.domain.Counter;
import com.datawheel.demo.domain.CounterHistory;

import java.util.List;

public class CounterDTO {
    private Long id;
    private Long totalCount;
    private List<CounterHistory> counterHistory;

    public CounterDTO() {
    }

    public CounterDTO(Counter counter) {
        this.id = counter.getId();
        this.totalCount = counter.getCount();
        this.counterHistory = counter.getCounterHistory();
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

    public List<CounterHistory> getCounterHistory() {
        return counterHistory;
    }

    public void setCounterHistory(List<CounterHistory> counterHistory) {
        this.counterHistory = counterHistory;
    }

    @Override
    public String toString() {
        return "CounterDTO{" +
            "id=" + id +
            ", totalCount=" + totalCount +
            ", counterHistory=" + counterHistory +
            '}';
    }
}
