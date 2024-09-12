package com.springboot.member.mapper;

import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.mapper.OrderMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

// MemberDto 에서 String permissionCode 를 받는데, 이 코드를 받아서 객체로 전환 시켜줄라면
// PermissionMapper 를 사용해서 permissionCode 를 바꿔줄 수 있음?
//@Mapper(componentModel = "spring", uses = {PermissionMapper.class})
@Mapper(componentModel = "spring", uses = OrderMapper.class)
public interface MemberMapper {

//    @Mapping(target = "permission", source = "permissionCode")
    Member memberPostDtoToMember(MemberDto.Post requestBody);

    default MemberDto.Response memberToMemberResponseDto (Member member, OrderMapper orderMapper) {
        List<OrderHeader> orderHeaders = member.getFavorites().stream()
                .map(favorite -> favorite.getOrderHeader())
                .collect(Collectors.toList());

        MemberDto.Response.ResponseBuilder response = MemberDto.Response.builder();
            response.memberId(member.getMemberId());
            response.memberName(member.getMemberName());
            response.department(member.getDepartment());
            response.position(member.getPosition());
            response.favorites(orderMapper.orderHeadersToOrderResponseDtos(orderHeaders));

            return response.build();
    }
}
