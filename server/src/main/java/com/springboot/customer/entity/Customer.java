package com.springboot.customer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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
