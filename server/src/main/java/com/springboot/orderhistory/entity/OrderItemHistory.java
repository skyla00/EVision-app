package com.springboot.orderhistory.entity;

import com.springboot.order.entity.OrderHeader;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderItemHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemHistoryId;

    @Column(nullable = false)
    private Long orderItemId;

    @Column(nullable = false)
    private String itemCode;

    @Column(nullable = false)
    private Long orderItemQuantity;

    @Column(nullable = false)
    private Long purchasePrice;

    @Column(nullable = false)
    private Long salesPrice;

    @Column(nullable = false)
    private Long marginRate;

    @Column(nullable = false)
    private Long marginPrice;

    @Column(nullable = false)
    private Long finalPrice;

    @Column(nullable = false)
    private Date requestDate;

    @ManyToOne
    @JoinColumn(name = "ORDER_HEADER_HISTORY_ID")
    private OrderHeaderHistory orderHeaderHistory;

    public void setOrderHeaderHistory(OrderHeaderHistory orderHeaderHistory) {
        this.orderHeaderHistory = orderHeaderHistory;
        if (!orderHeaderHistory.getOrderItemHistoryList().contains(this)) {
            orderHeaderHistory.setOrderItemHistory(this);
        }
    }
}
