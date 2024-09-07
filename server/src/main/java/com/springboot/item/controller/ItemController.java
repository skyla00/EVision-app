package com.springboot.item.controller;

import com.springboot.item.entity.Item;
import com.springboot.item.service.ItemService;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/items")
@Validated
public class ItemController {
    private final ItemService itemService;
    private final ItemMapper itemMapper;
    private final static String ITEM_DEFAULT_URL = "/items";

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity createItem(@Valid @RequestBody ItemDto.POST postDto) {

        Item item = itemService.createItem(itemMapper.itemPostDtoToItem(postDto));

        URI location = UriCreator.createUri(ITEM_DEFAULT_URL,item.getItemCode());

        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{item-code}")
    public ResponseEntity updateItem(@PathVariable("item-code") String itemCode,
                                     @RequestBody ItemDto.Patch patchDto) {
        patchDto.setItemCode(itemCode);

        Item item = itemService.updateItem(itemMapper.itemPatchDtoToItem(patchDto));

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getItems(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {

        Page<Item> pageItems = itemService.findItems(page,size);

        List<Item> items = pageItems.getContent();

        return new ResponseEntity<>(new MultiResponseDto(itemMapper.itemsToItemResponseDtos(items), pageItems), HttpStatus.OK);
    }
}
