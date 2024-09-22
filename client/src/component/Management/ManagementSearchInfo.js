import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagementSearchInfoList from './ManagementSearchInfoList.js'

const ManagementSearchInfo = ({ title, headers, managementOrders = [], onSelectOrder, onOpenOrderModal, onOpenDetailModal, onOpenHistoryModal, selectedOrder, onToggleFavorite, favorites }) => {

    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`)
    }
    
    const extendedHeaders = [
        ...headers,
        { value: 'favorite', label: '즐겨찾기' }
    ];

    const headerKey = headers.map(header => header.value);

    const handleDetailClick = () => {
        onOpenDetailModal(selectedOrder);   
    };

    const handleDeleteClick = async () => {
        if (selectedOrder) {
            let message = window.confirm('정말 삭제하시겠습니까?')
            if(message) {
                let accessToken = window.localStorage.getItem('accessToken');
                try {
                    const response = await axios.delete(process.env.REACT_APP_API_URL + 'orders' + '/' + selectedOrder.orderHeaderId,
                        {   headers: {
                                Authorization: `${accessToken}`,
                                'Content-Type': 'application/json',
                            }
                        });
                        if (response.status === 204) {
                            window.location.reload();
                        }
                } catch (error) {
                    if (error.response) {
                        const { status, message } = error.response.data;
    
                        // 상태 코드와 메시지에 따라 다른 메시지 표시
                        if (status === 409 && message === 'Order Not Belong To Member') {
                            alert('자신의 주문만 삭제할 수 있습니다.');
                        } else if (status === 404 && message === 'Invalid Delete Request'){
                            alert(`승인된 주문은 삭제할 수 없습니다.`);
                        } else {
                            alert(`에러 발생: ${message}`);
                        }
                    } else {
                        alert('주문 삭제에 실패했습니다.');
                    }
                }
            }
        } else {
            alert('삭제할 주문을 선택하세요.'); // 선택된 주문이 없을 때 경고
        }

    };

    return (
        <div className="search-info-container">
            <div className="search-info-header"> {}
                {title && <div className="search-info-title">{title}</div>}
                <div className="button-container">
                <button className="order-button" onClick= {() => {
                        onOpenOrderModal();
                        }}
                    > 등록 </button> 
                    <button className="detail-button" onClick={handleDetailClick}> 상세보기 </button>
                    <button className="modify-button" onClick={handleDeleteClick}> 삭제 </button>
                    </div>
            </div>
            <div className="search-info-section">
                <ManagementSearchInfoList
                    managementOrders={managementOrders.length > 0 ? managementOrders : []}
                    headerKey={headerKey}
                    onSelectOrder= {onSelectOrder}
                    selectedOrder={selectedOrder}
                    headers={headers}
                    onToggleFavorite={onToggleFavorite}
                    favorites={favorites} 
                    onOpenHistoryModal={onOpenHistoryModal}
                />
            </div>
        </div>
    );
};


export default ManagementSearchInfo;