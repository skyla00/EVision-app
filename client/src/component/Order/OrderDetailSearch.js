import './OrderDetailSearch.css';
import React, { useState, useEffect } from 'react';

const OrderDetailSearch = ({ title, onSearch}) => {
    const [orderHeaderId, setOrderHeaderId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [orderHeaderStatus, setOrderHeaderStatus] = useState('');
    const [memberName, setMemberName] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [requestDate, setRequestDate] = useState('');
    const [acceptDate, setAcceptDate] = useState('');
    const [displayKeywords, setDisplayKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState({
        orderHeaderId: '', 
        itemName: '', 
        itemCode: '', 
        customerName: '', 
        customerCode: '', 
        orderHeaderStatus: '', 
        memberName: '', 
        orderDate: '', 
        requestDate: '', 
        acceptDate: ''
    });

    useEffect(() => {
        const finalOrderHeaderId = orderHeaderId || selectedKeywords.orderHeaderId;
        const finalItemName = itemName || selectedKeywords.itemName;
        const finalItemCode = itemCode || selectedKeywords.itemCode;
        const finalCustomerName = customerName || selectedKeywords.customerName;
        const finalCustomerCode = customerCode || selectedKeywords.customerCode;
        const finalOrderHeaderStatus = orderHeaderStatus || selectedKeywords.orderHeaderStatus;
        const finalMemberName = memberName || selectedKeywords.memberName;
        // 날짜 값을 ISO 문자열로 변환하여 비교
        const finalOrderDate = orderDate ? new Date(orderDate).toISOString().split('T')[0] : selectedKeywords.orderDate;
        const finalRequestDate = requestDate ? new Date(requestDate).toISOString().split('T')[0] : selectedKeywords.requestDate;
        const finalAcceptDate = acceptDate ? new Date(acceptDate).toISOString().split('T')[0] : selectedKeywords.acceptDate;

        onSearch(finalOrderHeaderId, finalItemName, finalItemCode, finalCustomerName, finalCustomerCode,
            finalOrderHeaderStatus, finalMemberName, finalOrderDate, finalRequestDate, finalAcceptDate);
    }, [orderHeaderId, itemName, itemCode, customerName, customerCode, orderHeaderStatus, memberName, orderDate, requestDate, acceptDate, setSelectedKeywords, onSearch]);
    
    const handleSearch = () => {

        const getOrderStatusDisplay = (status) => {
            switch (status) {
                case 'WAITING':
                    return '임시저장';
                case 'REQUEST':
                    return '승인요청';
                case 'ACCEPT':
                    return '승인';
                case 'DENY':
                    return '반려';
                default:
                    return '';
            }
        };
        

        // 필터링에 사용할 순수한 값을 저장. 입력된 값이 있으면 selectedKeywords 상태에 저장
        setSelectedKeywords(prevKeywords => ({
            orderHeaderId: orderHeaderId || prevKeywords.orderHeaderId,
            itemName: itemName || prevKeywords.itemName,
            itemCode: itemCode || prevKeywords.itemCode,
            customerName: customerName || prevKeywords.customerName,
            customerCode: customerCode || prevKeywords.customerCode,
            orderHeaderStatus: orderHeaderStatus || prevKeywords.orderHeaderStatus,
            memberName: memberName || prevKeywords.memberName,
            orderDate: orderDate || prevKeywords.orderDate,
            requestDate: requestDate || prevKeywords.requestDate,
            acceptDate: acceptDate || prevKeywords.acceptDate,
        }));
    
        // 화면에 표시할 키워드를 저장 (UI용)
        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(orderHeaderId ? [`주문번호: ${orderHeaderId}`] : []),
            ...(itemName ? [`상품명: ${itemName}`] : []),
            ...(itemCode ? [`상품코드: ${itemCode}`] : []),
            ...(customerName ? [`판매처명: ${customerName}`] : []),
            ...(customerCode ? [`판매처코드: ${customerCode}`] : []),
            ...(orderHeaderStatus ? [`주문상태: ${getOrderStatusDisplay(orderHeaderStatus)}`] : []),
            ...(memberName ? [`판매사원이름: ${memberName}`] : []),
            ...(orderDate ? [`주문일자: ${new Date(orderDate).toISOString().split('T')[0]}`] : []),
            ...(requestDate ? [`납품요청일자: ${new Date(requestDate).toISOString().split('T')[0]}`] : []),
            ...(acceptDate ? [`납품확정일자: ${new Date(acceptDate).toISOString().split('T')[0]}`] : []),
        ]);

        setOrderHeaderId('');
        setItemName('');
        setItemCode('');
        setCustomerName('');
        setCustomerCode('');
        setOrderHeaderStatus('');
        setMemberName('');
        setOrderDate('');
        setRequestDate('');
        setAcceptDate('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const removeKeyword = (keywordToRemove) => {
        // 화면에 표시할 키워드에서 제거할 항목 필터링
        setDisplayKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToRemove));
    
        // 상태 업데이트 후 실행할 콜백 함수
        setSelectedKeywords(prev => {
            let updatedKeywords = { ...prev };
    
            // 키워드에 따라 해당하는 상태값을 빈 값으로 변경
            if (keywordToRemove.startsWith('주문번호')) {
                updatedKeywords.orderHeaderId = '';
            } else if (keywordToRemove.startsWith('상품명')) {
                updatedKeywords.itemName = '';
            } else if (keywordToRemove.startsWith('상품코드')) {
                updatedKeywords.itemCode = '';
            } else if (keywordToRemove.startsWith('판매처명')) {
                updatedKeywords.customerName = '';
            } else if (keywordToRemove.startsWith('판매처코드')) {
                updatedKeywords.customerCode = '';
            } else if (keywordToRemove.startsWith('주문상태')) {
                updatedKeywords.orderHeaderStatus = '';
            } else if (keywordToRemove.startsWith('판매사원이름')) {
                updatedKeywords.memberName = '';
            } else if (keywordToRemove.startsWith('주문일자')) {
                updatedKeywords.orderDate = '';
            } else if (keywordToRemove.startsWith('납품요청일자')) {
                updatedKeywords.requestDate = '';
            } else if (keywordToRemove.startsWith('납품확정일자')) {
                updatedKeywords.acceptDate = '';
            }
    
            // 업데이트된 상태로 onSearch 호출
            onSearch(
                updatedKeywords.orderHeaderId,
                updatedKeywords.itemName,
                updatedKeywords.itemCode,
                updatedKeywords.customerName,
                updatedKeywords.customerCode,
                updatedKeywords.orderHeaderStatus,
                updatedKeywords.memberName,
                updatedKeywords.orderDate,
                updatedKeywords.requestDate,
                updatedKeywords.acceptDate
            );
    
            // 상태 업데이트를 반환
            return updatedKeywords;
        });
    };

    return (
        <div className="detail-search-box">
        <div className="detail-search-title"> {}
            {title && <div className="form-title"></div>}
        </div>
        <div className="order-form-container">            <div className="order-form-row">
                <input type="search" placeholder="주문번호" value={orderHeaderId}
                        onChange={(e) => setOrderHeaderId(e.target.value)} 
                        onKeyPress={handleKeyPress}
                     />
                <input type="search" placeholder="상품명" value={itemName}
                        onChange={(e) => setItemName(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="search" placeholder="상품코드" value={itemCode}
                        onChange={(e) => setItemCode(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                 <input type="search" placeholder="판매처명" value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="search" placeholder="판매처 코드" value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <select placeholder="주문상태" value={orderHeaderStatus}
                        onChange={(e) => setOrderHeaderStatus(e.target.value)} 
                        onKeyPress={handleKeyPress}>
                    <option value="" disabled hidden>주문상태</option>
                    <option value="WAITING">임시저장</option>
                    <option value="REQUEST">승인요청</option>
                    <option value="ACCEPT">승인</option>
                    <option value="DENY">반려</option>
                </select>
            </div>
            <div className="order-form-row">
                <input type="search" placeholder="판매사원 이름" value={memberName}
                        onChange={(e) => setMemberName(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="date" placeholder="주문일자" value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        onKeyPress={handleKeyPress}
                />
                <input type="date" placeholder="납품요청일자" value={requestDate}
                        onChange={(e) => setRequestDate(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="date" placeholder="납품확정일자" value={acceptDate}
                        onChange={(e) => setAcceptDate(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <button className="order-search-button" onClick={handleSearch}>조회</button>
            </div>
            <div className="selected-keywords">
            <img src="/image/keyword.png" alt="키워드" className="keyword-icon"></img>
                {displayKeywords.map((value, index) => (
                <div key={index} className="keyword-tag">
                    {value}
                        <button onClick={() => removeKeyword(value)}>X</button>
                </div>
                ))}
            </div>
        </div>
    </div>
  ); 
};

export default OrderDetailSearch;
