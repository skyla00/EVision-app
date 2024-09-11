package com.springboot.order.controller;

import com.springboot.response.MultiResponseDto;
import com.springboot.order.dto.OrderDto;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.mapper.OrderMapper;
import com.springboot.order.service.OrderService;
import com.springboot.response.SingleResponseDto;
import com.springboot.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
@Validated
@Slf4j
public class OrderController {

    private final static String ORDER_DEFAULT_URL = "/orders";

    private final OrderMapper orderMapper;
    private final OrderService orderService;

    public OrderController(OrderMapper orderMapper, OrderService orderService) {
        this.orderMapper = orderMapper;
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity postOrder(@Valid @RequestBody OrderDto.Post orderPostDto, Authentication authentication) {

        OrderHeader orderHeader = orderMapper.orderPostDtoToOrder(orderPostDto);
        OrderHeader createOrder = orderService.createOrder(orderHeader, authentication);
        URI location = UriCreator.createUri(ORDER_DEFAULT_URL, createOrder.getOrderHeaderId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{order-header-id}")
    public ResponseEntity patchOrder(@PathVariable("order-header-id") @Positive String orderHeaderId,
                                     @Valid @RequestBody OrderDto.Patch orderPatchDto, Authentication authentication) {
        orderPatchDto.setOrderHeaderId(orderHeaderId);
        OrderHeader updatedOrderHeader = orderMapper.orderPatchDtoToOrder(orderPatchDto);
        OrderHeader orderHeader = orderService.updateOrder(orderHeaderId, updatedOrderHeader, updatedOrderHeader.getOrderItems(), authentication);

        return new ResponseEntity<>(orderMapper.orderToOrderResponseDto(orderHeader), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllOrders(@RequestParam(value = "member-id", required = false) String memberId, Authentication authentication) {

        List<OrderHeader> orderHeaders = orderService.findAllOrders(memberId, authentication);

        return new ResponseEntity<>(
                new OrderDto.MultiResponseDto<>(orderMapper.orderHeadersToOrderResponseDtos(orderHeaders)),
                HttpStatus.OK);
    }
}

//
//@RequestParam(value = "order-header-id", required = false) String orderHeaderId,
//@RequestParam(value = "item-code", required = false) String itemCode,
//@RequestParam(value = "customer-code", required = false) String customerCode,
//@RequestParam(value = "member-name", required = false) String memberName,
//@RequestParam(value = "order-date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate orderDate,
//@RequestParam(value = "request-date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate requestDate,
//@RequestParam(value = "accept-date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate acceptDate,
//@Positive @RequestParam int page,
//@Positive @RequestParam int size,

//List<OrderHeader> filteredOrderHeaders = orderHeaders.stream()
//        .filter(order -> orderHeaderId == null || order.getOrderHeaderId().equals(orderHeaderId))
//        .filter(order -> itemCode == null || order.getOrderItems().stream().anyMatch(item -> item.getItem().getItemCode().equals(itemCode)))
//        .filter(order -> customerCode == null || order.getCustomer().getCustomerCode().equals(customerCode))
//        .filter(order -> memberName == null || order.getMember().getMemberName().equals(memberName))
//        .filter(order -> orderDate == null || order.getOrderDate().equals(orderDate))
//        .filter(order -> requestDate == null || order.getOrderItems().stream().anyMatch(item -> item.getRequestDate().equals(requestDate)))
//        .filter(order -> acceptDate == null || order.getAcceptDate().equals(acceptDate))
//        .collect(Collectors.toList());