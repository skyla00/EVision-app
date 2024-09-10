package com.springboot.item.repository;

import com.springboot.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ItemRepository extends JpaRepository<Item, String> {
    Page<Item> findByItemName(@Param("itemName") String itemName, Pageable pageable);
    Item findByItemCode(String itemCode);
}
