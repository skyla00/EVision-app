package com.springboot.orderhistory.dto;

import com.springboot.orderhistory.entity.OrderHeaderHistory;
import com.springboot.orderhistory.entity.OrderItemHistory;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class OrderHistoryDto {

    @Setter
    @Getter
    public static class Post {

        @NotNull
        private Long orderHeaderHistoryId;
        @NotNull
        private String orderHeaderId;
        @NotNull
        private String customerCode;
        @NotNull
        private String memberId;
        @NotNull
        private LocalDate orderDate;
        private LocalDate acceptDate;
        private LocalDate requestDate;
        @NotNull
        private String orderHeaderStatus;
        @NotNull
        private List<OrderItemHistory> orderItemHistories;
    }

    @Setter
    @Getter
    public static class Response {
        private Long orderHeaderHistoryId;
        private String orderHeaderId;
        private String customerCode;
        private String memberId;
        private LocalDate orderDate;
        private LocalDate acceptDate;
        private LocalDateTime createdAt;
        private String orderHeaderStatus;
        private List<OrderHistoryDto.OrderItemHistoryDto> orderItemHistories;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class OrderHistoryResponse {
            private List<OrderHistoryDto.Response> histories;
    }

    @Getter
    @Setter
    public static class OrderItemHistoryDto {
        private long orderItemHistoryId;
        private long orderItemId;
        private String itemCode;
        private long orderItemQuantity;
        private long purchaseAmount;
        private long salesAmount;
        private double marginRate;
        private LocalDateTime createdAt;
        private long marginAmount;
        private long finalAmount;
        private LocalDate requestDate;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class OrderItemHistoryResponse {
        private List<OrderHistoryDto.OrderItemHistoryDto> orderItemHistories;
    }
}