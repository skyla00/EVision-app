package com.springboot.salesprice.mapper;

import com.springboot.salesprice.dto.SalesPriceDto;
import com.springboot.salesprice.entity.SalesPrice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SalesPriceMapper {
    @Mapping(source = "itemCode", target = "item.itemCode")
    @Mapping(source = "customerCode", target = "customer.customerCode")
    SalesPrice salesPricePostDtoToSalesPrice(SalesPriceDto.Post postDto);
    SalesPrice salesPricePatchDtoToSalesPrice(SalesPriceDto.Patch patchDto);

    @Mapping(source = "item.itemCode",target = "itemCode")
    @Mapping(source = "item.itemName",target = "itemName")
    @Mapping(source = "customer.customerCode", target = "customerCode")
    @Mapping(source = "customer.customerName", target = "customerName")
    SalesPriceDto.Response salesPriceToSalesPriceResponseDto(SalesPrice salesPrice);
    List<SalesPriceDto.Response> salesPriceToResponseDtos(List<SalesPrice> salesPrices);
}
