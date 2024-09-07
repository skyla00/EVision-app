package com.springboot.member.entity;

import com.springboot.order.entity.OrderHeader;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    private String memberId;

    @Column(length = 20, nullable = false )
    private String memberName;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 20, nullable = false )
    private String position;

    @Column(length = 20, nullable = false )
    private String department;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus memberStatus = MemberStatus.ACTIVE;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<OrderHeader> orderHeaderList = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> permissions = new ArrayList<>();

    public void setOrderHeaderList (OrderHeader orderHeader) {
        this.orderHeaderList.add(orderHeader);
        if(orderHeader.getMember() != this) {
            orderHeader.setMember(this);
        }
    }

    public void setFavoriteList (Favorite favorite) {
        this.favoriteList.add(favorite);
        if(favorite.getMember() != this) {
            favorite.setMember(this);
        }

    }

    public enum MemberStatus {
        ACTIVE("활성화"),
        INACTIVE("비활성화");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }





}
