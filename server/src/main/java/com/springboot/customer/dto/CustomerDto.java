package com.springboot.customer.dto;

import com.springboot.customer.entity.Customer;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CustomerDto {
    @Builder
    @Getter
    public static class Post {
        @NotBlank
        private String customerCode;
        @NotBlank
        private String customerName;
        @NotBlank
        private String manager;
        @NotBlank
        private String customerAddress;
        @NotBlank
        private String customerPhone;
        @NotBlank
        private String customerEmail;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        private String customerCode;
        private String customerName;
        private String manager;
        private String customerAddress;
        private String customerPhone;
        private String customerEmail;
        private Customer.CustomerStatus customerStatus;
    }
    @Builder
    @Getter
    public static class Response {
        private String customerCode;
        private String customerName;
        private String manager;
        private String customerAddress;
        private String customerPhone;
        private String customerEmail;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Customer.CustomerStatus customerStatus;
    }
}
