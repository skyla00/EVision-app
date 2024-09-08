package com.springboot.orderhistory.mapper;

import com.springboot.item.dto.ItemDto;
import com.springboot.item.entity.Item;
import com.springboot.orderhistory.dto.OrderHistoryDto;
import com.springboot.orderhistory.entity.OrderHeaderHistory;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderHistoryMapper {

    OrderHeaderHistory orderHistoryPostDtoToOrderHeaderHistory(OrderHistoryDto.Post postDto);
    OrderHistoryDto.Response orderHeaderHistoryToResponseDto(OrderHeaderHistory orderHeaderHistory);
    List<OrderHistoryDto.Response> orderHeaderHistoriesToResponseDtos(List<OrderHeaderHistory> orderHeaderHistories);

}
