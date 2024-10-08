package com.springboot.item.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PurchasePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchasePriceId;

    @Column(nullable = false)
    private int purchaseAmount;

    @Column(nullable = false)
    private Date receiptDate;

    @Column(nullable = false)
    private int stockQuantity;

    @ManyToOne
    @JoinColumn(name = "ITEM_CODE")
    @JsonBackReference
    private Item item;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SUPPLIER_CODE")
    @JsonBackReference
    private Supplier supplier;
}
