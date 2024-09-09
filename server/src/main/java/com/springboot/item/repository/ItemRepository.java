package com.springboot.item.repository;

import com.springboot.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, String> {

    @Query("SELECT i FROM Item i JOIN i.salesPrices sp WHERE sp.customer.customerCode = :customerCode AND :orderDate BETWEEN sp.startDate AND sp.endDate")
    Optional<Item> findByCustomerCodeAndOrderDate(@Param("customerCode") String customerCode, @Param("orderDate") LocalDate orderDate);
    Page<Item> findByItemName(@Param("itemName") String itemName, Pageable pageable);

}
