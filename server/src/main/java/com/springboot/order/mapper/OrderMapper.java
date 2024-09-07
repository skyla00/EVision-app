package com.springboot.order.mapper;

import com.springboot.order.dto.OrderDto;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source = "orderHeaderId", target = "orderHeader.orderHeaderId")
    OrderHeader orderPostDtoToOrderHeader(OrderDto.Post postDto);

    @Mapping(source = "orderHeaderId", target = "orderHeader.orderHeaderId")
    OrderHeader orderPatchDtoToOrderHeader(OrderDto.Patch patchDto);

    @Mapping(source = "orderHeader.orderHeaderId", target = "orderHeaderId")
    OrderDto.OrderResponse orderHeaderToOrderResponseDto(OrderHeader orderHeader);

    OrderDto.OrderItemDto orderItemToOrderItemDto(OrderItem orderItem);

    List<OrderDto.OrderResponse> orderHeadersToOrderResponseDtos(List<OrderHeader> orderHeaders);
}
