package com.springboot.member.service;

import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.dto.FavoriteDto;
import com.springboot.member.entity.Favorite;
import com.springboot.member.entity.Member;
import com.springboot.member.repository.FavoriteRepository;
import com.springboot.member.repository.MemberRepository;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.repository.OrderHeaderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final OrderHeaderRepository orderHeaderRepository;
    private final FavoriteRepository favoriteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository, OrderHeaderRepository orderHeaderRepository, FavoriteRepository favoriteRepository, PasswordEncoder passwordEncoder, JwtAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.orderHeaderRepository = orderHeaderRepository;
        this.favoriteRepository = favoriteRepository;
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
        List<String> permissions = authorityUtils.createRoles(member.getMemberId());
        member.setPermissions(permissions);
        return memberRepository.save(member);
    }

    public Member findMember (String memberId) {
        // 있는 memberId 인지 확인하는 메서드.
        return findVerifiedMember(memberId);
    }

    // 사원번호 memberId 로 Member 를 찾아 반환 하는 메서드.
    public Member findVerifiedMember(String memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        Member findMember = member.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public FavoriteDto.Response favoriteOrder(FavoriteDto.Request favoriteRequestDto, Authentication authentication) {

        Optional<Member> optionalMember = memberRepository.findById(favoriteRequestDto.getMemberId());
        Optional<OrderHeader> optionalOrderHeader = orderHeaderRepository.findById(favoriteRequestDto.getOrderHeaderId());

        // Member가 존재하지 않는 경우 처리
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // OrderHeader가 존재하지 않는 경우 처리
        OrderHeader orderHeader = optionalOrderHeader.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));

        // 현재 로그인한 사용자와 요청한 사용자가 일치하는지 확인
        if (!member.getMemberId().equals((String) authentication.getPrincipal())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_CORRECT);
        }

        // 현재 주문이 사용자의 주문인지 확인
        if (!orderHeader.getMember().getMemberId().equals(favoriteRequestDto.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.ORDER_NOT_BELONG_TO_MEMBER);
        }

        List<Favorite> existingFavorites = favoriteRepository.findByMemberAndOrderHeader(member, orderHeader);

        FavoriteDto.Response response = new FavoriteDto.Response();

        // 이미 등록한 즐겨찾기라면 삭제
        if (!existingFavorites.isEmpty()) {
            favoriteRepository.deleteAll(existingFavorites);
            member.getFavorites().removeAll(existingFavorites);
        // 현재 즐겨찾기가 3개 이상이면 오류 발생
        } else {
            if (member.getFavorites().size() >= 3) {
                throw new BusinessLogicException(ExceptionCode.FAVORITE_EXCEEDED);
            }

            // 즐겨찾기 추가
            Favorite favorite = new Favorite();
            favorite.setMember(member);
            favorite.setOrderHeader(orderHeader);
            favoriteRepository.save(favorite);
            member.getFavorites().add(favorite);
            memberRepository.save(member);

            response.setFavoritesId(favorite.getFavoritesId());
            response.setMemberId(member.getMemberId());
            response.setOrderHeaderId(orderHeader.getOrderHeaderId());
            response.setOrderHeaderStatus(orderHeader.getOrderHeaderStatus().getStatus());
            response.setOrderDate(orderHeader.getOrderDate());
            response.setCustomerName(orderHeader.getCustomer().getCustomerName());
        }
        return response;
    }
}
