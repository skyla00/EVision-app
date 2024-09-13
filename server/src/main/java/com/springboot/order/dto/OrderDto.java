package com.springboot.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class OrderDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        private String orderHeaderId;

        @NotNull(message = "주문 날짜는 필수입니다.")
        private LocalDate orderDate;

        @NotNull
        private String customerCode;

        @Size(min = 1, message = "최소 한 개의 주문 항목이 있어야 합니다.")
        private List<OrderItemDto> orderItems;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        @NotNull
        private String orderHeaderStatus;

        private LocalDate acceptDate;

        @NotNull
        private List<OrderItemDto> orderItems;
    }

    @Getter
    @AllArgsConstructor
    public static class OrderResponse {

        private String orderHeaderId;
        private String memberName;
        private LocalDate orderDate;
        private LocalDate acceptDate;
        private String customerCode;
        private String customerName;
        private String orderHeaderStatus;
        private List<OrderItemDto> orderItems;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class OrderItemDto {

        private long orderItemId;
        private LocalDate requestDate;
        private String itemCode;
        private String itemName;
        private long orderItemQuantity;
        private long purchaseAmount;
        private long salesAmount;
        private double marginRate;
        private long marginAmount;
        private long finalAmount;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class MultiResponseDto<T> {
        private List<T> data;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class GraphResponse {

        private long memberOrderCount;
        private long memberTotalSales;
        private double memberTotalMarginRate;
        private long companyOrderCount;
        private long companyTotalSales;
        private double companyTotalMarginRate;
    }
}
