import React from 'react';
import ProductSearchInfoItem from './ProductSearchInfoItem';

const ProductSearchInfoList = ({ items, headerKey, headers, onOpenModifyModal, onSelectItem, selectedItem }) => {
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
                {/* 필터링된 items 목록을 SearchInfoItem에 전달 */}
                {items.map((item, index) => (
                    <ProductSearchInfoItem 
                    key={index} 
                    item={item} 
                    index={index} 
                    headerKey={headerKey} 
                    onSelectItem={onSelectItem} // 상품 선택 함수만 전달
                    isSelected={selectedItem?.itemCode === item.itemCode} // 선택된 상품인지 확인
                />
                ))}
            </tbody>
        </table>
    );
};

export default ProductSearchInfoList;