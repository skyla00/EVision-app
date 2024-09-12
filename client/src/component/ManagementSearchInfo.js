import React, { useState, useEffect } from 'react';
import './ManagementSearchInfo.css';
import ManagementSearchInfoList from './ManagementSearchInfoList.js'

const ManagementSearchInfo = ({ title, headers, managementOrders = [], onRowSelect, onOpenModal, selectedIndex }) => {

    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`)
    }
    
    const headerKey = headers.map(header => header.value);

    return (
        <div className="search-info-container">
            <div className="search-info-header"> {}
                {title && <div className="search-info-title">{title}</div>}
                <div className="button-container">
                    <button className="detail-button" onClick={onOpenModal}> 상세보기 </button> 
                </div>
            </div>
            <div className="search-info-section">
                <ManagementSearchInfoList
                    managementOrders={managementOrders.length > 0 ? managementOrders : []}
                    headerKey={headerKey} 
                    headers={headers} 
                />
            </div>
        </div>
    );
};


export default ManagementSearchInfo;