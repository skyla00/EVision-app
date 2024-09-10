package com.springboot.order.repository;

import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderHeader.OrderHeaderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderHeaderRepository extends JpaRepository<OrderHeader, String> {
    Page<OrderHeader> findByMember_MemberId(String memberId, Pageable pageable);
    List<OrderHeader> findByOrderHeaderStatus(OrderHeaderStatus status);
}
