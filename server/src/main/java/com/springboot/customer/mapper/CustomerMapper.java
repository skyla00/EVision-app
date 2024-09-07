package com.springboot.customer.mapper;

import com.springboot.customer.dto.CustomerDto;
import com.springboot.customer.entity.Customer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    Customer customerPostDtoToCustomer(CustomerDto.Post postDto);
    Customer customerPatchDtoToCustomer(CustomerDto.Patch patchDto);
    CustomerDto.Response customerToResponseDto(Customer customer);
    List<CustomerDto.Response> customersToResponseDtos(List<Customer> customers);

}
