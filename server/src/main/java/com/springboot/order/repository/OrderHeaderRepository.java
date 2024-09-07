package com.springboot.order.repository;

import com.springboot.order.entity.OrderHeader;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderHeaderRepository extends JpaRepository<OrderHeader, String> {
    Page<OrderHeader> findAll(Pageable pageable);
}
