package com.springboot.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

// 일단은.. memberId 가 String 이라서 resourceId 를 String 으로 바꿨음.
public class UriCreator {public static URI createUri(String defaultUrl, String resourceId) {
    return UriComponentsBuilder
            .newInstance()
            .path(defaultUrl + "/{resource-id}")
            .buildAndExpand(resourceId)
            .toUri();

}
}

