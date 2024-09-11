package com.springboot.member.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.order.entity.OrderHeader;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @ManyToOne
    @JoinColumn(name = "ORDER_HEADER_ID")
    @JsonBackReference
    private OrderHeader orderHeader;
}
