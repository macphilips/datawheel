package com.datawheel.demo.domain;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "counter")
@TypeDefs({
    @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
})
public class Counter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "count")
    private Long count;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
//    @Basic(fetch = FetchType.LAZY)
    private List<CounterHistory> counterHistory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public List<CounterHistory> getCounterHistory() {
        return counterHistory;
    }

    public void setCounterHistory(List<CounterHistory> counterHistory) {
        this.counterHistory = counterHistory;
    }

    @Override
    public String toString() {
        return "Counter{" + "id=" + id + ", count=" + count + ", counterHistory=" + counterHistory + '}';
    }
}
