package com.springboot.member.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    List<Favorite> FavoriteList = new ArrayList<>();

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
