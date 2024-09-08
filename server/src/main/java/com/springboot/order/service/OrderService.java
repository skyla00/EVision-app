package com.springboot.order.service;

import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.service.MemberService;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import com.springboot.order.repository.OrderHeaderRepository;
import com.springboot.order.repository.OrderItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class OrderService {

    private final OrderHeaderRepository orderHeaderRepository;
    private final OrderItemRepository orderItemRepository;
    private static final String NUMBERS = "0123456789";
    private static final int LENGTH = 4;


    public OrderService(OrderHeaderRepository orderHeaderRepository, OrderItemRepository orderItemRepository, MemberService memberService) {
        this.orderHeaderRepository = orderHeaderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public OrderHeader createOrder(OrderHeader orderHeader, List<OrderItem> orderItemList) {

//        verifiedAuthenticationUser(authentication);
        String orderNumber = generateOrderNumber();orderHeader.setOrderHeaderId(orderNumber);
        verifiedOrderDate(orderHeader);

        for (OrderItem orderItem : orderItemList) {
            orderItem.setOrderHeader(orderHeader);
//            orderHeader.setOrderItem(orderItem);
            orderHeader.getOrderItems().add(orderItem);
        }

        OrderHeader savedOrderHeader = orderHeaderRepository.save(orderHeader);
        orderItemRepository.saveAll(orderItemList);

        return savedOrderHeader;
    }

    public OrderHeader updateOrder(String orderHeaderId, OrderHeader updatedOrderHeader, List<OrderItem> updatedOrderItems) {
        OrderHeader existingOrderHeader = orderHeaderRepository.findById(orderHeaderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + orderHeaderId));

        // 기존 데이터 업데이트 (OrderHeader 필드 업데이트)
        existingOrderHeader.setOrderDate(updatedOrderHeader.getOrderDate());
        existingOrderHeader.setAcceptDate(updatedOrderHeader.getAcceptDate());
        existingOrderHeader.setOrderHeaderStatus(updatedOrderHeader.getOrderHeaderStatus());

        // 기존 OrderItems 삭제 후 새로운 아이템으로 교체
        existingOrderHeader.getOrderItems().clear();
        for (OrderItem updatedOrderItem : updatedOrderItems) {
            updatedOrderItem.setOrderHeader(existingOrderHeader);
//            existingOrderHeader.setOrderItem(updatedOrderItem);
            existingOrderHeader.getOrderItems().add(updatedOrderItem);
        }

        // 업데이트된 OrderHeader와 OrderItems 저장
        orderHeaderRepository.save(existingOrderHeader);
        orderItemRepository.saveAll(updatedOrderItems);

        return existingOrderHeader;
    }

    // 주문관리에서 본인 주문만 조회

    @Transactional(readOnly = true)
    public Page<OrderHeader> findOrders(int page, int size, Authentication authentication) {

        verifiedAuthenticationUser(authentication);
        return orderHeaderRepository.findAll(PageRequest.of(page, size, Sort.by("orderHeaderId")));
    }

    // 관리자가 주문관리에서 모든 주문 조회
    @Transactional(readOnly = true)
    public Page<OrderHeader> findAllOrders(int page, int size, Authentication authentication) {

        verifiedAuthenticationAdmin(authentication);
        return orderHeaderRepository.findAll(PageRequest.of(page, size, Sort.by("orderHeaderId")));
    }


    // 주문조회에서 승인완료 상태의 모든 주문 조회
    @Transactional(readOnly = true)
    public Page<OrderItem> findAcceptedOrders(int page, int size, Authentication authentication) {

        verifiedAuthenticationUser(authentication);
        return orderItemRepository.findAll(PageRequest.of(page, size, Sort.by("orderHeaderId")));
    }

    public void verifiedOrderDate(OrderHeader orderHeader) {
        Date currentDate = new Date();
        if(orderHeader.getOrderDate().after(currentDate)) {
//            throw new InvalidOrderDateException(404, "주문 일자는 오늘 날짜 이후일 수 없습니다.");
            throw new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND);
        }
    }

    public OrderHeader findVerifiedOrder(String orderHeaderId){
        Optional<OrderHeader> optionalOrderHeader = orderHeaderRepository.findById(orderHeaderId);
        OrderHeader findOrderHeader = optionalOrderHeader.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
        return findOrderHeader;
    }

    public void verifiedAuthenticationUser(Authentication authentication) {
        if(!authentication.getAuthorities().contains(new SimpleGrantedAuthority("TM"))) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public void verifiedAuthenticationAdmin(Authentication authentication) {
        if(!authentication.getAuthorities().contains(new SimpleGrantedAuthority("TL"))) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    private String generateOrderNumber() {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
        String formattedDate = currentDate.format(formatter);

        Random random = new Random();
        String randomStr;
        do {
            StringBuilder stringBuilder = new StringBuilder(LENGTH);
            for (int i = 0; i < LENGTH; i++) {
                int randomIndex = random.nextInt(NUMBERS.length());
                stringBuilder.append(NUMBERS.charAt(randomIndex));
            }
            randomStr = stringBuilder.toString();
        } while (orderHeaderRepository.existsById(formattedDate + randomStr));

        return formattedDate + randomStr;
    }

}