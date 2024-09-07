package com.springboot.item.dto;

import com.springboot.item.entity.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ItemDto {
    @Builder
    @Getter
    public static class Post {
        @NotBlank
        private String itemCode;
        @NotBlank
        private String itemName;
        @NotBlank
        private String unit;
        @NotBlank
        private String specs;
    }
    @Builder
    @Getter
    @Setter
    public static class Patch {
        private String itemCode;
        private String itemName;
        private String unit;
        private String specs;
        private Item.ItemStatus itemStatus;
    }
    @Builder
    @Getter
    public static class Response {
        private String itemCode;
        private String itemName;
        private String unit;
        private String specs;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Item.ItemStatus itemStatus;
    }
}
