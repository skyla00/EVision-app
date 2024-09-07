package com.springboot.salesprice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.customer.entity.Customer;
import com.springboot.item.entity.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SalesPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long salesPriceId;

    @Column(nullable = false)
    private int salesPrice;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ITEM_CODE")
    @JsonBackReference
    private Item item;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CUSTOMER_CODE")
    @JsonBackReference
    private Customer customer;
}
