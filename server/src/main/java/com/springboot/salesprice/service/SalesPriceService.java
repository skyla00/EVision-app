package com.springboot.salesprice.service;

import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.salesprice.entity.SalesPrice;
import com.springboot.salesprice.repository.SalesPriceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SalesPriceService {
    private final SalesPriceRepository salesPriceRepository;

    public SalesPriceService(SalesPriceRepository salesPriceRepository) {
        this.salesPriceRepository = salesPriceRepository;
    }

    public SalesPrice createSalesPrice(SalesPrice salesPrice) {
        return salesPriceRepository.save(salesPrice);
    }

    public SalesPrice updateSalesPrice(SalesPrice salesPrice) {
        SalesPrice findSalesPrice = findVerifiedCSalesPrice(salesPrice.getSalesPriceId());

        Optional.ofNullable(findSalesPrice.getSalesAmount())
                .ifPresent(salesAmount -> findSalesPrice.setSalesAmount(salesAmount));

        return salesPriceRepository.save(findSalesPrice);
    }
    @Transactional(readOnly = true)
    public SalesPrice findSalesPrice(long salesPriceId) {
        return findVerifiedCSalesPrice(salesPriceId);
    }
    @Transactional(readOnly = true)
    public List<SalesPrice> findSalesPrices() {
        return salesPriceRepository.findAll();
    }
    private SalesPrice findVerifiedCSalesPrice(long salesPriceId) {
        Optional<SalesPrice> customer = salesPriceRepository.findById(salesPriceId);

        return customer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SALES_AMOUNT_NOT_FOUND));
    }
}
