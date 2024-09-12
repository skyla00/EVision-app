package com.springboot.member.dto;

import com.springboot.order.dto.OrderDto;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;


public class MemberDto {

    @Getter
    @Builder
    public static class Post {

        @NotBlank
        private String memberId;

        @NotBlank
        @Pattern(regexp = "^[가-힣]{1,15}$", message = "이름은 공백 없이 한글로만 구성되며, 최대 15자까지 입력할 수 있습니다.")
        private String memberName;

        @NotBlank
        private String password;

        @NotBlank
        private String position;

        @NotBlank
        private String department;
    }

    @Getter
    @Builder
    public static class Response {
        private String memberId;
        private String memberName;
        private String position;
        private String department;
        private List<OrderDto.OrderResponse> favorites;
    }
}
