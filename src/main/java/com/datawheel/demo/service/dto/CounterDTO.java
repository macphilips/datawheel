package com.datawheel.demo.service.dto;

import com.datawheel.demo.domain.Counter;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object for the Counter Entity
 */

@Data // This annotation helps us generate boilerplate get/set/hash/equal/toString methods
@NoArgsConstructor // Generates a constructor with no arguments
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
