package com.springboot.item.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Supplier {
    @Id
    private String supplierCode;

    @Column(nullable = false,length = 30)
    private String supplierName;

    @Column(nullable = false,length = 50)
    private String supplierAddress;

    @Column(nullable = false,length = 13)
    private String supplierPhone;

    @Column(nullable = false,length = 30)
    private String supplierEmail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private SupplierStatus supplierStatus = SupplierStatus.ACTIVE;

    public enum SupplierStatus {
        ACTIVE("이용가능"),
        INACTIVE("이용불가능");

        @Getter
        private String status;

        SupplierStatus(String status) {
            this.status = status;
        }
    }
}
