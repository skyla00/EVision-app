import React from 'react';

const OrderStatus = ({ status }) => {
    const styles = {
        orderRequest: {
            color: '#1270B0',
            border: '1px solid #1270B0',
            width: '4vw',
            height: '2vw',
            fontSize: '1vw',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
        reject: {
            color: '#C60000',
            border: '1px solid #C60000',
            width: '4vw',
            height: '2vw',
            fontSize: '1vw',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
        approval: {
            color: '#348F6C',
            border: '1px solid #348F6C',
            width: '4vw',
            height: '2vw',
            fontSize: '1vw',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
        temporary: {
            color: '#A1A1A1',
            border: '1px solid #A1A1A1',
            width: '4vw',
            height: '2vw',
            fontSize: '1vw',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
    };

    // 상태에 따라 스타일 선택
    const statusStyle = styles[status] || null;

    return statusStyle ? <span style={statusStyle}>{status}</span> : null;
};

export default OrderStatus;