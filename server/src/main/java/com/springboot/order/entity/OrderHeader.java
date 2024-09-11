package com.springboot.order.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.customer.entity.Customer;
import com.springboot.member.entity.Favorite;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Table(name = "order_header")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderHeader {

    @Id
    private String orderHeaderId;

    @Column(nullable = false)
    private LocalDate orderDate;

    @Column
    private LocalDate acceptDate;

    @Column
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderHeaderStatus orderHeaderStatus = OrderHeaderStatus.WAITING;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    @JsonBackReference
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CUSTOMER_CODE", nullable = false)
    @JsonBackReference
    private Customer customer;

    @OneToMany(mappedBy = "orderHeader", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Favorite> favorites = new ArrayList<>();

    @OneToMany(mappedBy = "orderHeader", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<OrderItem> orderItems = new ArrayList<>();

    public enum OrderHeaderStatus {
        WAITING("임시 저장"),
        REQUEST("승인 요청"),
        ACCEPT("승인"),
        DENY("반려");

        @Getter
        private String status;

        OrderHeaderStatus(String status) {
            this.status = status;
        }
    }
}
