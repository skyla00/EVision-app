package com.springboot.order.repository;

import com.springboot.order.entity.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHeaderRepository extends JpaRepository<OrderHeader, String> {
    List<OrderHeader> findByMemberMemberId(String memberId);
}
