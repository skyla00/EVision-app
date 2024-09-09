package com.springboot.item.controller;

import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import com.springboot.item.dto.ItemDto;
import com.springboot.item.entity.Item;
import com.springboot.item.mapper.ItemMapper;
import com.springboot.item.service.ItemService;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/items")
@Validated
public class ItemController {
    private final ItemService itemService;
    private final ItemMapper itemMapper;
    private final static String ITEM_DEFAULT_URL = "/items";

    public ItemController(ItemService itemService, ItemMapper itemMapper) {
        this.itemService = itemService;
        this.itemMapper = itemMapper;
    }

    @PostMapping
    public ResponseEntity createItem(@Valid @RequestBody ItemDto.Post postDto) {

        Item item = itemService.createItem(itemMapper.itemPostDtoToItem(postDto));

        URI location = UriCreator.createUri(ITEM_DEFAULT_URL,item.getItemCode());

        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{item-code}")
    public ResponseEntity updateItem(@PathVariable("item-code") String itemCode,
                                     @RequestBody ItemDto.Patch patchDto) {
        patchDto.setItemCode(itemCode);

        Item item = itemService.updateItem(itemMapper.itemPatchDtoToItem(patchDto));

        return ResponseEntity.ok().build();
    }
    @GetMapping("/{item-code}")
    public ResponseEntity getItem(@PathVariable("item-code") String itemCode) {
        Item item = itemService.findItem(itemCode);

        return new ResponseEntity(new SingleResponseDto<>(itemMapper.itemToSimplerResponseDto(item)), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getItems(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size,
                                   @RequestParam(required = false) String itemName,
                                   @RequestParam(required = false) String customerCode,
                                   @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate orderDate) {

        if (customerCode != null && orderDate != null) {
            Optional<Item> itemOptional = itemService.findItemByCustomerAndOrderDate(customerCode, orderDate);

            if (itemOptional.isPresent()) {
                ItemDto.DetailResponse detailResponse = itemMapper.itemToDetailResponseDto(itemOptional.get(), customerCode, orderDate);
                return new ResponseEntity<>(new SingleResponseDto<>(detailResponse), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        Page<Item> pageItems = itemService.findItems(page, size, itemName);
        List<Item> items = pageItems.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(itemMapper.itemsToSimplerResponseDtos(items), pageItems), HttpStatus.OK);
    }
}
