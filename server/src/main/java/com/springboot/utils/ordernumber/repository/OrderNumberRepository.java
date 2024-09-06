package com.springboot.utils.ordernumber.repository;

import com.springboot.utils.ordernumber.entity.OrderNumber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderNumberRepository extends JpaRepository<OrderNumber, Long> {
    boolean existsByOrderNumber(String orderNumber);
}
