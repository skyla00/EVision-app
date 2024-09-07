package com.springboot.order.entity;

import com.springboot.customer.entity.Customer;
import com.springboot.member.entity.Favorite;
import com.springboot.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class OrderHeader {

    @Id
    private String orderHeaderId;

    @Column(nullable = false)
    private Date orderDate;

    @Column
    private Date acceptDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderHeaderStatus orderHeaderStatus = OrderHeaderStatus.ORDER_HEADER_STATUS_WAITING;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    //    public void setMember (Member member) {
//        this.member = member;
//        if(!member.getOrderHeaderList().contains(this)) {
//            member.setOrderHeaderList(this);
//        }
//    }
    @ManyToOne
    @JoinColumn(name = "CUSTOMER_CODE")
    private Customer customer;

    @OneToMany(mappedBy = "orderHeader", cascade = CascadeType.ALL)
    private List<Favorite> favorites = new ArrayList<>();
//    public void setFavoriteList (Favorite favorite) {
//        this.favoriteList.add(favorite);
//        if(favorite.getOrderHeader() != this) {
//            favorite.setOrderHeader(this);
//        }
//    }
    @OneToMany(mappedBy = "orderHeader", cascade = CascadeType.ALL)
    List<OrderItem> orderItems = new ArrayList<>();
//    public void setOrderItem(OrderItem orderItem) {
//        orderItemList.add(orderItem);
//        if(orderItem.getOrderHeader() != this) {
//            orderItem.setOrderHeader(this);
//        }
//    }
    public enum OrderHeaderStatus {
        ORDER_HEADER_STATUS_WAITING("임시 저장"),
        ORDER_HEADER_STATUS_REQUEST("승인 요청"),
        ORDER_HEADER_STATUS_ACCEPT("승인"),
        ORDER_HEADER_STATUS_DENY("반려");

        @Getter
        private String status;

        OrderHeaderStatus(String status) {
            this.status = status;
        }
    }
}
