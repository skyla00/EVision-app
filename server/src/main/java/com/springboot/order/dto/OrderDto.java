package com.springboot.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import javax.validation.Valid;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
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
        @Valid
        private List<OrderItemDto> orderItems;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        @NotNull
        private String orderHeaderStatus;

        private LocalDate acceptDate;

        @Valid
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
        @NotNull(message = "주문 수량은 필수로 입력해야 합니다.")
        @Positive(message = "주문 수량은 0보다 커야 합니다.")
        @Range(min = 0, max = 100000000)
        @Digits(integer = 10, fraction = 0)
        private Long orderItemQuantity;
        private long purchaseAmount;
        @NotNull(message = "판매 단가는 필수로 입력해야 합니다.")
        @Positive(message = "주문 수량은 0보다 커야 합니다.")
        @Range(min = 0, max = 100000000)
        @Digits(integer = 10, fraction = 0)
        private Long salesAmount;
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
    public static class GraphDto {
        private LocalDate orderDate;
        private long orderCount;
        private long totalSales;
        private double totalMarginRate;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class GraphResponse {
        List<GraphDto> memberGraph;
        List<GraphDto> companyGraph;
    }
}
