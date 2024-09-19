package com.springboot.salesprice.repository;

import com.springboot.salesprice.entity.SalesPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SalesPriceRepository extends JpaRepository<SalesPrice, Long> {

    @Query("SELECT sp FROM SalesPrice sp " +
                    "WHERE sp.item.itemCode = :itemCode AND sp.customer.customerCode = :customerCode")
    SalesPrice findSalesPriceByItemCodeAndCustomerCode(@Param("itemCode") String itemCode,
                                                       @Param("customerCode") String CustomerCode);

    @Query("SELECT sp.salesAmount FROM SalesPrice sp " +
                    "WHERE sp.item.itemCode = :itemCode " +
                    "AND sp.customer.customerCode = :customerCode " +
                    "AND :orderDate BETWEEN sp.startDate AND sp.endDate")
    Integer findSalesPriceByItemCodeAndCustomerCodeAndOrderDate(@Param("itemCode") String itemCode,
                                                                   @Param("customerCode") String CustomerCode,
                                                                   @Param("orderDate") LocalDate orderDate);

    @Query("SELECT sp FROM SalesPrice sp WHERE sp.item.itemCode = :itemCode AND sp.customer.customerCode = " +
            ":customerCode AND sp.startDate < :startDate ORDER BY sp.startDate DESC")
    List<SalesPrice> findPreviousSalesPrices(@Param("itemCode") String itemCode, @Param("customerCode") String customerCode, @Param("startDate") LocalDate startDate);

}
