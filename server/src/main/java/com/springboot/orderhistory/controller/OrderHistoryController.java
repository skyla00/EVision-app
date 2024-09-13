package com.springboot.orderhistory.controller;

import com.springboot.orderhistory.dto.OrderHistoryDto;
import com.springboot.orderhistory.service.OrderHistoryService;
import com.springboot.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order-histories")
@Validated
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

    public OrderHistoryController(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

    @GetMapping
    public ResponseEntity getOrderHeaderHistory(@RequestParam (value = "order-header-id") String orderHeaderId) {
        OrderHistoryDto.OrderHistoryResponse response = orderHistoryService.findOrderHistory(orderHeaderId);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

}
