package com.springboot.item.mapper;

import com.springboot.item.dto.ItemDto;
import com.springboot.item.entity.Item;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    Item itemPostDtoToItem(ItemDto.Post postDto);
    Item itemPatchDtoToItem(ItemDto.Patch patchDto);
    ItemDto.Response itemToResponseDto(Item item);
    List<ItemDto.Response> itemsToResponseDtos(List<Item> items);

}
