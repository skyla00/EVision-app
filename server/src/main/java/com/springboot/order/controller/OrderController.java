package com.springboot.order.controller;

import com.springboot.dto.MultiResponseDto;
import com.springboot.order.dto.OrderDto;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import com.springboot.order.mapper.OrderMapper;
import com.springboot.order.service.OrderService;
import com.springboot.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
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
    public ResponseEntity postOrder(@Valid @RequestBody OrderDto.Post requestBody) {

        OrderHeader orderHeader = orderMapper.orderPostDtoToOrder(requestBody);
//        OrderHeader createOrder = orderService.createOrder(orderHeader, orderHeader.getOrderItemList(), authentication);
        OrderHeader createOrder = orderService.createOrder(orderHeader, orderHeader.getOrderItems());
        URI location = UriCreator.createUri(ORDER_DEFAULT_URL, createOrder.getOrderHeaderId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{order-header-id}")
    public ResponseEntity patchOrder(@PathVariable("order-header-id") @Positive String orderHeaderId,
                                     @Valid @RequestBody OrderDto.Patch orderPatchDto) {
        orderPatchDto.setOrderHeaderId(orderHeaderId);
        OrderHeader updatedOrderHeader = orderMapper.orderPatchDtoToOrder(orderPatchDto);
//        OrderHeader orderHeader = orderService.updateOrder(orderHeaderId, updatedOrderHeader, updatedOrderHeader.getOrderItemList());
        OrderHeader orderHeader = orderService.updateOrder(orderHeaderId, updatedOrderHeader, updatedOrderHeader.getOrderItems());

        return new ResponseEntity<>(orderMapper.orderToOrderResponseDto(orderHeader), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAcceptedOrders(@Positive @RequestParam int page,
                                            @Positive @RequestParam int size,
                                            Authentication authentication) {
        Page<OrderItem> pageOrderItems = orderService.findAcceptedOrders(page - 1, size, authentication);
        List<OrderItem> orderItems = pageOrderItems.getContent();

        // OrderItem을 OrderItemDto로 변환
        List<OrderDto.OrderItemDto> orderItemDtos = orderItems.stream()
                .map(orderMapper::orderItemToOrderItemDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(
                new MultiResponseDto<>(orderItemDtos, pageOrderItems),
                HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getAllOrders(@PathVariable("member-id")
                                        @Positive @RequestParam int page,
                                        @Positive @RequestParam int size,
                                        Authentication authentication) {
        Page<OrderHeader> pageOrderHeaders = orderService.findAllOrders(page - 1, size, authentication);
        List<OrderHeader> orderHeaders = pageOrderHeaders.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(orderMapper.orderHeadersToOrderResponseDtos(orderHeaders), pageOrderHeaders),
                HttpStatus.OK);
    }
//    @GetMapping("/{member-id}")
//    public ResponseEntity getOrders(@PathVariable("member-id")
//                                    @Positive @RequestParam int page,
//                                    @Positive @RequestParam int size,
//                                    Authentication authentication) {
//        Page<OrderHeader> pageOrderHeaders = orderService.findOrders(page - 1, size, authentication);
//        List<OrderHeader> orderHeaders = pageOrderHeaders.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(orderMapper.ordersToOrderResponseDtos(orderHeaders), pageOrderHeaders),
//                HttpStatus.OK);
//    }
}
