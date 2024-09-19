package com.springboot.item.service;

import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.item.entity.Item;
import com.springboot.item.repository.ItemRepository;;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item createItem(Item item) {
        // 같은 상품코드가 있을 때
        Item findCodeItem = itemRepository.findByItemCode(item.getItemCode());
        if(findCodeItem != null) {
            throw new BusinessLogicException(ExceptionCode.ITEM_EXISTS);
        }
        return itemRepository.save(item);
    }

    public Item updateItem(Item item) {
        Item findItem = findVerifiedItemCode(item.getItemCode());

        Optional.ofNullable(item.getItemName())
                .ifPresent(itemName -> findItem.setItemName(itemName));
        Optional.ofNullable(item.getUnit())
                .ifPresent(unit -> findItem.setUnit(unit));
        Optional.ofNullable(item.getSpecs())
                .ifPresent(specs -> findItem.setSpecs(specs));
        Optional.ofNullable(item.getItemStatus())
                .ifPresent(itemStatus -> findItem.setItemStatus(itemStatus));

        findItem.setModifiedAt(LocalDateTime.now());

        return itemRepository.save(findItem);
    }
    @Transactional(readOnly = true)
    public Item findItem(String itemCode) {
        return findVerifiedItemCode(itemCode);
    }

    public void deleteItem(String itemCode) {
        Item findItem = findVerifiedItemCode(itemCode);
        itemRepository.delete(findItem);
    }

    @Transactional(readOnly = true)
    public List<Item> findItems() {
        return itemRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    private Item findVerifiedItemCode(String itemCode) {
        Optional<Item> item = itemRepository.findById(itemCode);
        return item.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }
    // 같은 상품명이 있는지 확인
//    private Item findVerifiedItemName(String itemName) {
//        Optional<Item> item = itemRepository.findByItemName(itemName);
//        return item.or
//    }

}
