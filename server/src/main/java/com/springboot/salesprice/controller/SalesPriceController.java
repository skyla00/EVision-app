package com.springboot.salesprice.controller;

import com.springboot.dto.MultiResponseDto;
import com.springboot.salesprice.dto.SalesPriceDto;
import com.springboot.salesprice.entity.SalesPrice;
import com.springboot.salesprice.mapper.SalesPriceMapper;
import com.springboot.salesprice.service.SalesPriceService;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
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
    public ResponseEntity getItems(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {

        Page<SalesPrice> pageSalesPrice = salesPriceService.findSalesPrices(page,size);

        List<SalesPrice> salesPrices = pageSalesPrice.getContent();

        return new ResponseEntity<>(new MultiResponseDto(salesPriceMapper.salesPriceToResponseDtos(salesPrices), pageSalesPrice), HttpStatus.OK);
    }
}
