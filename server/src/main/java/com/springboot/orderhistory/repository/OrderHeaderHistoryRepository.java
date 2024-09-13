package com.springboot.orderhistory.repository;

import com.springboot.orderhistory.entity.OrderHeaderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHeaderHistoryRepository extends JpaRepository<OrderHeaderHistory, Long> {
    List<OrderHeaderHistory> findByOrderHeaderId (String orderHeaderId);
}
