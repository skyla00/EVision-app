package com.springboot.orderhistory.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

public class OrderHistoryDto {

    @Setter
    @Getter
    public static class Post {

        @NotBlank
        private Long orderHeaderHistoryId;
        @NotBlank
        private String orderHeaderId;
        @NotBlank
        private String customerCode;
        @NotBlank
        private String memberId;
        @NotBlank
        private LocalDate orderDate;

        private LocalDate acceptDate;

        private LocalDate requestDate;

        @NotBlank
        private String orderHeaderStatus;

        private String editorId;
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
        private String editorId;
    }


    @Getter
    @Setter
    public static class OrderHistoryResponse {
        private List<Response> histories;
    }

}