import React, {useState} from "react";
import ManagementOrderSearchInfoItem from './ManagementOrderSearchInfoItem.js'

const ManagementSearchInfoList = ({ managementOrders, headerKey, headers, onSelectOrder, selectedOrder,  onToggleFavorite, favorites, onOpenHistoryModal}) => {

    return (
        <>
            <table className="search-info-table">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header.value}>{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {managementOrders.map((managementOrder, index) => (
                        <ManagementOrderSearchInfoItem 
                        key={managementOrder.orderHeaderId} 
                        managementOrder={managementOrder} 
                        index={index} 
                        onSelectOrder={onSelectOrder}
                        isSelected={selectedOrder?.orderHeaderId === managementOrder.orderHeaderId}
                        headerKey={headerKey} 
                        onToggleFavorite={onToggleFavorite}
                        favorites={favorites}
                        onOpenHistoryModal={onOpenHistoryModal}
                    />
                    ))}
                </tbody>
            </table>
        </>
        
    );
};

export default ManagementSearchInfoList;