package com.springboot.customer.service;

import com.springboot.customer.entity.Customer;
import com.springboot.customer.repository.CustomerRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.item.entity.Item;
import com.springboot.item.repository.ItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Customer customer) {
        Customer findCustomer = findVerifiedCustomer(customer.getCustomerCode());

        Optional.ofNullable(customer.getCustomerName())
                .ifPresent(customerName -> findCustomer.setCustomerName(customerName));
        Optional.ofNullable(customer.getManager())
                .ifPresent(manager -> findCustomer.setManager(manager));
        Optional.ofNullable(customer.getCustomerAddress())
                .ifPresent(customerAddress -> findCustomer.setCustomerAddress(customerAddress));
        Optional.ofNullable(customer.getCustomerPhone())
                .ifPresent(customerPhone -> findCustomer.setCustomerPhone(customerPhone));
        Optional.ofNullable(customer.getCustomerEmail())
                .ifPresent(customerEmail -> findCustomer.setCustomerEmail(customerEmail));
        Optional.ofNullable(customer.getCustomerStatus())
                .ifPresent(customerStatus -> findCustomer.setCustomerStatus(customerStatus));

        findCustomer.setModifiedAt(LocalDateTime.now());

        return customerRepository.save(findCustomer);
    }
    @Transactional(readOnly = true)
    public Customer findCustomer(String customerCode) {
        return findVerifiedCustomer(customerCode);
    }
    @Transactional(readOnly = true)
    public Page<Customer> findCustomers(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdAt").descending());

        return customerRepository.findAll(pageable);
    }
    private Customer findVerifiedCustomer(String customerCode) {
        Optional<Customer> customer = customerRepository.findById(customerCode);

        return customer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CUSTOMER_NOT_FOUND));
    }
}
