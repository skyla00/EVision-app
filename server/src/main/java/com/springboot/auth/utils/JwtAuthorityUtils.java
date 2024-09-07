package com.springboot.auth.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthorityUtils {
    @Value("${id.admin}")
    private String adminMemberId;

    private final List<GrantedAuthority> ADMIN_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_TL", "ROLE_TM");
    private final List<GrantedAuthority> USER_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_TM");
    private final List<String> ADMIN_ROLES_STRING =
            List.of("TL", "TM");
    private final List<String> USER_ROLES_STRING =
            List.of("TM");

    public List<GrantedAuthority> createAuthorities(String memberId) {
        if(memberId.equals(adminMemberId)) {
            return ADMIN_ROLES;
        } return USER_ROLES;
    }

    public List<GrantedAuthority> createAuthorities (List<String> permissions) {
        return permissions.stream()
                .map(permission -> new SimpleGrantedAuthority("ROLE_"+ permission))
                .collect(Collectors.toList());
    }
    public List<String> createRoles (String memberId) {
        if(memberId.equals(adminMemberId)) {
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }
}
