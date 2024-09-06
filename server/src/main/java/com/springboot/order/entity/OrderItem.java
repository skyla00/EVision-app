package com.springboot.order.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @Column(nullable = false)
    private Date requestDate;

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

    @ManyToOne
    @JoinColumn(name = "order_header_id")
    private OrderHeader orderHeader;

    public void setOrderHeader(OrderHeader orderHeader) {
        this.orderHeader = orderHeader;
        if(!orderHeader.getOrderItemList().contains(this)) {
            orderHeader.setOrderItem(this);
        }
    }

}
