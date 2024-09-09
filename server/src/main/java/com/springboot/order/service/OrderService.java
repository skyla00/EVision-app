package com.springboot.order.service;

import com.springboot.customer.entity.Customer;
import com.springboot.customer.repository.CustomerRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.item.entity.Item;
import com.springboot.item.repository.ItemRepository;
import com.springboot.member.entity.Member;
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
import java.util.*;

@Service
@Transactional
public class OrderService {

    private final OrderHeaderRepository orderHeaderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;
    private final MemberService memberService;
    private static final String NUMBERS = "0123456789";
    private static final int LENGTH = 4;


    public OrderService(OrderHeaderRepository orderHeaderRepository, OrderItemRepository orderItemRepository, MemberService memberService, CustomerRepository customerRepository, ItemRepository itemRepository, MemberService memberService1) {
        this.orderHeaderRepository = orderHeaderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.itemRepository = itemRepository;
        this.memberService = memberService1;
    }

    public OrderHeader createOrder(OrderHeader orderHeader, Authentication authentication) {

        // Order 생성을 위한 새로운 OrderHeader 선언
        OrderHeader createOrderHeader = new OrderHeader();

        // 권한 확인해서 조회를 요청한 멤버 정보를 새로 만든 OrderHeader에 입력
        String memberId = (String) authentication.getPrincipal();
        Member member = memberService.findMember(memberId);
        createOrderHeader.setMember(member);

        // 주문번호를 난수로 생성해서 입력
        String orderNumber = generateOrderNumber();
        createOrderHeader.setOrderHeaderId(orderNumber);

        // 주문일자(주문일자 유효성 검증) 입력
        createOrderHeader.setOrderDate(verifiedOrderDate(orderHeader));

        // 판매처 입력
        String newCustomerCode = orderHeader.getCustomer().getCustomerCode();
        Customer newCustomer = customerRepository.findByCustomerCode(newCustomerCode);
        createOrderHeader.setCustomer(newCustomer);

        // OrderHeader 먼저 저장
        OrderHeader savedOrderHeader = orderHeaderRepository.save(createOrderHeader);

        // OrderHeader에 List로 OrderItem 입력
        List<OrderItem> createOrderItems = new ArrayList<>();
        for (OrderItem orderItems : orderHeader.getOrderItems()) {
            Item item = itemRepository.findByItemCode(orderItems.getItem().getItemCode());
            if (item != null) {
                orderItems.setItem(item);
                orderItems.setOrderHeader(savedOrderHeader);
                createOrderItems.add(orderItems);
            } else {
                throw new BusinessLogicException(ExceptionCode.ORDER_ITEM_NOT_FOUND);
            }
        }

        // OrderItem 저장
        orderItemRepository.saveAll(createOrderItems);
        savedOrderHeader.setOrderItems(createOrderItems);

        return orderHeaderRepository.save(savedOrderHeader);
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
            existingOrderHeader.getOrderItems().add(updatedOrderItem);
        }

        // 업데이트된 OrderHeader와 OrderItems 저장
        orderHeaderRepository.save(existingOrderHeader);
        orderItemRepository.saveAll(updatedOrderItems);

        return existingOrderHeader;
    }

    // 관리자가 주문관리에서 모든 주문 조회
    // TM은 본인 주문만 보여야하고 TL은 모든 주문이 나와야함.
    @Transactional(readOnly = true)
    public Page<OrderHeader> findAllOrders(int page, int size, String memberId, Authentication authentication) {

        if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_TL"))) {
            return orderHeaderRepository.findAll(PageRequest.of(page, size, Sort.by("orderHeaderId")));
        } else if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_TM"))) {
            return orderHeaderRepository.findByMember_MemberId(memberId, PageRequest.of(page, size, Sort.by("orderHeaderId")));
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public LocalDate verifiedOrderDate(OrderHeader orderHeader) {
        LocalDate currentDate = LocalDate.now();
        if(orderHeader.getOrderDate().isAfter(currentDate)) {
            throw new BusinessLogicException(ExceptionCode.ORDER_DATE_NOT_CORRECT);
        }
        return orderHeader.getOrderDate();
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