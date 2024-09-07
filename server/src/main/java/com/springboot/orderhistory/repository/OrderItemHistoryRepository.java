package com.springboot.orderhistory.repository;

import com.springboot.orderhistory.entity.OrderItemHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemHistoryRepository extends JpaRepository<OrderItemHistory, Long> {
    Page<OrderItemHistory> findAll(Pageable pageable);
}
