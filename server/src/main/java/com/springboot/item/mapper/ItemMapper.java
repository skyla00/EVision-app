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
    default ItemDto.DetailResponse itemToDetailResponseDto(Item item, String customerCode, LocalDate orderDate) {
        int salesAmount = 0;

        if (customerCode != null) {
            Optional<SalesPrice> salesPrice = item.getSalesPrices().stream()
                    .filter(sp -> sp.getCustomer().getCustomerCode().equals(customerCode))
                    .filter(sp -> isValidForOrderDate(sp, orderDate))
                    .sorted(Comparator.comparing(SalesPrice::getStartDate).reversed())
                    .findFirst();

            salesAmount = salesPrice.map(SalesPrice::getSalesAmount).orElse(0);
        }

        ItemDto.DetailResponse.DetailResponseBuilder response = ItemDto.DetailResponse.builder();
        response.itemCode(item.getItemCode());
        response.itemName(item.getItemName());
        response.unit(item.getUnit());
        response.specs(item.getSpecs());
        response.salesAmount(salesAmount);
        response.createdAt(item.getCreatedAt());
        response.modifiedAt(item.getModifiedAt());
        response.itemStatus(item.getItemStatus());

        return response.build();
    }
    private boolean isValidForOrderDate(SalesPrice salesPrice, LocalDate orderDate) {
        LocalDate startDate = salesPrice.getStartDate();
        LocalDate endDate = salesPrice.getEndDate();

        boolean isStartValid = (startDate.isBefore(orderDate) || startDate.isEqual(orderDate));

        boolean isEndValid = endDate.isAfter(orderDate) || endDate.isEqual(orderDate);

        return isStartValid && isEndValid;
    }
}
