package com.springboot.item.repository;

import com.springboot.item.entity.PurchasePrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasePriceRepository extends JpaRepository<PurchasePrice, Long> {

    @Query("SELECT p.purchaseAmount FROM PurchasePrice p WHERE p.item.itemCode = :itemCode")
    Long findPurchaseAmountByItemCode(@Param("itemCode") String itemCode);
}
