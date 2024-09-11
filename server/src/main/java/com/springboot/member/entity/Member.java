package com.springboot.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.order.entity.OrderHeader;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
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
    @JsonManagedReference
    private List<Favorite> favorites = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderHeader> orderHeaders = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> permissions = new ArrayList<>();

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
