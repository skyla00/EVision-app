package com.springboot.member.controller;

import com.springboot.order.mapper.OrderMapper;
import com.springboot.response.SingleResponseDto;
import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import com.springboot.member.mapper.MemberMapper;
import com.springboot.member.service.MemberService;
import com.springboot.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final OrderMapper orderMapper;

    public MemberController(MemberService memberService, MemberMapper mapperMapper, OrderMapper orderMapper) {
        this.memberService = memberService;
        this.memberMapper = mapperMapper;
        this.orderMapper = orderMapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberMapper.memberPostDtoToMember(requestBody);
        Member createMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createMember.getMemberId());
        return ResponseEntity.created(location).build();
    }

    // get 할 때에 member id 를 받음.
    @GetMapping("/me")
    public ResponseEntity getMember (Authentication authentication) {
        String memberId = (String) authentication.getPrincipal();
        // memberId 로 member 를 찾아라.
        Member member = memberService.findMember(memberId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberResponseDto(member, orderMapper)), HttpStatus.OK);

    }
}
