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
        orderHeaderHistory.setEditorId(orderHeader.getMember().getMemberId()); // 이 부분은 필요에 따라 수정

        return orderHeaderHistoryRepository.save(orderHeaderHistory);
    }

    public OrderItemHistory createOrderItemHistory(OrderItem orderItem) {
        // OrderItem 데이터를 OrderItemHistory로 변환
        OrderItemHistory orderItemHistory = new OrderItemHistory();
        orderItemHistory.setOrderItemId(orderItem.getOrderItemId());
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

        List<OrderHeaderHistory> orderHeaderHistories = new ArrayList<>();
        for (OrderHeaderHistory orderHeaderHistory : orderHeaderHistoryRepository.findAll()) {
            if (orderHeaderHistory.getOrderHeaderId().equals(orderHeaderId)) {
                orderHeaderHistories.add(orderHeaderHistory);
            }
        }

        List<OrderHistoryDto.Response> responses = new ArrayList<>();
        for (OrderHeaderHistory history : orderHeaderHistories) {
            OrderHistoryDto.Response response = new OrderHistoryDto.Response();
            response.setOrderHeaderHistoryId(history.getOrderHeaderHistoryId());
            response.setOrderHeaderId(history.getOrderHeaderId());
            response.setCustomerCode(history.getCustomerCode());
            response.setMemberId(history.getMemberId());
            response.setOrderDate(history.getOrderDate());
            response.setAcceptDate(history.getAcceptDate());
            response.setOrderHeaderStatus(history.getOrderHeaderStatus());
            response.setEditorId(history.getEditorId());

            responses.add(response);
        }

        OrderHistoryDto.OrderHistoryResponse orderHistoryResponse = new OrderHistoryDto.OrderHistoryResponse();
        orderHistoryResponse.setHistories(responses);

        return orderHistoryResponse;
    }
}
