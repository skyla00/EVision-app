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
    private String name;
    @Column(nullable = false,length = 50)
    private String address;
    @Column(nullable = false,length = 13)
    private String phone;
    @Column(nullable = false,length = 30)
    private String email;

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
