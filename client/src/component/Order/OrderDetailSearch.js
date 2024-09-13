import './OrderDetailSearch.css';
import React, { useState, useEffect } from 'react';

const OrderDetailSearch = ({ title, list = [], onSearch}) => {
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
        setSelectedKeywords(prevKeywords => ({
            orderHeaderId: orderHeaderId ? `주문번호 : ${orderHeaderId}` : prevKeywords.orderHeaderId,
            itemName: itemName ? `상품명 : ${itemName}` : prevKeywords.itemName,
            itemCode: itemCode ? `상품코드 : ${itemCode}` : prevKeywords.itemCode,
            customerName: customerName ? `판매처명 : ${customerName}` : prevKeywords.customerName,
            customerCode: customerCode ? `판매처코드 : ${customerCode}` : prevKeywords.customerCode,
            orderHeaderStatus: orderHeaderStatus ? `주문상태 : ${orderHeaderStatus}` : prevKeywords.orderHeaderStatus,
            memberName: memberName ? `판매사원이름 : ${memberName}` : prevKeywords.memberName,
            orderDate: orderDate ? `주문일자 : ${new Date(orderDate).toISOString().split('T')[0]}` : prevKeywords.orderDate,
            requestDate: requestDate ? `납품요청일자 : ${new Date(requestDate).toISOString().split('T')[0]}` : prevKeywords.requestDate,
            acceptDate: acceptDate ? `납품확정일자 : ${new Date(acceptDate).toISOString().split('T')[0]}` : prevKeywords.acceptDate,
        }));

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
        const updatedKeywords = { ...selectedKeywords };
        updatedKeywords[keywordToRemove] = ''; // 해당 키워드를 빈 값으로 설정
        setSelectedKeywords(updatedKeywords);
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
            updatedKeywords.acceptDate,
        );
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
                <input type="search" placeholder="주문상태" value={orderHeaderStatus}
                        onChange={(e) => setOrderHeaderStatus(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
            </div>
            <div className="order-form-row">
                <input type="search" placeholder="판매사원 이름" value={memberName}
                        onChange={(e) => setMemberName(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="date" placeholder="주문일자" value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                />
                <input type="date" placeholder="납품요일자" value={requestDate}
                        onChange={(e) => setRequestDate(e.target.value)} 
                />
                <input type="date" placeholder="납품확정일자" value={acceptDate}
                        onChange={(e) => setAcceptDate(e.target.value)} 
                />
                <button className="order-search-button" onClick={handleSearch}>조회</button>
            </div>
            <div className="selected-keywords">
                <img src="/image/keyword.png" alt="키워드" className="keyword-icon"></img>
                {Object.entries(selectedKeywords).map(([key, value]) => (
                        value && (
                            <div key={key} className="keyword-tag">
                                {value}
                                <button onClick={() => removeKeyword(key)}>X</button>
                            </div>
                        )
                    ))}
            </div>
        </div>
    </div>
  ); 
};

export default OrderDetailSearch;
