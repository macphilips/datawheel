package com.datawheel.demo.service.dto;

import com.datawheel.demo.domain.Counter;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CounterDTO {
    private Long id;
    private Long totalClicks;
    private List<Long> clickTimestampHistory;

    public CounterDTO(Counter counter) {
        this.id = counter.getId();
        this.totalClicks = counter.getTotalClicks();
        this.clickTimestampHistory = counter.getClickTimestampHistory();
    }
}
