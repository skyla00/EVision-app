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

        @NotNull(message = "주문 헤더 ID는 필수입니다.")
        private String orderHeaderId;

        @NotNull
        private String orderHeaderStatus;

        private LocalDate acceptDate;

        @NotNull
        private List<OrderItemDto> orderItems;
    }

    @Getter
    @AllArgsConstructor
    public static class OrderResponse {

        @NotNull
        private String orderHeaderId;
        @NotNull
        private String memberName;
        @NotNull
        private LocalDate orderDate;
        private LocalDate acceptDate;
        @NotNull
        private String customerCode;
        @NotNull
        private String customerName;
        @NotNull
        private String orderHeaderStatus;
        @NotNull
        @Size(min = 1, message = "최소 한 개의 주문 항목이 있어야 합니다.")
        private List<OrderItemDto> orderItems;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class OrderItemDto {

        private Long orderItemId;
        private LocalDate requestDate;
        private String itemCode;
        private Long orderItemQuantity;
        private Long purchaseAmount;
        private Long salesAmount;
        private Long marginRate;
        private Long marginAmount;
        private Long finalAmount;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class MultiResponseDto<T> {
        private List<T> data;
    }
}
