package com.springboot.order.service;

import com.springboot.customer.entity.Customer;
import com.springboot.customer.repository.CustomerRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.item.entity.Item;
import com.springboot.item.entity.PurchasePrice;
import com.springboot.item.entity.Supplier;
import com.springboot.item.repository.ItemRepository;
import com.springboot.item.repository.PurchasePriceRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import com.springboot.order.repository.OrderHeaderRepository;
import com.springboot.order.repository.OrderItemRepository;
import com.springboot.salesprice.repository.SalesPriceRepository;
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
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    private final OrderHeaderRepository orderHeaderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;
    private final PurchasePriceRepository purchasePriceRepository;
    private final MemberService memberService;
    private static final String NUMBERS = "0123456789";
    private static final int LENGTH = 4;

    public OrderService(OrderHeaderRepository orderHeaderRepository, OrderItemRepository orderItemRepository, CustomerRepository customerRepository, ItemRepository itemRepository, PurchasePriceRepository purchasePriceRepository, MemberService memberService) {
        this.orderHeaderRepository = orderHeaderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.itemRepository = itemRepository;
        this.purchasePriceRepository = purchasePriceRepository;
        this.memberService = memberService;
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
        for (OrderItem orderItem : orderHeader.getOrderItems()) {
            Item item = itemRepository.findByItemCode(orderItem.getItem().getItemCode());
            if (item != null) {
                orderItem.setItem(item);
                orderItem.setOrderHeader(savedOrderHeader);

                // purchaseAmount 입력
                Integer purchaseAmount = purchasePriceRepository.findPurchaseAmountByItemCode(item.getItemCode());
                if(purchaseAmount == null) {
                    throw new BusinessLogicException(ExceptionCode.PURCHASE_AMOUNT_NOT_FOUND);
                }
                orderItem.setPurchaseAmount(purchaseAmount);

                // salesAmount 입력
                // orderItem의 itemCode랑 orderHeader의 customerCode를 참고해서 가져오기.
                int salesAmount = orderItem.getSalesAmount();
                orderItem.setSalesAmount(salesAmount);

                // marginAmount 입력
                int marginAmount = marginAmountCalculation(salesAmount, purchaseAmount);

                orderItem.setMarginAmount(marginAmount);

                // marginRate 입력
                int marginRate = marginRateCalculation(marginAmount, orderItem.getSalesAmount());
                if(orderItem.getSalesAmount() == 0 || marginAmount == 0) {
                    marginRate = 0;
                }
                orderItem.setMarginRate(marginRate);

                // finalAmount 입력
                long finalAmount = finalAmountCalculation(orderItem.getSalesAmount(),orderItem.getOrderItemQuantity());
                orderItem.setFinalAmount(finalAmount);

                createOrderItems.add(orderItem);
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
    public List<OrderHeader> findAllOrders(String memberId, Authentication authentication) {

        if(memberId == null) {
            return orderItemRepository.findAll().stream()
                    .filter(orderItem -> orderItem.getOrderHeader().getOrderHeaderStatus().equals(OrderHeader.OrderHeaderStatus.ACCEPT))
                    .map(OrderItem::getOrderHeader)
                    .collect(Collectors.toList());
        } else if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_TL"))) {
            if(memberId.equals((String) authentication.getPrincipal())) {
                return orderHeaderRepository.findAll();
            } else {
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            }
        } else if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_TM"))) {
            if(memberId.equals((String) authentication.getPrincipal())) {
                return orderHeaderRepository.findByMember_MemberId(memberId);
            } else {
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            }
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

    public String generateOrderNumber() {
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

    public int marginAmountCalculation (int salesAmount, int purchaseAmount) {
        return salesAmount - purchaseAmount;
    }

    public int marginRateCalculation (int marginAmount, int salesAmount) {
        if(salesAmount == 0) {
            return 0;
        }
        return (marginAmount * 100) / salesAmount;
    }

    public long finalAmountCalculation (int salesAmount, int orderItemQuantity) {
        return (long) salesAmount * orderItemQuantity;
    }
}