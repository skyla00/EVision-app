package com.springboot.salesprice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.customer.entity.Customer;
import com.springboot.item.entity.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SalesPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long salesPriceId;

    @Column(nullable = false)
    private int salesAmount;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate = LocalDate.of(9999,12,31);

    @ManyToOne
    @JoinColumn(name = "ITEM_CODE")
    @JsonBackReference
    private Item item;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_CODE")
    @JsonBackReference
    private Customer customer;
}
