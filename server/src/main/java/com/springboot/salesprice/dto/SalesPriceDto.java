package com.springboot.salesprice.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.Date;

public class SalesPriceDto {
    @Builder
    @Getter
    public static class Post {
        @NotBlank
        private String itemCode;
        @NotBlank
        private String customerCode;
        @NotNull
        @Positive(message = "판매 단가는 숫자여야 합니다.")
        private int salesAmount;
        @NotNull
        private LocalDate startDate;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        private long salesPriceId;
        @NotBlank
        @Positive(message = "판매 단가는 숫자여야 합니다.")
        private int salesAmount;
        @NotNull
        private LocalDate startDate;
    }
    @Builder
    @Getter
    public static class Response {
        private long salesPriceId;
        private String itemCode;
        private String itemName;
        private String customerCode;
        private String customerName;
        private int salesAmount;
        private LocalDate startDate;
        private LocalDate endDate;
    }

    @Builder
    @Getter
    public static class AmountResponse {
        private int salesAmount;
    }
}
