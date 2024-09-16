import React from 'react';

const OrderStatus = ({ status }) => {
    const styles = {
        WAITING: {
            color: '#ffffff',
            border: 'none',
            width: '60px',
            height: '18px',
            fontSize: '14px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
            alignItems: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#bcbcbc',
        },
        REQUEST: {
            color: '#ffffff',
            border: 'none',
            width: '60px',
            height: '18px',
            fontSize: '16px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
            alignItems: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#1270B0',
        },
        ACCEPT: {
            color: '#ffffff',
            backgroundColor: '#348F6C',
            border: 'none',
            width: '60px',
            height: '18px',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
            alignItems: 'center',
            textAlign: 'center',
        },
        DENY: {
            color: '#ffffff',
            border: 'none',
            width: '60px',
            height: '18px',
            fontSize: '16px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px', 
            alignItems: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#C60000',
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

    return statusStyle ? <span style={statusStyle}>{text}</span> : null;
};

export default OrderStatus;