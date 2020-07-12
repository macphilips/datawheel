package com.datawheel.demo.service.dto;

import com.datawheel.demo.domain.Counter;
import com.datawheel.demo.domain.CounterHistory;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CounterDTO {
    private Long id;
    private Long totalCount;
    private List<CounterHistory> counterHistory;

    public CounterDTO(Counter counter) {
        this.id = counter.getId();
        this.totalCount = counter.getCount();
        this.counterHistory = counter.getCounterHistory();
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
