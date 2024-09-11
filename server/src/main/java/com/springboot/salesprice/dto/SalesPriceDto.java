package com.springboot.salesprice.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.Date;

public class SalesPriceDto {
    @Builder
    @Getter
    public static class Post {
        @NotBlank
        private String itemCode;
        @NotBlank
        private String customerCode;
        @NotBlank
        @Positive(message = "판매 단가는 숫자여야 합니다.")
        private int salesAmount;
        @NotBlank
        private Date startDate;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        private long salesPriceId;
        @Positive(message = "판매 단가는 숫자여야 합니다.")
        private int salesAmount;
        private Date startDate;
        private Date endDate;
    }
    @Builder
    @Getter
    public static class Response {
        private long salesPriceId;
        private String itemCode;
        private String customerCode;
        private int salesAmount;
        private Date startDate;
        private Date endDate;
    }
}
