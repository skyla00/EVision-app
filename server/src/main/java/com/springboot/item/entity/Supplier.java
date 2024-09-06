package com.springboot.item.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
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
