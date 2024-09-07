package com.springboot.orderhistory.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class OrderHistoryDto {

    @Builder
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
        private Date orderDate;

        private Date acceptDate;
        @NotBlank
        private String orderHeaderStatus;

        private String editorId;
    }

    @Builder
    @Getter
    public static class Response {
        private Long orderHeaderHistoryId;
        private String orderHeaderId;
        private String customerCode;
        private String memberId;
        private Date orderDate;
        private Date acceptDate;
        private String orderHeaderStatus;
        private String editorId;
    }
}