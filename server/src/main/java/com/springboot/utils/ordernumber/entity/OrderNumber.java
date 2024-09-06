package com.springboot.utils.ordernumber.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderNumber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderNumberId;

    @Column(unique = true)
    private String orderNumber;
}