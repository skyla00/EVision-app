package com.springboot.item.mapper;

import com.springboot.item.dto.ItemDto;
import com.springboot.item.entity.Item;
import com.springboot.salesprice.entity.SalesPrice;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    Item itemPostDtoToItem(ItemDto.Post postDto);
    Item itemPatchDtoToItem(ItemDto.Patch patchDto);
    ItemDto.SimpleResponse itemToSimplerResponseDto(Item item);
    List<ItemDto.SimpleResponse> itemsToSimplerResponseDtos(List<Item> items);
}
