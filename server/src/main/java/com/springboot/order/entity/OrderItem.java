package com.springboot.order.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.item.entity.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "order_item")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderItemId;

    @Column(nullable = false)
    private LocalDate requestDate;

    @Column(nullable = false)
    private long orderItemQuantity;

    @Column(nullable = false)
    private long purchaseAmount;

    @Column(nullable = false)
    private long salesAmount;

    @Column(nullable = false)
    private long marginRate;

    @Column(nullable = false)
    private long marginAmount;

    @Column(nullable = false)
    private long finalAmount;

    @ManyToOne
    @JoinColumn(name = "ORDER_HEADER_ID")
    @JsonBackReference
    private OrderHeader orderHeader;

    @ManyToOne
    @JoinColumn(name = "ITEM_CODE")
    @JsonBackReference
    private Item item;
}
