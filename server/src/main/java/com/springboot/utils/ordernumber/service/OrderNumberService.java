package com.springboot.utils.ordernumber.service;

import com.springboot.utils.ordernumber.entity.OrderNumber;
import com.springboot.utils.ordernumber.repository.OrderNumberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OrderNumberService {

    private final OrderNumberRepository orderNumberRepository;

    // 난수로 사용할 숫자는 0~9로 설정
    private static final String NUMBERS = "0123456789";

    // 4자리 난수 생성
    private static final int LENGTH = 4;

    public String generateOrderNumber() {

        // 현재 날짜를 "yyMMdd" 형식으로 변환
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");
        String formattedDate = currentDate.format(formatter);

        // 4자리 난수 생성 후, 해당 주문번호가 이미 존재하는지 확인
        String randomStr;
        Random random = new Random();
        do {
            // 4자리 숫자로 이루어진 랜덤 문자열 생성
            StringBuilder stringBuilder = new StringBuilder(LENGTH);
            for (int i = 0; i < LENGTH; i++) {
                int randomIndex = random.nextInt(NUMBERS.length());
                stringBuilder.append(NUMBERS.charAt(randomIndex));
            }
            randomStr = stringBuilder.toString();
        } while (orderNumberRepository.existsByOrderNumber(formattedDate + randomStr));

        OrderNumber orderNumber = OrderNumber.builder()
                .orderNumber(formattedDate + randomStr)
                .build();

        orderNumberRepository.save(orderNumber);

        return orderNumber.getOrderNumber();
    }
}
