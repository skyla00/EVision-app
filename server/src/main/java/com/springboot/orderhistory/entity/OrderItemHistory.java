package com.springboot.orderhistory.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderItemHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderItemHistoryId;

    @Column(nullable = false)
    private long orderItemId;

    @Column(nullable = false)
    private String itemCode;

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

    @Column(nullable = false)
    private LocalDate requestDate;

    @ManyToOne
    @JoinColumn(name = "order_header_history_id")
    @JsonBackReference
    private OrderHeaderHistory orderHeaderHistory;
}
