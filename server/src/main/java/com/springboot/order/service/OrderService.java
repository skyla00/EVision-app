package com.springboot.order.service;

import com.springboot.customer.entity.Customer;
import com.springboot.customer.repository.CustomerRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.item.entity.Item;
import com.springboot.item.repository.ItemRepository;
import com.springboot.item.repository.PurchasePriceRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.order.dto.OrderDto;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import com.springboot.order.repository.OrderHeaderRepository;
import com.springboot.order.repository.OrderItemRepository;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
import com.springboot.orderhistory.entity.OrderItemHistory;
import com.springboot.orderhistory.repository.OrderHeaderHistoryRepository;
import com.springboot.orderhistory.repository.OrderItemHistoryRepository;
import com.springboot.orderhistory.service.OrderHistoryService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
    private final OrderHistoryService orderHistoryService;
    private static final String NUMBERS = "0123456789";
    private static final int LENGTH = 4;

    public OrderService(OrderHeaderRepository orderHeaderRepository, OrderItemRepository orderItemRepository, CustomerRepository customerRepository, ItemRepository itemRepository, PurchasePriceRepository purchasePriceRepository, MemberService memberService, OrderHistoryService orderHistoryService) {
        this.orderHeaderRepository = orderHeaderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.itemRepository = itemRepository;
        this.purchasePriceRepository = purchasePriceRepository;
        this.memberService = memberService;
        this.orderHistoryService = orderHistoryService;
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
        createOrderHeader.setOrderDate(verifiedOrderDate(orderHeader.getOrderDate()));

        // 판매처 입력
        String newCustomerCode = orderHeader.getCustomer().getCustomerCode();
        Customer newCustomer = customerRepository.findByCustomerCode(newCustomerCode);
        createOrderHeader.setCustomer(newCustomer);

        // OrderHeader 먼저 저장
        OrderHeader savedOrderHeader = orderHeaderRepository.save(createOrderHeader);

        OrderHeaderHistory orderHeaderHistory = orderHistoryService.createOrderHeaderHistory(savedOrderHeader);

        // OrderHeader에 List로 OrderItem 입력
        List<OrderItem> createOrderItems = new ArrayList<>();
        for (OrderItem orderItem : orderHeader.getOrderItems()) {
            Item item = itemRepository.findByItemCode(orderItem.getItem().getItemCode());
            if (item != null) {
                orderItem.setItem(item);
                orderItem.setOrderHeader(savedOrderHeader);

                // purchaseAmount 입력
                Long purchaseAmount = purchasePriceRepository.findPurchaseAmountByItemCode(item.getItemCode());
                if (purchaseAmount == null) {
                    throw new BusinessLogicException(ExceptionCode.PURCHASE_AMOUNT_NOT_FOUND);
                }
                orderItem.setPurchaseAmount(purchaseAmount);

                // salesAmount 입력
                // orderItem의 itemCode랑 orderHeader의 customerCode를 참고해서 가져오기.
                long salesAmount = orderItem.getSalesAmount();
                orderItem.setSalesAmount(salesAmount);

                // marginAmount 입력
                long marginAmount = marginAmountCalculation(salesAmount, purchaseAmount);
                orderItem.setMarginAmount(marginAmount);

                // marginRate 입력
                double marginRate = marginRateCalculation(marginAmount, orderItem.getSalesAmount());
                if (orderItem.getSalesAmount() == 0 || marginAmount == 0) {
                    marginRate = 0;
                }
                orderItem.setMarginRate(marginRate);

                // finalAmount 입력
                long finalAmount = finalAmountCalculation(orderItem.getSalesAmount(), orderItem.getOrderItemQuantity());
                orderItem.setFinalAmount(finalAmount);

                OrderItem savedOrderItem = orderItemRepository.save(orderItem);
                createOrderItems.add(savedOrderItem);

                // orderItemHistory 생성
                orderHistoryService.createOrderItemHistory(savedOrderItem, orderHeaderHistory);

            } else {
                throw new BusinessLogicException(ExceptionCode.ORDER_ITEM_NOT_FOUND);
            }
        }

        // OrderItem 저장
        savedOrderHeader.setOrderItems(createOrderItems);
        return savedOrderHeader;
    }

    public OrderHeader updateOrder(String orderHeaderId, OrderHeader updatedOrderHeader, List<OrderItem> updatedOrderItems, Authentication authentication) {

        // 유효한 OrderHeader 확인
        OrderHeader existingOrderHeader = orderHeaderRepository.findById(orderHeaderId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));


        // 기존 orderHeader의 상태와 새로 입력된 orderHeader의 상태를 비교
        String existingStatus = existingOrderHeader.getOrderHeaderStatus().getStatus();
        String updatedStatus = updatedOrderHeader.getOrderHeaderStatus().getStatus();

        // 주문상태가 이미 '승인' 이면 수정 불가.
        if (existingStatus.equals("승인")) {
            throw new BusinessLogicException(ExceptionCode.ORDER_STATUS_ALREADY_ACCEPT);
        }

        // 요청보낸 OrderHeaderId 와 권한을 가진 id를 비교해서 수정가능 여부 체크
        if (!existingOrderHeader.getMember().getMemberId().equals((String) authentication.getPrincipal())) {
            // 관리자는 상태 수정이 가능해야하므로 관리자도 아닐 경우에만 오류 발생.
            if (!authentication.getAuthorities().contains("ROLE_TL")) {
                throw new BusinessLogicException(ExceptionCode.ORDER_UPDATE_NOT_ALLOWED);
            }
        }

        // 본인이거나 관리자인 경우에만 아래 코드들 실행

        // 현재 상태가 '승인 요청'이며, 업데이트 하려는 상태가 '승인' 일 때
        if (existingStatus.equals("승인 요청") && updatedStatus.equals("승인")) {
            // 현재 주문의 상태를 입력받은 상태인 '승인'으로 변경하면서 승인날짜에 현재 날짜 입력
            existingOrderHeader.setOrderHeaderStatus(updatedOrderHeader.getOrderHeaderStatus());
            existingOrderHeader.setAcceptDate(LocalDate.now());
            orderHistoryService.createOrderHeaderHistory(existingOrderHeader);
            return orderHeaderRepository.save(existingOrderHeader);
        // 현재 상태가 '승인 요청'이며, 업데이트 하려는 상태가 '반려' 일 때
        } else if (existingStatus.equals("승인 요청") && updatedStatus.equals("반려")) {
            // 상태만 '반려'로 업데이트.
            existingOrderHeader.setOrderHeaderStatus(updatedOrderHeader.getOrderHeaderStatus());
            orderHistoryService.createOrderHeaderHistory(existingOrderHeader);
            return orderHeaderRepository.save(existingOrderHeader);
        // 현재 상태가 '반려' 이거나 '승인 요청' 이면 상태만 되돌리기 가능.
        } else if ((existingStatus.equals("반려") || existingStatus.equals("승인 요청")) && updatedStatus.equals("임시 저장")) {
            existingOrderHeader.setOrderHeaderStatus(updatedOrderHeader.getOrderHeaderStatus());
            orderHistoryService.createOrderHeaderHistory(existingOrderHeader);
            return orderHeaderRepository.save(existingOrderHeader);
        // 현재 상태가 '임시 저장' 일 때만 주문날짜 및 주문아이템 내용들 수정 가능.
        } else if (existingStatus.equals("임시 저장")) {
            existingOrderHeader.setOrderHeaderStatus(updatedOrderHeader.getOrderHeaderStatus());
            existingOrderHeader.setOrderDate(updatedOrderHeader.getOrderDate());

            OrderHeaderHistory orderHeaderHistory = orderHistoryService.createOrderHeaderHistory(existingOrderHeader);

            // 기존 OrderItems 삭제 후 새로운 아이템으로 교체
            existingOrderHeader.getOrderItems().clear();
            for (OrderItem updatedOrderItem : updatedOrderItems) {
                updatedOrderItem.setOrderHeader(existingOrderHeader);
                existingOrderHeader.getOrderItems().add(updatedOrderItem);
                calculateOrderItemDetails(updatedOrderItem);
                OrderItem savedOrderItem = orderItemRepository.save(updatedOrderItem);
                orderHistoryService.createOrderItemHistory(savedOrderItem, orderHeaderHistory);
            }
        }

        return orderHeaderRepository.save(existingOrderHeader);
    }

    // 주문 조회 로직
    @Transactional(readOnly = true)
    public List<OrderHeader> findAllOrders(String memberId, Authentication authentication) {

        // 입력된 memberId가 없으면 주문상태가 '승인'인 orderItem 전체목록 조회
        if (memberId == null) {
            return orderItemRepository.findAll().stream()
                    .map(OrderItem::getOrderHeader)
                    .filter(orderHeader -> orderHeader.getOrderHeaderStatus().equals(OrderHeader.OrderHeaderStatus.ACCEPT))
                    .distinct()
                    .sorted(Comparator.comparing(OrderHeader::getOrderDate).reversed())
                    .collect(Collectors.toList());
            // 입력된 memberId가 있고, 권한이 TL이면 모든 주문 조회
        } else if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_TL"))) {
            if (memberId.equals((String) authentication.getPrincipal())) {
                return orderHeaderRepository.findAll().stream()
                        .sorted(Comparator.comparing(OrderHeader::getOrderDate).reversed())
                        .collect(Collectors.toList());
            } else {
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            }
        } else if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_TM"))) {
            if (memberId.equals((String) authentication.getPrincipal())) {
                return orderHeaderRepository.findByMemberMemberId(memberId).stream()
                        .sorted(Comparator.comparing(OrderHeader::getOrderDate).reversed())
                        .collect(Collectors.toList());
            } else {
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            }
        } else {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public OrderHeader findOrder(String orderHeaderId) {
        return findVerifiedOrder(orderHeaderId);
    }

    public LocalDate verifiedOrderDate(LocalDate inputLocalDate) {
        LocalDate currentDate = LocalDate.now();
        if (inputLocalDate.isAfter(currentDate)) {
            throw new BusinessLogicException(ExceptionCode.ORDER_DATE_NOT_CORRECT);
        }
        return inputLocalDate;
    }

    public OrderHeader findVerifiedOrder(String orderHeaderId) {
        Optional<OrderHeader> orderHeader = orderHeaderRepository.findById(orderHeaderId);

        return orderHeader.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
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

    public long marginAmountCalculation(long salesAmount, long purchaseAmount) {
        return salesAmount - purchaseAmount;
    }

    public double marginRateCalculation(long marginAmount, long salesAmount) {
        if (salesAmount == 0) {
            return 0;
        }
        return (marginAmount * 100) / salesAmount;
    }

    public long finalAmountCalculation(long salesAmount, long orderItemQuantity) {
        return salesAmount * orderItemQuantity;
    }

    private void calculateOrderItemDetails(OrderItem orderItem) {

        // purchaseAmount 입력
        Long purchaseAmount = purchasePriceRepository.findPurchaseAmountByItemCode(orderItem.getItem().getItemCode());
        if (purchaseAmount == null) {
            throw new BusinessLogicException(ExceptionCode.PURCHASE_AMOUNT_NOT_FOUND);
        }
        orderItem.setPurchaseAmount(purchaseAmount);

        // salesAmount 입력
        long salesAmount = orderItem.getSalesAmount();
        orderItem.setSalesAmount(salesAmount);

        // marginAmount 입력
        long marginAmount = marginAmountCalculation(salesAmount, purchaseAmount);
        orderItem.setMarginAmount(marginAmount);

        // marginRate 입력
        double marginRate = marginRateCalculation(marginAmount, salesAmount);
        if (salesAmount == 0 || marginAmount == 0) {
            marginRate = 0;
        }
        orderItem.setMarginRate(marginRate);

        // finalAmount 입력
        long finalAmount = finalAmountCalculation(salesAmount, orderItem.getOrderItemQuantity());
        orderItem.setFinalAmount(finalAmount);
    }

    public OrderDto.GraphResponse getOrderGraph(String memberId) {

        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusDays(30);

        List<OrderDto.GraphDto> memberGraph = calculateMemberGraphData(startDate, now, memberId);

        List<OrderDto.GraphDto> companyGraph = calculateCompanyGraphData(startDate, now);

        return new OrderDto.GraphResponse(memberGraph, companyGraph);
    }

    private List<OrderDto.GraphDto> calculateMemberGraphData(LocalDate startDate, LocalDate endDate, String memberId) {

        List<OrderDto.GraphDto> graphData = new ArrayList<>();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {

            List<OrderHeader> orderHeaders = orderHeaderRepository.findByMemberMemberIdAndOrderDateBetween(memberId, date, date);

            long orderCount = 0;
            long totalSales = 0;
            double totalMarginRate = 0.0;

            for (OrderHeader orderHeader : orderHeaders) {
                List<OrderItem> orderItems = orderItemRepository.findByOrderHeader(orderHeader);
                if (orderHeader.getOrderHeaderStatus() == OrderHeader.OrderHeaderStatus.ACCEPT) {
                    orderCount++;
                }

                for (OrderItem orderItem : orderItems) {
                    totalSales += orderItem.getSalesAmount() * orderItem.getOrderItemQuantity();
                    totalMarginRate += orderItem.getMarginAmount() * orderItem.getOrderItemQuantity();
                }
            }

            // 마진률 계산
            totalMarginRate = totalSales > 0 ? (totalMarginRate / totalSales) * 100 : 0;
            BigDecimal bd = new BigDecimal(totalMarginRate).setScale(2, RoundingMode.HALF_UP);
            double changedRate =bd.doubleValue();

            // 일별 데이터를 리스트에 추가
            graphData.add(new OrderDto.GraphDto(date, orderCount, totalSales, changedRate));
        }

        return graphData;
    }

    private List<OrderDto.GraphDto> calculateCompanyGraphData(LocalDate startDate, LocalDate endDate) {

        List<OrderDto.GraphDto> graphData = new ArrayList<>();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {

            List<OrderHeader> orderHeaders = orderHeaderRepository.findByOrderDateBetween(date, date);

            long orderCount = 0;
            long totalSales = 0;
            double totalMarginRate = 0.0;

            for (OrderHeader orderHeader : orderHeaders) {
                List<OrderItem> orderItems = orderItemRepository.findByOrderHeader(orderHeader);
                if (orderHeader.getOrderHeaderStatus() == OrderHeader.OrderHeaderStatus.ACCEPT) {
                    orderCount++;
                }

                for (OrderItem orderItem : orderItems) {
                    totalSales += orderItem.getSalesAmount() * orderItem.getOrderItemQuantity();
                    totalMarginRate += orderItem.getMarginAmount() * orderItem.getOrderItemQuantity();
                }
            }

            // 마진률 계산
            totalMarginRate = totalSales > 0 ? (totalMarginRate / totalSales) * 100 : 0;
            BigDecimal bd = new BigDecimal(totalMarginRate).setScale(2, RoundingMode.HALF_UP);
            double changedRate =bd.doubleValue();

            // 일별 데이터를 리스트에 추가
            graphData.add(new OrderDto.GraphDto(date, orderCount, totalSales, changedRate));
        }

        return graphData;
    }

}