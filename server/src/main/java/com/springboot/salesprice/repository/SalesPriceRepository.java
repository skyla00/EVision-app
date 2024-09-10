package com.springboot.salesprice.repository;

import com.springboot.salesprice.entity.SalesPrice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesPriceRepository extends JpaRepository<SalesPrice, Long> {
    @Query("SELECT sp.salesAmount FROM SalesPrice sp WHERE sp.item.itemCode = :itemCode AND sp.customer.customerCode = :customerCode")
    Integer findSalesAmountByItemCodeAndCustomerCode(@Param("itemCode") String itemCode, @Param("customerCode") String CustomerCode);

}
