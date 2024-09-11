package com.springboot.member.repository;

import com.springboot.member.entity.Favorite;
import com.springboot.member.entity.Member;
import com.springboot.order.entity.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByMemberAndOrderHeader(Member member, OrderHeader orderHeader);
}
