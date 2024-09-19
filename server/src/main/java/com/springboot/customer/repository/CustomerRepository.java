package com.springboot.customer.repository;

import com.springboot.customer.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Customer findByCustomerCode(String customerCode);
    Customer findByCustomerName (String customerName);
}
