package com.springboot.order.controller;

import com.springboot.member.dto.FavoriteDto;
import com.springboot.member.service.MemberService;
import com.springboot.order.dto.OrderDto;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.mapper.OrderMapper;
import com.springboot.order.service.OrderService;
import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import com.springboot.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/orders")
@Validated
@Slf4j
public class OrderController {

    private final static String ORDER_DEFAULT_URL = "/orders";

    private final OrderMapper orderMapper;
    private final OrderService orderService;
    private final MemberService memberService;

    public OrderController(OrderMapper orderMapper, OrderService orderService, MemberService memberService) {
        this.orderMapper = orderMapper;
        this.orderService = orderService;
        this.memberService = memberService;
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

        OrderHeader updatedOrderHeader = orderMapper.orderPatchDtoToOrder(orderPatchDto);
        OrderHeader orderHeader = orderService.updateOrder(orderHeaderId, updatedOrderHeader, updatedOrderHeader.getOrderItems(), authentication);

        return new ResponseEntity<>(orderMapper.orderToOrderResponseDto(orderHeader), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllOrders(@RequestParam(value = "member-id", required = false) String memberId,
                                       @RequestParam(value = "order-header-id", required = false) String orderHeaderId,
                                       Authentication authentication) {

        if (orderHeaderId != null) {
            OrderHeader orderHeader = orderService.findOrder(orderHeaderId);
            return new ResponseEntity<>(new SingleResponseDto<>(orderMapper.orderToOrderResponseDto(orderHeader)), HttpStatus.OK);
        } else {
            List<OrderHeader> orderHeaders = orderService.findAllOrders(memberId, authentication);

            return new ResponseEntity<>(
                    new OrderDto.MultiResponseDto<>(orderMapper.orderHeadersToOrderResponseDtos(orderHeaders)),
                    HttpStatus.OK);
        }
    }

        @PostMapping("/favorite")
        public ResponseEntity favoriteOrder(@RequestParam("order-header-id") String orderHeaderId, Authentication authentication) {

            FavoriteDto.Request favoriteRequest = new FavoriteDto.Request();
            favoriteRequest.setOrderHeaderId(orderHeaderId);
            favoriteRequest.setMemberId((String) authentication.getPrincipal());

            FavoriteDto.Response response = memberService.favoriteOrder(favoriteRequest, authentication);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);
        }

        @GetMapping("/graph")
        public ResponseEntity getOrderGraph(@RequestParam(value = "member-id") String memberId) {

            OrderDto.GraphResponse graphResponse = orderService.getOrderGraph(memberId);

            return new ResponseEntity<>(graphResponse, HttpStatus.OK);
        }
}