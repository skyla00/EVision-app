package com.springboot.order.repository;

import com.springboot.order.entity.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderHeaderRepository extends JpaRepository<OrderHeader, String> {
    List<OrderHeader> findByMemberMemberId(String memberId);
    List<OrderHeader> findByMemberMemberIdAndOrderDateBetween(String memberId, LocalDate startDate, LocalDate endDate);
    List<OrderHeader> findByOrderDateBetween(LocalDate startDate, LocalDate endDate);
}
