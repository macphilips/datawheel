package com.datawheel.demo.repository;

import com.datawheel.demo.domain.Counter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounterRepository extends JpaRepository<Counter, Long> {
//    public List<Counter> getFirst();
}
