package com.springboot.order.service;

import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import com.springboot.order.repository.OrderHeaderRepository;
import com.springboot.order.repository.OrderItemRepository;
import com.springboot.utils.ordernumber.entity.OrderNumber;
import com.springboot.utils.ordernumber.service.OrderNumberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderHeaderRepository orderHeaderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderNumberService orderNumberService;

    public OrderService(OrderHeaderRepository orderHeaderRepository, OrderItemRepository orderItemRepository, OrderNumber orderItem, OrderNumber orderNumber, OrderNumberService orderNumberService, MemberService memberService) {
        this.orderHeaderRepository = orderHeaderRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderNumberService = orderNumberService;
    }

    @Transactional
    public OrderHeader createOrder(OrderHeader orderHeader, List<OrderItem> orderItemList, Authentication authentication) {

        verifiedAuthenticationUser(authentication);
        String orderNumber = orderNumberService.generateOrderNumber();
        orderHeader.setOrderHeaderId(orderNumber);
        verifiedOrderDate(orderHeader);

        for (OrderItem orderItem : orderItemList) {
            orderItem.setOrderHeader(orderHeader);
            orderHeader.setOrderItem(orderItem);
        }

        OrderHeader savedOrderHeader = orderHeaderRepository.save(orderHeader);
        orderItemRepository.saveAll(orderItemList);

        return savedOrderHeader;
    }

    @Transactional
    public OrderHeader updateOrder(String orderHeaderId, OrderHeader updatedOrderHeader, List<OrderItem> updatedOrderItems) {
        OrderHeader existingOrderHeader = orderHeaderRepository.findById(orderHeaderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + orderHeaderId));

        // 기존 데이터 업데이트 (OrderHeader 필드 업데이트)
        existingOrderHeader.setOrderDate(updatedOrderHeader.getOrderDate());
        existingOrderHeader.setAcceptDate(updatedOrderHeader.getAcceptDate());
        existingOrderHeader.setOrderHeaderStatus(updatedOrderHeader.getOrderHeaderStatus());

        // 기존 OrderItems 삭제 후 새로운 아이템으로 교체
        existingOrderHeader.getOrderItemList().clear();
        for (OrderItem updatedOrderItem : updatedOrderItems) {
            updatedOrderItem.setOrderHeader(existingOrderHeader);
            existingOrderHeader.setOrderItem(updatedOrderItem);
        }

        // 업데이트된 OrderHeader와 OrderItems 저장
        orderHeaderRepository.save(existingOrderHeader);
        orderItemRepository.saveAll(updatedOrderItems);

        return existingOrderHeader;
    }

    // 주문관리에서 본인 주문만 조회

    @Transactional
    public Page<OrderHeader> findOrders(int page, int size, Authentication authentication) {

        verifiedAuthenticationUser(authentication);
        return orderHeaderRepository.findAll(PageRequest.of(page, size, Sort.by("orderHeaderId")));
    }

    // 관리자가 주문관리에서 모든 주문 조회
    @Transactional
    public Page<OrderHeader> findAllOrders(int page, int size, Authentication authentication) {

        verifiedAuthenticationAdmin(authentication);
        return orderHeaderRepository.findAll(PageRequest.of(page, size, Sort.by("orderHeaderId")));
    }


    // 주문조회에서 승인완료 상태의 모든 주문 조회
    @Transactional
    public Page<OrderItem> findAcceptedOrders(int page, int size, Authentication authentication) {

        verifiedAuthenticationUser(authentication);
        return orderItemRepository.findAll(PageRequest.of(page, size, Sort.by("orderHeaderId")));
    }

    public void verifiedOrderDate(OrderHeader orderHeader) {
        Date currentDate = new Date();
        if(orderHeader.getOrderDate().after(currentDate)) {
            throw new InvalidOrderDateException(404, "주문 일자는 오늘 날짜 이후일 수 없습니다.");
        }
    }

    public OrderHeader findVerifiedOrder(String orderHeaderId){
        Optional<OrderHeader> optionalOrderHeader = orderHeaderRepository.findById(orderHeaderId);
        OrderHeader findOrderHeader = optionalOrderHeader.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ORDER_HEADER_ID_NOT_FOUND));
        return findOrderHeader;
    }

    public void verifiedAuthenticationUser(Authentication authentication) {
        if(!authentication.getAuthorities().contains(new SimpleGrantedAuthority("USER"))) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public void verifiedAuthenticationAdmin(Authentication authentication) {
        if(!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

}
