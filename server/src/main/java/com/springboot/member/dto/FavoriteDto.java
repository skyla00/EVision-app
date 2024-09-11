package com.springboot.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

public class FavoriteDto {

    @Getter
    @Setter
    public static class Request {

        @NotBlank
        private String memberId;
        @NotBlank
        private String orderHeaderId;
    }

    @Getter
    @Setter
    public static class Response {

        @NotBlank
        private Long favoritesId;
        @NotBlank
        private String memberId;
        @NotBlank
        private String orderHeaderId;
        @NotBlank
        private String customerName;
        @NotBlank
        private String orderHeaderStatus;
        @NotBlank
        private LocalDate orderDate;
    }
}
