package com.springboot.customer.controller;

import com.springboot.customer.dto.CustomerDto;
import com.springboot.customer.entity.Customer;
import com.springboot.customer.mapper.CustomerMapper;
import com.springboot.customer.service.CustomerService;
import com.springboot.dto.MultiResponseDto;
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
@RequestMapping("/customers")
@Validated
public class CustomerController {
    private final CustomerService customerService;
    private final CustomerMapper customerMapper;
    private final static String CUSTOMER_DEFAULT_URL = "/customers";

    public CustomerController(CustomerService customerService, CustomerMapper customerMapper) {
        this.customerService = customerService;
        this.customerMapper = customerMapper;
    }

    @PostMapping
    public ResponseEntity createCustomer(@Valid @RequestBody CustomerDto.Post postDto) {

        Customer customer = customerService.createCustomer(customerMapper.customerPostDtoToCustomer(postDto));

        URI location = UriCreator.createUri(CUSTOMER_DEFAULT_URL,customer.getCustomerCode());

        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{customer-code}")
    public ResponseEntity updateItem(@PathVariable("customer-code") String customerCode,
                                     @RequestBody CustomerDto.Patch patchDto) {
        patchDto.setCustomerCode(customerCode);

        Customer customer = customerService.updateCustomer(customerMapper.customerPatchDtoToCustomer(patchDto));

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getItems(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {

        Page<Customer> pageCustomers = customerService.findCustomers(page,size);

        List<Customer> customers = pageCustomers.getContent();

        return new ResponseEntity<>(new MultiResponseDto(customerMapper.customersToResponseDtos(customers), pageCustomers), HttpStatus.OK);
    }
}
