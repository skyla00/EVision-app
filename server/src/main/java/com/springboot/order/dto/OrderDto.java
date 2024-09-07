package com.springboot.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

public class OrderDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        private String orderHeaderId;

        @NotNull(message = "주문 날짜는 필수입니다.")
        private Date orderDate;

        @Size(min = 1, message = "최소 한 개의 주문 항목이 있어야 합니다.")
        private List<OrderItemDto> orderItemList;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        @NotNull(message = "주문 헤더 ID는 필수입니다.")
        private String orderHeaderId;

        @NotNull(message = "승인 날짜는 필수입니다.")
        private Date acceptDate;

        private List<OrderItemDto> orderItemList;
    }

    @Getter
    @AllArgsConstructor
    public static class OrderResponse {

        private String orderHeaderId;
        private Date orderDate;
        private Date acceptDate;
        private String orderStatus;
        private List<OrderItemDto> orderItemList;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class OrderItemDto {

        private Long orderItemId;
        private Date requestDate;
        private String itemCode;
        private Long orderItemQuantity;
        private Long purchasePrice;
        private Long salesPrice;
        private Long marginRate;
        private Long marginPrice;
        private Long finalPrice;
    }
}
