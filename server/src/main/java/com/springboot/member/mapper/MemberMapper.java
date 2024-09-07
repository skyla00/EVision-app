package com.springboot.member.mapper;

import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

// MemberDto 에서 String permissionCode 를 받는데, 이 코드를 받아서 객체로 전환 시켜줄라면
// PermissionMapper 를 사용해서 permissionCode 를 바꿔줄 수 있음?
@Mapper(componentModel = "spring", uses = {PermissionMapper.class})
public interface MemberMapper {

    @Mapping(target = "permission", source = "permissionCode")
    Member memberPostDtoToMember(MemberDto.Post requestBody);

}
