package com.springboot.orderhistory.repository;

import com.springboot.orderhistory.entity.OrderHeaderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderHeaderHistoryRepository extends JpaRepository<OrderHeaderHistory, Long> {
    OrderHeaderHistory findByOrderHeaderId (String orderHeaderId);
}
