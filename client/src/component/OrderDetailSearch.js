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
        const finalOrderDate = orderDate || selectedKeywords.orderDate;
        const finalRequestDate = requestDate || selectedKeywords.requestDate;
        const finalAcceptDate = acceptDate || selectedKeywords.acceptDate;

        onSearch(finalOrderHeaderId, finalItemName, finalItemCode, finalCustomerName, finalCustomerCode,
            finalOrderHeaderStatus, finalMemberName, finalOrderDate, finalRequestDate, finalAcceptDate);
        }, [orderHeaderId, itemName, itemCode, customerName, customerCode, orderHeaderStatus, memberName, orderDate, requestDate, acceptDate, setSelectedKeywords, onSearch]);
    
    const handleSearch = () => {
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

        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(orderHeaderId ? [`주문번호: ${orderHeaderId}`] : []),
            ...(itemName ? [`상품명: ${itemName}`] : []),
            ...(itemCode ? [`상품코드: ${itemCode}`] : []),
            ...(customerName ? [`판매처명: ${customerName}`] : []),
            ...(customerCode ? [`판매처 코드: ${customerCode}`] : []),
            ...(orderHeaderStatus ? [`주문상태: ${orderHeaderStatus}`] : []),
            ...(memberName ? [`판매사원 이름: ${memberName}`] : []),
            ...(orderDate ? [`주문일자: ${orderDate}`] : []),
            ...(requestDate ? [`납품요청일자: ${requestDate}`] : []),
            ...(acceptDate ? [`납품확정일자: ${acceptDate}`] : []),
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
            {title && <div className="form-title">{title}</div>}
        </div>
        <div className="order-form-container">
            <div className="order-form-row">
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
                <input type="search" placeholder="주문일자" value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="search" placeholder="납품요청일자" value={requestDate}
                        onChange={(e) => setRequestDate(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="search" placeholder="납품확정일자" value={acceptDate}
                        onChange={(e) => setAcceptDate(e.target.value)} 
                        onKeyPress={handleKeyPress}
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
