package com.springboot.item.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Date;

@Entity
public class PurchasePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long purchasePriceId;
    @Column(nullable = false)
    private int purchasePrice;
    @Column(nullable = false)
    private Date receiptDate;
    @Column(nullable = false)
    private int stockQuantity;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SUPPLIER_CODE")
    @JsonBackReference
    private Supplier supplier;
}
