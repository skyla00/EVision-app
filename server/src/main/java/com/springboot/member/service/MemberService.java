package com.springboot.member.service;

import com.springboot.member.entity.Member;
import com.springboot.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }


    // memberId 는 회사에서 부여 받음.
    // password 도 부여받으나, 시큐리티 적용 하면서 passwordEncoder 는 함.
    public Member createMember (Member member) {
        // password 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // db에 userRole 저장
        // createRoles 할 때 getMemberId 를 해야 함.
        List<String> roles = authorityUtils.createRoles(member.getMemberId());
        member.setRoles(roles);
        return memberRepository.save(member);

    }



}