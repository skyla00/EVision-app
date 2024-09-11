package com.springboot.order.repository;

import com.springboot.order.entity.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderHeaderRepository extends JpaRepository<OrderHeader, String> {
    List<OrderHeader> findByMemberMemberId(String memberId);
}
