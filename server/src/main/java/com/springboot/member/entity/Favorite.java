package com.springboot.member.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.order.entity.OrderHeader;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoritesId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;
//    public void setMember (Member member) {
//        this.member = member;
//        if(!member.getFavoriteList().contains(this)) {
//            member.setFavoriteList(this);
//        }
//    }
    @ManyToOne
    @JoinColumn(name = "ORDER_HEADER_ID")
    @JsonBackReference
    private OrderHeader orderHeader;
//    public void setOrderHeader (OrderHeader orderHeader) {
//        this.orderHeader = orderHeader;
//        if(!orderHeader.getFavoriteList().contains(this)) {
//            orderHeader.setFavoriteList(this);
//        }
//    }
}
