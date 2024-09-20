import React, {useState} from "react";
import ManagementOrderSearchInfoItem from './ManagementOrderSearchInfoItem.js'
import ManagementHistoryModal from '../../Modal/Management/ManagementHistoryModal.js'

const ManagementSearchInfoList = ({ managementOrders, headerKey, headers, onSelectOrder, selectedOrder,  onToggleFavorite, favorites}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleOpenModal = (orderHeaderId) => {
        setSelectedOrderId(orderHeaderId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

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
                        onOpenModal={handleOpenModal}
                    />
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <ManagementHistoryModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    orderId={selectedOrderId}  // Pass order ID if necessary
                />
            )}
        </>
        
    );
};

export default ManagementSearchInfoList;