package com.springboot.orderhistory.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderHeaderHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderHeaderHistoryId;

    @Column(nullable = false)
    private String orderHeaderId;

    @Column(nullable = false)
    private String customerCode;

    @Column(nullable = false)
    private String memberId;

    @Column(nullable = false)
    private LocalDate orderDate;

    @Column
    private LocalDate acceptDate;

    @Column(nullable = false)
    private String orderHeaderStatus;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "orderHeaderHistory", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    List<OrderItemHistory> orderItemHistories = new ArrayList<>();
}