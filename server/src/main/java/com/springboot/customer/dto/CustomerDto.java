package com.springboot.customer.dto;

import com.springboot.customer.entity.Customer;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CustomerDto {
    @Builder
    @Getter
    public static class Post {
        @NotBlank
        @Pattern(regexp = "^[A-Z]{2}$", message = "고객사 코드는 대문자 영어 2자여야 합니다.")
        private String customerCode;

        @NotBlank
        @Pattern(regexp = "^[가-힣a-zA-Z]+(\\s[가-힣a-zA-Z]+){0,29}$", message = "고객사 이름은 한글, 영어, 띄어쓰기가 포함될 수 있습니다.")
        private String customerName;

        @NotBlank
        @Pattern(regexp = "^[가-힣a-zA-Z]{1,10}$", message = "고객사 담당자 이름은 한글, 영어, 최대 10자까지 입력할 수 있습니다.")
        private String manager;

        @NotBlank
        @Pattern(regexp = "^[가-힣a-zA-Z0-9]+(\\s[가-힣a-zA-Z0-9]+){0,49}$", message = "고객사 주소는 한글, 영어, 숫자, 띄어쓰기가 포함될 수 있습니다.")
        private String customerAddress;

        @NotBlank
        @Pattern(regexp = "^\\d{2,3}-\\d{4}-\\d{4}$", message = "전화번호는 하이픈(-)포함 형식이어야 합니다.")
        private String customerPhone;

        @NotBlank
        @Email(message = "유효한 이메일 형식이어야 합니다.")
        @Size(max = 30, message = "이메일은 최대 30자까지 입력 가능합니다.")
        private String customerEmail;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        @Pattern(regexp = "^[A-Z]{2}$", message = "고객사 코드는 대문자 영어 2자여야 합니다.")
        private String customerCode;
        @Pattern(regexp = "^[가-힣a-zA-Z]+(\\s[가-힣a-zA-Z]+){0,29}$", message = "고객사 이름은 한글, 영어, 띄어쓰기가 포함될 수 있습니다.")
        private String customerName;
        @Pattern(regexp = "^[가-힣a-zA-Z]{1,10}$", message = "고객사 담당자 이름은 한글, 영어, 최대 10자까지 입력할 수 있습니다.")
        private String manager;
        @Pattern(regexp = "^[가-힣a-zA-Z0-9]+(\\s[가-힣a-zA-Z0-9]+){0,49}$", message = "고객사 주소는 한글과 영어, 숫자, 띄어쓰기가 포함될 수 있습니다.")
        private String customerAddress;
        @Pattern(regexp = "^\\d{2,3}-\\d{4}-\\d{4}$", message = "전화번호는 하이픈(-)포함 형식이어야 합니다.")
        private String customerPhone;
        @Email(message = "유효한 이메일 형식이어야 합니다.")
        @Size(max = 30, message = "이메일은 최대 30자까지 입력 가능합니다.")
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
