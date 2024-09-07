package com.springboot.orderhistory.service;

import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
import com.springboot.orderhistory.repository.OrderHeaderHistoryRepository;
import com.springboot.orderhistory.repository.OrderItemHistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class OrderHistoryService {

    private final OrderHeaderHistoryRepository orderHeaderHistoryRepository;
    private final OrderItemHistoryRepository orderItemHistoryRepository;

    public OrderHistoryService(OrderHeaderHistoryRepository orderHeaderHistoryRepository, OrderItemHistoryRepository orderItemHistoryRepository) {
        this.orderHeaderHistoryRepository = orderHeaderHistoryRepository;
        this.orderItemHistoryRepository = orderItemHistoryRepository;
    }

    public OrderHeaderHistory createOrderHistory(OrderHeaderHistory orderHeaderHistory) {
        return orderHeaderHistoryRepository.save(orderHeaderHistory);
    }

    @Transactional(readOnly = true)
    public OrderHeaderHistory findOrderHistory(Long orderHeaderHistoryId) {
        return findVerifiedOrderHeaderHistory(orderHeaderHistoryId);
    }

    @Transactional(readOnly = true)
    public Page<OrderHeaderHistory> findOrderHeaderHistory(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderHeaderHistoryId"));

        return orderHeaderHistoryRepository.findAll(pageable);
    }

    private OrderHeaderHistory findVerifiedOrderHeaderHistory(Long orderHeaderHistoryId) {
        Optional<OrderHeaderHistory> orderHeaderHistory = orderHeaderHistoryRepository.findById(orderHeaderHistoryId);

        return orderHeaderHistory.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }

}
