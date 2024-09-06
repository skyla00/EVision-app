package com.springboot.order.repository;

import com.springboot.order.entity.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderHeaderRepository extends JpaRepository<OrderHeader, String> {

}
