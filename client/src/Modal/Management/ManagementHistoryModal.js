import React, { useState, useEffect } from "react";
import axios from "axios";
import './ManagementHistoryModal.css'

const ManagementHistoryModal = ({isOpen, onClose, orderHeaderId }) => {
    const [orderHistories, setOrderHistories] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null); 

    // get orderHistorys/{order-header-id}
    useEffect(() => {
        console.log('isOpen:', isOpen);
        console.log('orderHeaderId:', orderHeaderId);
        if (isOpen && orderHeaderId) {
            fetchOrderHistories(orderHeaderId);
        }
        setSelectedIndex(null);
    }, [isOpen, orderHeaderId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };


    const fetchOrderHistories = async (orderHeaderId) => {
        console.log('Fetching order histories for ID:', orderHeaderId);

        try {
            let accessToken = window.localStorage.getItem('accessToken');
            const response = await axios.get(process.env.REACT_APP_API_URL + 'order-histories' + '/' + orderHeaderId, {
                headers: {
                    Authorization: `${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
            setOrderHistories(response.data.data.histories);

        } catch (err) {
        }
    };

    const handleRowClick = (index) => {
        // 클릭한 인덱스가 현재 선택된 인덱스와 같으면 선택 해제
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else {
            setSelectedIndex(index); // 클릭한 인덱스를 선택
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
            <div className="mh-table-container">
                <table className="mh-order-table">
                    <thead> 
                        <tr>
                            <th>수정일자</th>
                            <th>주문일자</th>
                            <th>주문상태</th>
                            <th>승인일자</th>
                            <th>판매업체코드</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistories.map((orderHeader, index) => (
                        <tr key={index} onClick={() => handleRowClick(index)}
                            className={`mh-order-row' ${index === selectedIndex ? 'mh-selected-row' : ''}`}
                        >
                            <td>{formatDate(orderHeader.createdAt)}</td>
                            <td>{orderHeader.orderDate}</td>
                            <td>{orderHeader.orderHeaderStatus}</td>
                            <td>{orderHeader.acceptDate}</td>
                            <td>{orderHeader.customerCode}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                    <table className="mh-order-item-table">
                        <thead> 
                            <tr>
                                <th>납품요청일자</th>
                                <th>상품코드</th>
                                <th>수량</th>
                                <th>매입단가</th>
                                <th>판매단가</th>
                                <th className="marginRate-width">마진률</th>
                                <th>마진금액</th>
                                <th>최종판매금액</th>
                            </tr>
                        </thead>
                        <tbody>
                        {selectedIndex !== null && orderHistories[selectedIndex]?.orderItemHistories?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.requestDate}</td>
                                    <td>{item.itemCode}</td>
                                    <td>{item.orderItemQuantity}</td>
                                    <td>{item.purchaseAmount}</td>
                                    <td>{item.salesAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className="marginRate-width">{item.marginRate}</td>
                                    <td>{item.marginAmount}</td>
                                    <td>{item.finalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
        </div>
    )
}
export default ManagementHistoryModal;