package com.springboot.salesprice.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
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
        private int salesAmount;
        @NotBlank
        private Date startDate;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        private long salesPriceId;
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
