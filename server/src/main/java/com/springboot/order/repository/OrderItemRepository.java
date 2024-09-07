package com.springboot.order.repository;

import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    Page<OrderItem> findAll(Pageable pageable);
}
