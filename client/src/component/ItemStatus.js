import React from 'react';

const ItemStatus = ({ status }) => {
    const styles = {
        ON_SALE: {
            color: '#ffffff',
            border: '1px solid #1270B0',
            width: '50px',
            height: '16px',
            fontSize: '14px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
            alignItems: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#1270B0',
        },
        NOT_FOR_SALE: {
            color: '#ffffff',
            border: '1px solid #999999',
            width: '50px',
            height: '16px',
            fontSize: '14px',
            display: 'inline-block',
            padding: '5px',
            borderRadius: '5px',
            alignItems: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#999999',
        },
    };
    const statusText = {
        ON_SALE: '판매중',
        NOT_FOR_SALE: '판매중지',
    };

    // 상태에 따라 스타일 선택
    const statusStyle = styles[status] || null;
    const text = statusText[status] || '';

    return statusStyle ? <span style={statusStyle}>{text}</span> : null;
};

export default ItemStatus;