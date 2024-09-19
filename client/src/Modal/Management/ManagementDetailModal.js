import React, { useState, useEffect } from 'react';
import './ManagementDetailModal.css'
import axios from 'axios';
import ProductSearch from '../Product/ProductSearch';

const ManagementDetailModal = ({ isOpen, onClose, onSubmit, order = {} }) => {
    const [orderDate, setOrderDate] = useState('');
    const [orderHeaderStatus, setOrderHeaderStatus] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [salesAmount, setSalesAmount] = useState('');
    const [orderItemQuantity, setOrderItemQuantity] = useState('');
    const [finalAmount, setFinalAmount] = useState('');
    const [requestDate, setRequestDate] = useState('');
    const [orderItemList, setOrderItemList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isProductSearchOpen, setIsProductSearchOpen] = useState(false); 

    // orderHeader 에 있는 정보인 orderDate, orderHeaderStatus 담음. 
    useEffect(() => {
        if (isOpen && order) {
            setOrderDate(order.orderDate || '');
            setOrderHeaderStatus(order.orderHeaderStatus || '');
            setItemName('');
            setItemCode('');
            setSalesAmount('');
            setOrderItemQuantity('');
            setFinalAmount('');
            setRequestDate('');
            setOrderItemList(order.orderItems || []);
        }
    }, [isOpen, order]);

    const handleSubmit = async () => {
        if (orderItemList.length === 0) {
            alert('등록할 내용이 없습니다.');
            return;
        }

        const requestBody = {
            orderDate,
            orderHeaderStatus,
            orderItems: orderItemList.map(item => ({
                // orderItemId: item.orderItemId,
                itemCode: item.itemCode,
                salesAmount: Number(item.salesAmount),
                orderItemQuantity: Number(item.orderItemQuantity),
                requestDate: item.requestDate,
                // customerCode: item.customerCode,
                // orderDate: item.orderDate,
            })),
        };

        try {
            let accessToken = window.localStorage.getItem('accessToken');
            let orderHeaderId = order.orderHeaderId;

            // 전체 주문 리스트를 서버에 한 번에 Patch 요청
            const response = await axios.patch(process.env.REACT_APP_API_URL + 'orders' +`/${orderHeaderId}`, requestBody, {
                headers: {
                    Authorization: `${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('서버 응답:', response);
            alert('주문이 등록되었습니다.');
            onSubmit(response.data);
            onClose();  // 모달 닫기

        } catch (error) {
            console.error('주문 등록 실패:', error.response ? error.response.data : error.message);
            alert('주문 등록에 실패했습니다.');
        }
    }

    const handleDeleteItem = () => {
        if (selectedIndex === null) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }

        if (window.confirm('삭제하시겠습니까?')) {
            const updatedList = orderItemList.filter((_, i) => i !== selectedIndex);
            setOrderItemList(updatedList);
            setSelectedIndex(null); // 선택 초기화
        }
    };

    const handleModifyItem = () => {
        if (selectedIndex === null) {
            alert('수정할 항목을 선택해주세요.');
            return;
        }
        const updatedList = orderItemList.map((item, index) =>
            index === selectedIndex
                ? {
                      ...item,
                      itemName: itemName,
                      itemCode: itemCode,
                      salesAmount: salesAmount,
                      orderItemQuantity: orderItemQuantity,
                      finalAmount: finalAmount,
                      requestDate: requestDate,
                  }
                : item
        );
    
        setOrderItemList(updatedList);
        setSelectedIndex(null); // 선택 초기화
        alert('아이템이 수정되었습니다.');
    };

    const openProductSearch = () => setIsProductSearchOpen(true);
    const closeProductSearch = () => setIsProductSearchOpen(false);

    const handleProductSelect = (product) => {
        setItemCode(product.itemCode);
        setItemName(product.itemName);
        closeProductSearch();
    };

    //item 누르면 선택. 
    const handleRowClick = (index) => {
        setSelectedIndex((prevSelectedIndex) => 
            prevSelectedIndex === index ? null : index
        );

        const selectedOrderItem = orderItemList[index];
    
        setItemName(selectedOrderItem.itemName);
        setItemCode(selectedOrderItem.itemCode);
        setSalesAmount(selectedOrderItem.salesAmount);
        setOrderItemQuantity(selectedOrderItem.orderItemQuantity);
        setFinalAmount(selectedOrderItem.finalAmount);
        setRequestDate(selectedOrderItem.requestDate);
    };

    return (
        <div className="md-modal">
        <div className="md-order-modal-content">
            <div className="md-order-modal-header">
                <div className="md-modal-title">주문 상세</div>
                <div className="md-modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="md-modal-input-section">
                <div className="md-input-first-line">
                    <input 
                        type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} 
                        placeholder="주문일자"
                    />
                    <select placeholder="주문상태" value={orderHeaderStatus}
                        onChange={(e) => setOrderHeaderStatus(e.target.value)} >
                        <option value="" disabled hidden>주문상태</option>
                        <option value="WAITING">임시저장</option>
                        <option value="REQUEST">승인요청</option>
                    </select>
                </div>
                <div className="md-input-second-line">
                    <input type="search" value={itemName} readOnly onChange={(e) => setItemName(e.target.value)} placeholder="상품명" />
                    <input type="search" value={itemCode} readOnly onChange={(e) => setItemCode(e.target.value)} placeholder="상품코드" />
                    <button className="order-modal-button" onClick={openProductSearch}>검색</button> 
                </div>
                <div className="md-input-third-line">
                    <input type="text" value={salesAmount} onChange={(e) => setSalesAmount(e.target.value)}
                        placeholder ="판매가(원)"
                    />
                    <input type="text" value={orderItemQuantity} onChange={(e) => setOrderItemQuantity(e.target.value)} 
                        placeholder="수량"/>
                </div>
                <div className="md-input-fourth-line">
                    <input type="text" value={finalAmount} onChange={(e) => setFinalAmount(e.target.value)} 
                        placeholder="최종금액" />
                    <input type="date" value={requestDate} onChange={(e) => setOrderDate(e.target.value)} 
                        placeholder="납품요청일자"
                    />
                </div>
            </div>
            <div className="md-option-button-container">
                <button className="md-option-button" onClick={handleDeleteItem}> - 삭제</button>
                <button className="md-option-button" onClick={handleModifyItem}>+ 수정</button>
            </div>
       
            <table className="order-table">
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
                    {orderItemList.map((orderItem, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)} 
                        className={`order-row ${index === selectedIndex ? 'selected-row' : ''}`}
                    >
                        <td>{orderItem.requestDate}</td>
                        <td>{orderItem.itemName}</td>
                        <td>{orderItem.itemCode}</td>
                        <td>{orderItem.salesAmount}</td>
                        <td>{orderItem.orderItemQuantity}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button className="submit-button" onClick={handleSubmit}>등록</button>
        </div>
        {isProductSearchOpen && (
                <ProductSearch onProductSelect={handleProductSelect} onClose={closeProductSearch} />
            )}
      </div>
    )
}
export default ManagementDetailModal;