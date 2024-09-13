import React from 'react';

const OrderStatus = ({ status }) => {
    const styles = {
        WAITING: {
            color: '#A1A1A1',
            border: '1px solid #A1A1A1',
            width: '50px',
            height: '16px',
            fontSize: '15px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
        REQUEST: {
            color: '#1270B0',
            border: '1px solid #1270B0',
            width: '50px',
            height: '16px',
            fontSize: '15px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
        ACCEPT: {
            color: '#348F6C',
            border: '1px solid #348F6C',
            width: '50px',
            height: '16px',
            fontSize: '15px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
        DENY: {
            color: '#C60000',
            border: '1px solid #C60000',
            width: '50px',
            height: '16px',
            fontSize: '15px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        }
    };
    const statusText = {
        WAITING: '임시저장',
        REQUEST: '승인 요청',
        ACCEPT: '승인',
        DENY: '거부',
    };

    // 상태에 따라 스타일 선택
    const statusStyle = styles[status] || null;
    const text = statusText[status] || '';

    console.log('Status:', status, 'Style:', statusStyle);

    return statusStyle ? <span style={statusStyle}>{text}</span> : null;
};

export default OrderStatus;