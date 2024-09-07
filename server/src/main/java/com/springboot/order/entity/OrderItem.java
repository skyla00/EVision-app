package com.springboot.order.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.item.entity.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderItemId;

    @Column(nullable = false)
    private Date requestDate;

    @Column(nullable = false)
    private String itemCode;

    @Column(nullable = false)
    private long orderItemQuantity;

    @Column(nullable = false)
    private long purchasePrice;

    @Column(nullable = false)
    private long salesPrice;

    @Column(nullable = false)
    private long marginRate;

    @Column(nullable = false)
    private long marginPrice;

    @Column(nullable = false)
    private long finalPrice;

    @ManyToOne
    @JoinColumn(name = "ORDER_HEADER_ID")
    @JsonBackReference
    private OrderHeader orderHeader;
    //    public void setOrderHeader(OrderHeader orderHeader) {
//        this.orderHeader = orderHeader;
//        if(!orderHeader.getOrderItemList().contains(this)) {
//            orderHeader.setOrderItem(this);
//        }
//    }
    @ManyToOne
    @JoinColumn(name = "ITEM_CODE")
    @JsonBackReference
    private Item item;
}
