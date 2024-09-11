package com.springboot.member.mapper;

import com.springboot.member.dto.FavoriteDto;
import com.springboot.member.entity.Favorite;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FavoriteMapper {

    FavoriteDto.Response favoriteToResponse (Favorite favorite);

    Favorite favoriteRequestToFavorite(FavoriteDto.Request request);
}
