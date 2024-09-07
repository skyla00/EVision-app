package com.springboot.member.repository;

import com.springboot.item.entity.Item;
import com.springboot.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    // 사원번호 string 으로 멤버를 데리고 옴. 올 수 있겠지?
    Optional<Member> findById (String memberId);
}
