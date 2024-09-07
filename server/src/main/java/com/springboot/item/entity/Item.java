package com.springboot.item.entity;

import com.springboot.order.entity.OrderItem;
import com.springboot.orderhistory.entity.OrderItemHistory;
import com.springboot.salesprice.entity.SalesPrice;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<PurchasePrice> purchasePrices = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<SalesPrice> salesPrices = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<OrderItemHistory> orderItemHistories = new ArrayList<>();

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
