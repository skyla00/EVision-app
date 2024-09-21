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

import java.time.LocalDateTime;
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
        orderHeaderHistory.setCreatedAt(LocalDateTime.now());
        orderHeaderHistory.setOrderHeaderStatus(orderHeader.getOrderHeaderStatus().getStatus());
        return orderHeaderHistoryRepository.save(orderHeaderHistory);
    }

    public OrderItemHistory createOrderItemHistory(OrderItem orderItem, OrderHeaderHistory orderHeaderHistory) {
        // OrderItem 데이터를 OrderItemHistory로 변환
        OrderItemHistory orderItemHistory = new OrderItemHistory();
        orderItemHistory.setOrderItemId(orderItem.getOrderItemId());
        orderItemHistory.setRequestDate(orderItem.getRequestDate());
        orderItemHistory.setCreatedAt(LocalDateTime.now());
        orderItemHistory.setItemCode(orderItem.getItem().getItemCode());
        orderItemHistory.setOrderItemQuantity(orderItem.getOrderItemQuantity());
        orderItemHistory.setPurchaseAmount(orderItem.getPurchaseAmount());
        orderItemHistory.setSalesAmount(orderItem.getSalesAmount());
        orderItemHistory.setMarginAmount(orderItem.getMarginAmount());
        orderItemHistory.setMarginRate(orderItem.getMarginRate());
        orderItemHistory.setFinalAmount(orderItem.getFinalAmount());

        orderItemHistory.setOrderHeaderHistory(orderHeaderHistory);

        return orderItemHistoryRepository.save(orderItemHistory);
    }

    @Transactional(readOnly = true)
    public OrderHistoryDto.OrderHistoryResponse findOrderHistory(String orderHeaderId) {

        if (orderHeaderHistoryRepository.findByOrderHeaderId(orderHeaderId).isEmpty()) {
            return new OrderHistoryDto.OrderHistoryResponse(new ArrayList<>());
        }

        List<OrderHeaderHistory> orderHeaderHistories = orderHeaderHistoryRepository.findByOrderHeaderId(orderHeaderId);

        List<OrderHistoryDto.Response> responses = new ArrayList<>();

        for (OrderHeaderHistory orderHeaderHistory : orderHeaderHistories) {
            if (orderHeaderHistory.getOrderHeaderId().equals(orderHeaderId)) {
                List<OrderItemHistory> orderItemHistories = orderItemHistoryRepository.findByOrderHeaderHistoryOrderHeaderHistoryId(orderHeaderHistory.getOrderHeaderHistoryId());

                // OrderItemHistory -> OrderItemHistoryDto 변환
                List<OrderHistoryDto.OrderItemHistoryDto> orderItemHistoryDtos = new ArrayList<>();
                for (OrderItemHistory orderItemHistory : orderItemHistories) {
                    OrderHistoryDto.OrderItemHistoryDto itemHistoryDto = new OrderHistoryDto.OrderItemHistoryDto();
                    itemHistoryDto.setOrderItemHistoryId(orderItemHistory.getOrderItemHistoryId());
                    itemHistoryDto.setOrderItemId(orderItemHistory.getOrderItemId());
                    itemHistoryDto.setCreatedAt(orderItemHistory.getCreatedAt());
                    itemHistoryDto.setItemCode(orderItemHistory.getItemCode());
                    itemHistoryDto.setOrderItemQuantity(orderItemHistory.getOrderItemQuantity());
                    itemHistoryDto.setPurchaseAmount(orderItemHistory.getPurchaseAmount());
                    itemHistoryDto.setSalesAmount(orderItemHistory.getSalesAmount());
                    itemHistoryDto.setMarginAmount(orderItemHistory.getMarginAmount());
                    itemHistoryDto.setMarginRate(orderItemHistory.getMarginRate());
                    itemHistoryDto.setFinalAmount(orderItemHistory.getFinalAmount());
                    itemHistoryDto.setRequestDate(orderItemHistory.getRequestDate());
                    orderItemHistoryDtos.add(itemHistoryDto);
                }

                // OrderHistoryDto.Response 생성
                OrderHistoryDto.Response response = new OrderHistoryDto.Response();
                response.setOrderHeaderHistoryId(orderHeaderHistory.getOrderHeaderHistoryId());
                response.setOrderHeaderId(orderHeaderHistory.getOrderHeaderId());
                response.setCustomerCode(orderHeaderHistory.getCustomerCode());
                response.setMemberId(orderHeaderHistory.getMemberId());
                response.setOrderDate(orderHeaderHistory.getOrderDate());
                response.setAcceptDate(orderHeaderHistory.getAcceptDate());
                response.setCreatedAt(orderHeaderHistory.getCreatedAt());
                response.setOrderHeaderStatus(orderHeaderHistory.getOrderHeaderStatus());
                response.setOrderItemHistories(orderItemHistoryDtos);  // 변환된 DTO 리스트 설정

                responses.add(response);
            }
        }

        return new OrderHistoryDto.OrderHistoryResponse(responses);
    }
}
