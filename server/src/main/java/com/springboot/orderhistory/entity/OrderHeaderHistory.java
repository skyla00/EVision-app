package com.springboot.orderhistory.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderHeaderHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderHeaderHistoryId;

    @Column(nullable = false)
    private String orderHeaderId;

    @Column(nullable = false)
    private String customerCode;

    @Column(nullable = false)
    private String memberId;

    @Column(nullable = false)
    private Date orderDate;

    @Column(nullable = false)
    private Date acceptDate;

    @Column(nullable = false)
    private String orderHeaderStatus;

    @Column(nullable = false)
    private String editorId;
}