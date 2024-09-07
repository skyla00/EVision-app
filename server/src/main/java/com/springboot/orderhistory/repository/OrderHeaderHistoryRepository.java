package com.springboot.orderhistory.repository;

import com.springboot.item.entity.Item;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderHeaderHistoryRepository extends JpaRepository<OrderHeaderHistory, Long> {
    Page<OrderHeaderHistory> findAll(Pageable pageable);
}
