import React, { useState, useEffect } from 'react';
import './ManagementSearchInfo.css';
import ManagementSearchInfoList from './ManagementSearchInfoList.js'

const ManagementSearchInfo = ({ title, headers, managementOrders = [], onSelectOrder, onOpenDetailModal, selectedOrder }) => {

    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`)
    }
    
    const headerKey = headers.map(header => header.value);

        // 상세보기버튼을 클릭했을 때 선택된 상품이 있는지 확인
    const handleDetailClick = () => {
            if (selectedOrder) {
                onOpenDetailModal(selectedOrder); 
            } else {
                alert('상세보기할 상품을 선택하세요.');
            }
        };
    console.log(onOpenDetailModal);
    

    return (
        <div className="search-info-container">
            <div className="search-info-header"> {}
                {title && <div className="search-info-title">{title}</div>}
                <div className="button-container">
                    <button className="detail-button" onClick={handleDetailClick}> 상세보기 </button> 
                </div>
            </div>
            <div className="search-info-section">
                <ManagementSearchInfoList
                    managementOrders={managementOrders.length > 0 ? managementOrders : []}
                    headerKey={headerKey}
                    onSelectOrder= {onSelectOrder}
                    selectedOrder={selectedOrder}
                    headers={headers} 
                />
            </div>
        </div>
    );
};


export default ManagementSearchInfo;