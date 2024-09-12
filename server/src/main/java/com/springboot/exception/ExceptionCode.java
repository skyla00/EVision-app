package com.springboot.exception;

import lombok.Getter;

public enum ExceptionCode {
    NO_AUTHORITY (403, "No Authority"),
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    MEMBER_NOT_CORRECT(409, "Member Not Correct"),
    ORDER_DATE_NOT_CORRECT(404, "Order Date Not Correct"),
    ITEM_NOT_FOUND(404, "Item Not Found"),
    ITEM_EXISTS(409, "Item Exists"),
    SALES_AMOUNT_NOT_FOUND(404, "SalesAmount Not Found"),
    SALES_PRICE_EXISTS(404, "SalesPrices Exists"),
    NEW_SALES_PRICE_EXISTS(409, "new SalesPrices Exists"),
    INVALID_START_DATE(404, "start date cannot be same or earlier than current start date."),
    PURCHASE_AMOUNT_NOT_FOUND(404, "PurchaseAmount Not Found"),
    SALES_AMOUNT_EXISTS(409, "SalesAmount Exists"),
    CUSTOMER_NOT_FOUND(404, "Customer Not Found"),
    CUSTOMER_EXISTS(409, "Customer Exists"),
    ORDER_NOT_FOUND(404, "Order Not Found"),
    ORDER_NOT_BELONG_TO_MEMBER(409, "Order Not Belong To Member"),
    ORDER_ITEM_NOT_FOUND(404, "OrderItem Not Found"),
    ORDER_ITEM_EXISTS(409, "OrderItem Exists"),
    FAVORITE_EXCEEDED(404, "Favorite Exceeded"),
    REQUEST_DATE_NOT_FOUND(404, "Request Date Not Found");

    @Getter
    private int status;

    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
