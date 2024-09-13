package com.springboot.orderhistory.service;

import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import com.springboot.orderhistory.dto.OrderHistoryDto;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
import com.springboot.orderhistory.entity.OrderItemHistory;
import com.springboot.orderhistory.repository.OrderHeaderHistoryRepository;
import com.springboot.orderhistory.repository.OrderItemHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderHistoryService {

    private final OrderHeaderHistoryRepository orderHeaderHistoryRepository;
    private final OrderItemHistoryRepository orderItemHistoryRepository;

    public OrderHistoryService(OrderHeaderHistoryRepository orderHeaderHistoryRepository, OrderItemHistoryRepository orderItemHistoryRepository) {
        this.orderHeaderHistoryRepository = orderHeaderHistoryRepository;
        this.orderItemHistoryRepository = orderItemHistoryRepository;
    }

    public OrderHeaderHistory createOrderHeaderHistory(OrderHeader orderHeader) {
        // OrderHeader 데이터를 OrderHeaderHistory로 변환
        OrderHeaderHistory orderHeaderHistory = new OrderHeaderHistory();
        orderHeaderHistory.setOrderHeaderId(orderHeader.getOrderHeaderId());
        orderHeaderHistory.setCustomerCode(orderHeader.getCustomer().getCustomerCode());
        orderHeaderHistory.setMemberId(orderHeader.getMember().getMemberId());
        orderHeaderHistory.setOrderDate(orderHeader.getOrderDate());
        orderHeaderHistory.setAcceptDate(orderHeader.getAcceptDate());
        orderHeaderHistory.setOrderHeaderStatus(orderHeader.getOrderHeaderStatus().getStatus());
        return orderHeaderHistoryRepository.save(orderHeaderHistory);
    }

    public OrderItemHistory createOrderItemHistory(OrderItem orderItem) {
        // OrderItem 데이터를 OrderItemHistory로 변환
        OrderItemHistory orderItemHistory = new OrderItemHistory();
        orderItemHistory.setOrderItemId(orderItem.getOrderItemId());
        orderItemHistory.setRequestDate(orderItem.getRequestDate());
        orderItemHistory.setItemCode(orderItem.getItem().getItemCode());
        orderItemHistory.setPurchaseAmount(orderItem.getPurchaseAmount());
        orderItemHistory.setSalesAmount(orderItem.getSalesAmount());
        orderItemHistory.setMarginAmount(orderItem.getMarginAmount());
        orderItemHistory.setMarginRate(orderItem.getMarginRate());
        orderItemHistory.setFinalAmount(orderItem.getFinalAmount());

        return orderItemHistoryRepository.save(orderItemHistory);
    }

    @Transactional(readOnly = true)
    public OrderHistoryDto.OrderHistoryResponse findOrderHistory(String orderHeaderId) {

        List<OrderHistoryDto.Response> responses = new ArrayList<>();

        for (OrderHeaderHistory orderHeaderHistory : orderHeaderHistoryRepository.findAll()) {
            if (orderHeaderHistory.getOrderHeaderId().equals(orderHeaderId)) {

                List<OrderItemHistory> orderItemHistories = new ArrayList<>();

                // orderHeaderHistoryId로 OrderItemHistory 조회 및 추가
                for (OrderItemHistory orderItemHistory : orderItemHistoryRepository.findByOrderHeaderHistoryId(orderHeaderHistory.getOrderHeaderHistoryId())) {
                    if (orderItemHistory.getOrderHeaderHistory().getOrderHeaderId().equals(orderHeaderId)) {
                        orderItemHistories.add(orderItemHistory);
                    }
                }

                System.out.println("=".repeat(30));
                System.out.println("=".repeat(30));
                System.out.println("=".repeat(30));
                System.out.println("=".repeat(30));
                System.out.println("=".repeat(30));
                System.out.println("=".repeat(30));
                System.out.println(orderItemHistories);

                // OrderHistoryDto.Response 생성 및 설정
                OrderHistoryDto.Response response = new OrderHistoryDto.Response();
                response.setOrderHeaderHistoryId(orderHeaderHistory.getOrderHeaderHistoryId());
                response.setOrderHeaderId(orderHeaderHistory.getOrderHeaderId());
                response.setCustomerCode(orderHeaderHistory.getCustomerCode());
                response.setMemberId(orderHeaderHistory.getMemberId());
                response.setOrderDate(orderHeaderHistory.getOrderDate());
                response.setAcceptDate(orderHeaderHistory.getAcceptDate());
                response.setOrderHeaderStatus(orderHeaderHistory.getOrderHeaderStatus());
                response.setOrderItemHistories(orderItemHistories);  // OrderItemHistories 설정

                // Response 리스트에 추가
                responses.add(response);
            }
        }

        // 반환: OrderHistoryResponse에 responses 설정
        return new OrderHistoryDto.OrderHistoryResponse(responses);  // 변경: 반환 타입 수정
    }
}
