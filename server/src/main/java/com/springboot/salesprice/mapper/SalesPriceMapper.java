package com.springboot.salesprice.mapper;

import com.springboot.salesprice.dto.SalesPriceDto;
import com.springboot.salesprice.entity.SalesPrice;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SalesPriceMapper {
    SalesPrice salesPricePostDtoToSalesPrice(SalesPriceDto.Post postDto);
    SalesPrice salesPricePatchDtoToSalesPrice(SalesPriceDto.Patch patchDto);
    SalesPriceDto.Response salesPriceToResponseDto(SalesPrice item);
    List<SalesPriceDto.Response> salesPriceToResponseDtos(List<SalesPrice> items);
}
