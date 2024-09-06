package com.springboot.order.entity;

import com.springboot.member.entity.Favorite;
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

    @Column(nullable = false)
    private Date acceptDate;

    @OneToMany (mappedBy = "orderHeader")
    private List<Favorite> favoriteList = new ArrayList<>();
    public void setFavoriteList (Favorite favorite) {
        this.favoriteList.add(favorite);
        if(favorite.getOrderHeader() != this) {
            favorite.setOrderHeader(this);
        }
    }


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderHeaderStatus orderHeaderStatus = OrderHeaderStatus.ORDER_HEADER_STATUS_WAITING;

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

    @Builder
    public OrderHeader(String orderHeaderId) {
        this.orderHeaderId = orderHeaderId;
    }

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    List<OrderItem> orderItemList = new ArrayList<>();

    public void setOrderItem(OrderItem orderItem) {
        orderItemList.add(orderItem);
        if(orderItem.getOrderHeader() != this) {
            orderItem.setOrderHeader(this);
        }
    }

}
