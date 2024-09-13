import React from 'react';
import './OrderSearchInfoList.css';
import OrderSearchInfoItem from './OrderSearchInfoItem';

const OrderSearchInfoList = ({ orders, headerKey, headers}) => {
    return (
        <table className="search-info-table">
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header.value}>{header.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <OrderSearchInfoItem 
                    key={index} 
                    order={order} 
                    index={index} 
                    headerKey={headerKey} 
                />
                ))}
            </tbody>
        </table>
    );
};

export default OrderSearchInfoList;