import React from 'react';
import './SalesPriceSearchInfoList.css';
import SalesPriceSearchInfoItem from './SalesPriceSearchInfoItem';

const SalesPriceSearchInfoList = ({ salesPirces, headerKey, headers, onOpenModifyModal, onSelectSalesPrice, selectedSalesPrice }) => {
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
                {/* 필터링된 salesPrice 목록을 SalesPriceSearchInfo에 전달 */}
                {salesPirces.map((salesPrice, index) => (
                    <SalesPriceSearchInfoItem 
                    key={index} 
                    salesPrice={salesPrice} 
                    index={index} 
                    headerKey={headerKey}  
                    onSelectSalesPrice={onSelectSalesPrice} // 판매가 선택 함수만 전달
                    isSelected={selectedSalesPrice && selectedSalesPrice.salesPriceId === salesPrice.salesPriceId}// 선택된 판매가인지 확인
                />
                ))}
            </tbody>
        </table>
    );
};

export default SalesPriceSearchInfoList;