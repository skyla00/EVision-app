package com.springboot.order.mapper;

import com.springboot.order.dto.OrderDto;
import com.springboot.order.entity.OrderHeader;
import com.springboot.order.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source = "customerCode", target = "customer.customerCode")
    @Mapping(source = "orderItems", target = "orderItems")
    OrderHeader orderPostDtoToOrder(OrderDto.Post postDto);

    OrderHeader orderPatchDtoToOrder(OrderDto.Patch patchDto);

    OrderDto.OrderResponse orderToOrderResponseDto(OrderHeader orderHeader);

    OrderDto.OrderItemDto orderItemToOrderItemDto(OrderItem orderItem);

    @Mapping(source = "itemCode", target = "item.itemCode")
    OrderItem orderItemDtoToOrderItem(OrderDto.OrderItemDto orderItemDto);

    List<OrderDto.OrderResponse> orderHeadersToOrderResponseDtos(List<OrderHeader> orderHeaders);
}
