package com.springboot.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


public class MemberDto {

    @Getter
    @AllArgsConstructor
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

        // 권한 부여..Permission은 권한 테이블에서 받아서 하는 건데?
        // String 으로 받으면 되나? 헷갈리네...ㅎ
        // mapper 에서 엔티티로 변환 가능?
        private String permissionCode;

    }


}
