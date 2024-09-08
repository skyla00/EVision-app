package com.springboot.exception;

import lombok.Getter;

public enum ExceptionCode {
    NO_AUTHORITY (403, "No authority"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ORDER_DATE_NOT_CORRECT(404, "Order Date Not Correct"),
    ITEM_NOT_FOUND(404, "Item not found"),
    ITEM_EXISTS(409, "Item exists"),
    SALES_PRICE_NOT_FOUND(404, "SalesPrice not found"),
    SALES_PRICE_EXISTS(409, "SalesPrice exists"),
    CUSTOMER_NOT_FOUND(404, "Customer not found"),
    CUSTOMER_EXISTS(409, "Customer exists"),
    ORDER_NOT_FOUND(404, "Order not found"),
    ORDER_EXISTS(409, "Order exists"),
    ORDER_ITEM_NOT_FOUND(404, "OrderItem not found"),
    ORDER_ITEM_EXISTS(409, "OrderItem exists"),
    FAVORITE_EXISTS(404, "Favorite exists");
  
    @Getter
    private int status;

    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
