package com.springboot.salesprice.repository;

import com.springboot.salesprice.entity.SalesPrice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesPriceRepository extends JpaRepository<SalesPrice, Long> {
    Page<SalesPrice> findAll(Pageable pageable);
}
