package com.springboot.order.mapper;

import com.springboot.order.dto.OrderDto;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface OrderMapper {

    @Mapping(source = "orderHeaderId", target = "orderHeader.orderHeaderId")
    OrderHeader orderPostDtoToOrder(OrderDto.Post postDto);

    @Mapping(source = "orderHeaderId", target = "orderHeader.orderHeaderId")
    OrderHeader orderPatchDtoToOrder(OrderDto.Patch patchDto);

    @Mapping(source = "orderHeader.orderHeaderId", target = "orderHeaderId")
    OrderDto.OrderResponse orderToOrderResponseDto(OrderHeader orderHeader);

    OrderDto.OrderItemDto orderItemToOrderItemDto(OrderItem orderItem);

    List<OrderDto.OrderResponse> ordersToOrderResponseDtos(List<OrderHeader> orderHeaders);
}
