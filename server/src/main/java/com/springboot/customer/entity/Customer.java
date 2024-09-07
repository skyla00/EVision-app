package com.springboot.customer.entity;

import com.springboot.order.entity.OrderHeader;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
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
public class Customer {
    @Id
    private String customerCode;

    @Column(nullable = false, length = 30)
    private String customerName;

    @Column(nullable = false, length = 10)
    private String manager;

    @Column(nullable = false, length = 50)
    private String customerAddress;

    @Column(nullable = false, length = 13)
    private String customerPhone;

    @Column(nullable = false, length = 30)
    private String customerEmail;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CustomerStatus customerStatus = CustomerStatus.ACTIVE;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<SalesPrice> salesPrices = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<OrderHeader> orderHeaders = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<OrderHeaderHistory> orderHeaderHistories = new ArrayList<>();
    public enum CustomerStatus {
        ACTIVE("이용가능"),
        INACTIVE("이용불가능");

        @Getter
        private String status;

        CustomerStatus(String status) {
            this.status = status;
        }
    }
}
