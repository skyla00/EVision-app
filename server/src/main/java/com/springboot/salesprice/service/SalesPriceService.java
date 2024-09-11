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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
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
        // startDate 를 봐서, startDate 가 이미 있는 거면,
        if (!findSalesPrice.getEndDate().equals(LocalDate.of(9999,12,31))) {
            throw new BusinessLogicException(ExceptionCode.NEW_SALES_PRICE_EXISTS);
        } else {
            // 1. findSalesPrice 는 endDate 날짜를 전날로 해서 업데이트를 해 주고,
            // 1-1. 입력받은 startDate를 가지고 와서,
            LocalDate startDate = salesPrice.getStartDate();
            LocalDate previousDate = startDate.minusDays(1);
            findSalesPrice.setEndDate(previousDate);
            // 2. 새로운 salesPrice 객체를 만들어서, salesAmount값을 입력해주고 새로운 날짜를 입력해야 함. >> item 과 customer 도 영향이 가게 함.
            if (salesPrice.getStartDate().isBefore(findSalesPrice.getStartDate())
                    || salesPrice.getStartDate().equals(findSalesPrice.getStartDate())) {
                throw new BusinessLogicException(ExceptionCode.INVALID_START_DATE);
            }
            SalesPrice createSalesPrice = new SalesPrice();
            createSalesPrice.setItem(findSalesPrice.getItem());
            createSalesPrice.setCustomer(findSalesPrice.getCustomer());
            createSalesPrice.setSalesAmount(salesPrice.getSalesAmount());
            // 날짜에 대한 처리. findStalesPrice 의 startDate 랑 입력받은 startDate 가 기존 startDate 보다 앞서먼 안됨.
            createSalesPrice.setStartDate(salesPrice.getStartDate());
            createSalesPrice(createSalesPrice);
        }
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
        Optional<SalesPrice> salesPrice = salesPriceRepository.findById(salesPriceId);
        return salesPrice.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SALES_AMOUNT_NOT_FOUND));
    }
}
