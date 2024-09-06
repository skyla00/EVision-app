package com.springboot.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Permission {
    @Id
    private String permissionCode;

    @OneToMany(mappedBy = "permission", cascade = CascadeType.ALL)
    private List<Member> memberList = new ArrayList<>();
    public void setMemberList(Member member) {
        this.memberList.add(member);
        if(member.getPermission() != this) {
            member.setPermission(this);
        }
    }

}
