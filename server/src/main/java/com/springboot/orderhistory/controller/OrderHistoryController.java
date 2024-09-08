package com.springboot.orderhistory.controller;

import com.springboot.dto.MultiResponseDto;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
import com.springboot.orderhistory.mapper.OrderHistoryMapper;
import com.springboot.orderhistory.service.OrderHistoryService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/order-historys")
@Validated
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;
    private final OrderHistoryMapper orderHistoryMapper;

    public OrderHistoryController(OrderHistoryService orderHistoryService, OrderHistoryMapper orderHistoryMapper) {
        this.orderHistoryService = orderHistoryService;
        this.orderHistoryMapper = orderHistoryMapper;
    }

    @GetMapping
    public ResponseEntity getOrderHistory(@Positive @RequestParam int page,
                                          @Positive @RequestParam int size) {
        Page<OrderHeaderHistory> pageOrderHeaderHistory = orderHistoryService.findOrderHeaderHistory(page - 1, size);
        List<OrderHeaderHistory> orderHeaderHistoryList = pageOrderHeaderHistory.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(orderHistoryMapper.orderHeaderHistoriesToResponseDtos(orderHeaderHistoryList), pageOrderHeaderHistory),
                HttpStatus.OK);
    }
}
