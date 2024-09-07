package com.springboot.item.service;

import com.springboot.item.entity.Item;
import com.springboot.item.repository.ItemRepository;;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Item updateItem(Item item) {
        Item findItem = findVerifiedItem(item.getItemCode());

        Optional.ofNullable(item.getItemName())
                .ifPresent(itemName -> findItem.setItemName(itemName));
        Optional.ofNullable(item.getUnit())
                .ifPresent(unit -> findItem.setUnit(unit));
        Optional.ofNullable(item.getSpecs())
                .ifPresent(specs -> findItem.setSpecs(specs));

        findItem.setModifiedAt(LocalDateTime.now());

        return itemRepository.save(findItem);
    }
    @Transactional(readOnly = true)
    public Item findItem(String itemCode) {
        return findVerifiedItem(itemCode);
    }
    @Transactional(readOnly = true)
    public Page<Item> findItems(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        return itemRepository.findAll(pageable);
    }
    private Item findVerifiedItem(String itemCode) {
        Optional<Item> item = itemRepository.findById(itemCode);

        return item.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }
}