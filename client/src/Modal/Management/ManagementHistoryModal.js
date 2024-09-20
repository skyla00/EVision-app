import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagementHistoryModal = ({isOpen, onClose, orderHeaderId }) => {
    const [orderHistories, setOrderHistories] = useState([]);

    // get orderHistorys/{order-header-id}
    useEffect(() => {
        if (isOpen && orderHeaderId) {
            fetchOrderHistories(orderHeaderId);
        }
    }, [isOpen, orderHeaderId]);

    const fetchOrderHistories = async (orderHeaderId) => {

        try {
            let accessToken = window.localStorage.getItem('accessToken');
            const response = await axios.get(process.env.REACT_APP_API_URL + 'order-histories', {
                params: { 
                    'order-header-id': orderHeaderId 
                },
                headers: {
                    Authorization: `${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
            setOrderHistories(response.data);

        } catch (err) {
            setError('Failed to fetch order histories.');
        }
    };


    if (!isOpen) {
        return null;
    }
    return (
        <div className="mh-modal">
        <div className="mh-modal-content">
            <div className="mh-modal-header">
                <div className="modal-title">주문 히스토리</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>
            <table className="mh-order-table">
                <thead> 
                    <tr>
                        <th>주문일자</th>
                        <th>주문상태</th>
                        <th>승인일자</th>
                        <th>판매업체코드</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistories.map((orderHeader, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)}
                        className={`order-row ${index === selectedIndex ? 'selected-row' : ''}`}
                    >
                        <td>{orderHeader.orderDate}</td>
                        <td>{orderHeader.orderHeaderStatus}</td>
                        <td>{orderHeader.acceptDate}</td>
                        <td>{orderHeader.customerCode}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <table className="order-item-table">
                <thead> 
                    <tr>
                        <th>납품요청일자</th>
                        <th>상품명</th>
                        <th>상품코드명</th>
                        <th>판매가</th>
                        <th>수량</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistories.orderItemHistories.map((item, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)} 
                        className={`order-row ${index === selectedIndex ? 'selected-row' : ''}`}
                    >
                        <td>{item.deliveryDate}</td>
                        <td>{item.itemName}</td>
                        <td>{item.itemCode}</td>
                        <td>{item.salesAmount}</td>
                        <td>{item.orderItemQuantity}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}
export default ManagementHistoryModal;