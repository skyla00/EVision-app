package com.springboot.salesprice.controller;

import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import com.springboot.salesprice.dto.SalesPriceDto;
import com.springboot.salesprice.entity.SalesPrice;
import com.springboot.salesprice.mapper.SalesPriceMapper;
import com.springboot.salesprice.service.SalesPriceService;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/sales-prices")
@Validated
public class SalesPriceController {
    private final SalesPriceService salesPriceService;
    private final SalesPriceMapper salesPriceMapper;
    private final static String SALES_PRICE_DEFAULT_URL = "/sales-prices";
    public SalesPriceController(SalesPriceService salesPriceService, SalesPriceMapper salesPriceMapper) {
        this.salesPriceService = salesPriceService;
        this.salesPriceMapper = salesPriceMapper;
    }
    @PostMapping
    public ResponseEntity createSalesPrice(@Valid @RequestBody SalesPriceDto.Post postDto) {

        SalesPrice salesPrice = salesPriceService.createSalesPrice(salesPriceMapper.salesPricePostDtoToSalesPrice(postDto));

        URI location = UriCreator.createUri(SALES_PRICE_DEFAULT_URL, String.valueOf(salesPrice.getSalesPriceId()));

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{sales-price-id}")
    public ResponseEntity updateSalesPrice(@PathVariable("sales-price-id") long salesPriceId,
                                     @RequestBody SalesPriceDto.Patch patchDto) {
        patchDto.setSalesPriceId(salesPriceId);

        SalesPrice salesPrice = salesPriceService.updateSalesPrice(salesPriceMapper.salesPricePatchDtoToSalesPrice(patchDto));

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getSalesPrices(@RequestParam(value = "item-code", required = false) String itemCode,
                                         @RequestParam(value = "customer-code", required = false) String customerCode,
                                         @RequestParam(value = "order-date", required = false)
                                             @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate orderDate) {


        if (itemCode == null && customerCode == null && orderDate == null) {
            List<SalesPrice> salesPrices = salesPriceService.findSalesPrices(); // 모든 데이터 가져오는 메서드
            List<SalesPriceDto.Response>  salesPriceToResponseDtos = salesPriceMapper.salesPriceToResponseDtos(salesPrices);
            return new ResponseEntity<>(new SingleResponseDto<>(salesPriceToResponseDtos), HttpStatus.OK);
        } else {
            Integer findSalesAmount =
            salesPriceService.findSalesPricesByItemCodeAndCustomerCodeAndOrderDate(itemCode, customerCode, orderDate);
            // findSalesAmount 만 Response 에 담아주는 새로운 dto 생성.
            SalesPriceDto.AmountResponse salesAmountResponseDto = salesPriceMapper.salesAmountToSalesAmountResponseDto(findSalesAmount);
            return new ResponseEntity<>(new SingleResponseDto<>(salesAmountResponseDto), HttpStatus.OK);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteSalesPrice(@RequestParam(value = "sales-price-id") long salesPriceId) {

        salesPriceService.deleteSalesPrice(salesPriceId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
