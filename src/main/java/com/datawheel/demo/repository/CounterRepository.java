package com.datawheel.demo.repository;

import com.datawheel.demo.domain.Counter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * A DAO repository for Counter entity
 */
@Repository
public interface CounterRepository extends JpaRepository<Counter, Long> {
}
