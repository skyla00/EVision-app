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

    @Mapping(source = "acceptDate", target = "acceptDate")
    OrderHeader orderPatchDtoToOrder(OrderDto.Patch patchDto);

    @Mapping(source = "customer.customerCode", target = "customerCode")
    @Mapping(source = "orderItems", target = "orderItems")
    @Mapping(source = "member.memberName", target = "memberName")
    @Mapping(source = "customer.customerName", target = "customerName")
    OrderDto.OrderResponse orderToOrderResponseDto(OrderHeader orderHeader);

    @Mapping(source = "item.itemCode", target = "itemCode")
    OrderDto.OrderItemDto orderItemToOrderItemDto(OrderItem orderItem);

    @Mapping(source = "itemCode", target = "item.itemCode")
    OrderItem orderItemDtoToOrderItem(OrderDto.OrderItemDto orderItemDto);

    List<OrderDto.OrderResponse> orderHeadersToOrderResponseDtos(List<OrderHeader> orderHeaders);
}
