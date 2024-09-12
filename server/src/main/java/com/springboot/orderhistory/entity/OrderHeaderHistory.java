package com.springboot.orderhistory.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
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

    @Column(nullable = false)
    private LocalDate acceptDate;

    @Column(nullable = false)
    private String orderHeaderStatus;

    @Column(nullable = false)
    private String editorId;

    @OneToMany(mappedBy = "orderHeaderHistory", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<OrderItemHistory> orderItemHistories = new ArrayList<>();
}