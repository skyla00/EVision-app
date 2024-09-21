package com.springboot.orderhistory.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private double marginRate;

    @Column(nullable = false)
    private long marginAmount;

    @Column(nullable = false)
    private long finalAmount;

    @Column(nullable = false)
    private LocalDate requestDate;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "ORDER_HEADER_HISTORY_ID")
    @JsonBackReference
    private OrderHeaderHistory orderHeaderHistory;
}
