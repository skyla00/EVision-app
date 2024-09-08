package com.springboot.exception;

import lombok.Getter;

public enum ExceptionCode {
    NO_AUTHORITY (403, "No Authority"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ITEM_NOT_FOUND(404, "item not found"),
    ITEM_EXISTS(409, "item exists"),
    SALES_PRICE_NOT_FOUND(404, "salesPrice not found"),
    SALES_PRICE_EXISTS(409, "salesPrice exists"),
    CUSTOMER_NOT_FOUND(404, "customer not found"),
    CUSTOMER_EXISTS(409, "customer exists"),
    ORDER_NOT_FOUND(404, "order not found"),
    ORDER_EXISTS(409, "order exists"),
    ORDER_ITEM_NOT_FOUND(404, "orderItem not found"),
    ORDER_ITEM_EXISTS(409, "orderItem exists"),
    FAVORITE_EXISTS(404, "favorite exists"),
    ORDER_DATE_NOT_CORRECT(404, "Order Date Not Correct");

    @Getter
    private int status;

    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
