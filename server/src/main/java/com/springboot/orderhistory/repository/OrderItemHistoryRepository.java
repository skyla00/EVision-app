package com.springboot.orderhistory.repository;

import com.springboot.orderhistory.entity.OrderItemHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemHistoryRepository extends JpaRepository<OrderItemHistory, Long> {

     List<OrderItemHistory> findByOrderHeaderHistoryOrderHeaderHistoryId(Long orderHeaderHistoryId);

}
