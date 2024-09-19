package com.springboot.item.dto;

import com.springboot.item.entity.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class ItemDto {
    @Builder
    @Getter
    public static class Post {
        @NotBlank
        @Pattern(regexp = "^[A-Z0-9]{1,20}$", message = "상품 코드는 대문자 영어와 숫자로 구성되며, 최대 20자까지 가능합니다. 띄어쓰기는 불가능합니다.")
        private String itemCode;

        @NotBlank
        @Pattern(regexp = "^[A-Z0-9]+(\\s[A-Z0-9]+){0,29}$", message = "상품명은 대문자 영어, 숫자, 띄어쓰기가 포함될 수 있습니다. 최대 30자까지 가능합니다.")
        private String itemName;

        @NotNull
        private Item.Unit unit;

        @NotBlank
        @Size(max = 255, message = "제품 설명은 최대 255자까지 입력 가능합니다.")
        private String specs;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        @Pattern(regexp = "^[A-Z0-9]{1,20}$", message = "상품 코드는 대문자 영어와 숫자로 구성되며, 최대 20자까지 가능합니다. 띄어쓰기는 불가능합니다.")
        private String itemCode;
        @Pattern(regexp = "^[A-Z0-9]+(\\s[A-Z0-9]+){0,29}$", message = "상품명은 대문자 영어, 숫자, 띄어쓰기가 포함될 수 있습니다. 최대 30자까지 가능합니다.")
        private String itemName;
        private Item.Unit unit;
        @Size(max = 255, message = "제품 설명은 최대 255자까지 입력 가능합니다.")
        private String specs;
        private Item.ItemStatus itemStatus;
    }
    @Builder
    @Getter
    public static class SimpleResponse {
        private String itemCode;
        private String itemName;
        private String unit;
        private String specs;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Item.ItemStatus itemStatus;
    }
    @Builder
    @Getter
    public static class DetailResponse {
        private String itemCode;
        private String itemName;
        private String unit;
        private String specs;
        private int salesAmount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Item.ItemStatus itemStatus;
    }
}
