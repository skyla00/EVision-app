package com.springboot.item.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Item {
    @Id
    private String itemCode;

    @Column(nullable = false,length = 30)
    private String itemName;

    @Column(nullable = false,length = 5)
    private String unit;

    @Column(nullable = false,length = 255)
    private String specs;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ItemStatus  itemStatus = ItemStatus.ON_SALE;

    public enum ItemStatus {
        ON_SALE("판매중"),
        NOT_FOR_SALE("판매중지");

        @Getter
        @Setter
        private String status;

        ItemStatus(String status) {
            this.status = status;
        }
    }
}
