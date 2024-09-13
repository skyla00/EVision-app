package com.springboot.orderhistory.dto;

import com.springboot.orderhistory.entity.OrderHeaderHistory;
import com.springboot.orderhistory.entity.OrderItemHistory;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
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
        private String orderHeaderStatus;
        private List<OrderItemHistory> orderItemHistories;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class OrderHistoryResponse {
            private List<OrderHistoryDto.Response> histories;
    }

}