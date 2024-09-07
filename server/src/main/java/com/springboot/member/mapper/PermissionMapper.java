package com.springboot.member.mapper;

import com.springboot.member.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission permissionCodeToPermission (String permissionCode);
}
