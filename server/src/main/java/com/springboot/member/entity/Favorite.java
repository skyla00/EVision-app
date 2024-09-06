package com.springboot.member.entity;

import com.springboot.order.entity.OrderHeader;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoritesId;

    @ManyToOne
    @JoinColumn(name = "ORDER_HEADER_ID")
    private OrderHeader orderHeader;
    public void setOrderHeader (OrderHeader orderHeader) {
        this.orderHeader = orderHeader;
        if(!orderHeader.getFavoriteList().contains(this)) {
            orderHeader.setFavoriteList(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    public void setMember (Member member) {
        this.member = member;
        if(!member.getFavoriteList().contains(this)) {
            member.setFavoriteList(this);
        }
    }

}
