package com.springboot.item.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Item {
    @Id
    private String itemCode;
    @Column(nullable = false,length = 30)
    private String itemName;
    @Column(nullable = false,length = 5)
    private String unit;
    @Column(nullable = false,length = 255)
    private String specs;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String modifiedAt;
    public enum ItemStatus {
        ON_SALE("판매중"),
        NOT_FOR_SALE("판매중지");

        @Getter
        private String status;

        ItemStatus(String status) {
            this.status = status;
        }
    }
}
