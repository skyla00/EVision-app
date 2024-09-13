import React from 'react';
import './CustomerSearchInfoList.css';
import CustomerSearchInfoItem from './CustomerSearchInfoItem';

const CustomerSearchInfoList = ({ customers, headerKey, headers, onOpenModifyModal, onSelectCustomer, selectedCustomer }) => {
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
                {/* 필터링된 customers 목록을 CustomerSearchInfo에 전달 */}
                {customers.map((customer, index) => (
                    <CustomerSearchInfoItem 
                    key={index} 
                    customer={customer} 
                    index={index} 
                    headerKey={headerKey} 
                    onSelectCustomer={onSelectCustomer} // 판매업체 선택 함수만 전달
                    isSelected={selectedCustomer?.customerCode === customer.customerCode} // 선택된 판매업체인지 확인
                />
                ))}
            </tbody>
        </table>
    );
};

export default CustomerSearchInfoList;