package com.springboot.order.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class OrderHeader {

    @Id
    private String orderHeaderId;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Column(nullable = false)
    private LocalDateTime acceptDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderHeaderStatus orderHeaderStatus = OrderHeaderStatus.ORDER_HEADER_STATUS_WAITING;

    public enum OrderHeaderStatus {
        ORDER_HEADER_STATUS_WAITING("임시 저장"),
        ORDER_HEADER_STATUS_REQUEST("승인 요청"),
        ORDER_HEADER_STATUS_ACCEPT("승인"),
        ORDER_HEADER_STATUS_DENY("반려");

        @Getter
        private String status;

        OrderHeaderStatus(String status) {
            this.status = status;
        }
    }

    @Builder
    public OrderHeader(String orderHeaderId) {
        this.orderHeaderId = orderHeaderId;
    }

}