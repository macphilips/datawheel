package com.datawheel.demo.domain;

import java.io.Serializable;

public class CounterHistory implements Serializable {
    private Long count;
    private Long timestamp;

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}
