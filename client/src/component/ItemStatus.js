import React from 'react';

const ItemStatus = ({ status }) => {
    const styles = {
        ON_SALE: {
            color: '#1270B0',
            border: '1px solid #1270B0',
            width: '50px',
            height: '16px',
            fontSize: '13px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
        NOT_FOR_SALE: {
            color: '#999999',
            border: '1px solid #999999',
            width: '50px',
            height: '16px',
            fontSize: '13px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
        },
    };
    const statusText = {
        ON_SALE: '판매중',
        NOT_FOR_SALE: '판매중지',
    };

    // 상태에 따라 스타일 선택
    const statusStyle = styles[status] || null;
    const text = statusText[status] || '';

    console.log('Status:', status, 'Style:', statusStyle);

    return statusStyle ? <span style={statusStyle}>{text}</span> : null;
};

export default ItemStatus;