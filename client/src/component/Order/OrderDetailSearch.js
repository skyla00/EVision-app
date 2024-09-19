import './OrderDetailSearch.css';
import React, { useState, useEffect } from 'react';

const OrderDetailSearch = ({ title, onSearch }) => {
    const [orderHeaderId, setOrderHeaderId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [orderHeaderStatus, setOrderHeaderStatus] = useState('');
    const [memberName, setMemberName] = useState('');
    const [orderDate, setOrderDate] = useState('');
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
        acceptDate: ''
    });

    useEffect(() => {
        const finalOrderHeaderId = selectedKeywords.orderHeaderId;
        const finalItemName = selectedKeywords.itemName;
        const finalItemCode = selectedKeywords.itemCode;
        const finalCustomerName = selectedKeywords.customerName;
        const finalCustomerCode = selectedKeywords.customerCode;
        const finalOrderHeaderStatus = selectedKeywords.orderHeaderStatus;
        const finalMemberName = selectedKeywords.memberName;
        const finalOrderDate = selectedKeywords.orderDate;
        const finalAcceptDate = selectedKeywords.acceptDate;

        onSearch(finalOrderHeaderId, finalItemName, finalItemCode, finalCustomerName, finalCustomerCode,
            finalOrderHeaderStatus, finalMemberName, finalOrderDate, finalAcceptDate);
    }, [selectedKeywords, onSearch]);

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
            acceptDate: acceptDate || prevKeywords.acceptDate,
        }));

        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(orderHeaderId && !prevKeywords.includes(`주문번호: ${orderHeaderId}`) ? [`주문번호: ${orderHeaderId}`] : []),
            ...(itemName && !prevKeywords.includes(`상품명: ${itemName}`) ? [`상품명: ${itemName}`] : []),
            ...(itemCode && !prevKeywords.includes(`상품코드: ${itemCode}`) ? [`상품코드: ${itemCode}`] : []),
            ...(customerName && !prevKeywords.includes(`판매업체명: ${customerName}`) ? [`판매업체명: ${customerName}`] : []),
            ...(customerCode && !prevKeywords.includes(`판매업체코드: ${customerCode}`) ? [`판매업체코드: ${customerCode}`] : []),
            ...(orderHeaderStatus && !prevKeywords.includes(`주문상태: ${orderHeaderStatus}`) ? [`주문상태: ${orderHeaderStatus}`] : []),
            ...(memberName && !prevKeywords.includes(`판매사원이름: ${memberName}`) ? [`판매사원이름: ${memberName}`] : []),
            ...(orderDate && !prevKeywords.includes(`주문일자: ${new Date(orderDate).toISOString().split('T')[0]}`) ? [`주문일자: ${new Date(orderDate).toISOString().split('T')[0]}`] : []),
            ...(acceptDate && !prevKeywords.includes(`승인일자: ${new Date(acceptDate).toISOString().split('T')[0]}`) ? [`승인일자: ${new Date(acceptDate).toISOString().split('T')[0]}`] : []),
        ]);

        setOrderHeaderId('');
        setItemName('');
        setItemCode('');
        setCustomerName('');
        setCustomerCode('');
        setOrderHeaderStatus('');
        setMemberName('');
        setOrderDate('');
        setAcceptDate('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const removeKeyword = (keywordToRemove) => {
        setDisplayKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToRemove));

        setSelectedKeywords(prev => {
            let updatedKeywords = { ...prev };

            if (keywordToRemove.startsWith('주문번호')) {
                updatedKeywords.orderHeaderId = '';
            } else if (keywordToRemove.startsWith('상품명')) {
                updatedKeywords.itemName = '';
            } else if (keywordToRemove.startsWith('상품코드')) {
                updatedKeywords.itemCode = '';
            } else if (keywordToRemove.startsWith('판매업체명')) {
                updatedKeywords.customerName = '';
            } else if (keywordToRemove.startsWith('판매업체코드')) {
                updatedKeywords.customerCode = '';
            } else if (keywordToRemove.startsWith('주문상태')) {
                updatedKeywords.orderHeaderStatus = '';
            } else if (keywordToRemove.startsWith('판매사원이름')) {
                updatedKeywords.memberName = '';
            } else if (keywordToRemove.startsWith('주문일자')) {
                updatedKeywords.orderDate = '';
            } else if (keywordToRemove.startsWith('승인일자')) {
                updatedKeywords.acceptDate = '';
            }

            onSearch(
                updatedKeywords.orderHeaderId,
                updatedKeywords.itemName,
                updatedKeywords.itemCode,
                updatedKeywords.customerName,
                updatedKeywords.customerCode,
                updatedKeywords.orderHeaderStatus,
                updatedKeywords.memberName,
                updatedKeywords.orderDate,
                updatedKeywords.acceptDate
            );

            return updatedKeywords;
        });
    };

    return (
        <div className="detail-search-box">
            <div className="detail-search-title">
                {title && <div className="form-title"></div>}
            </div>
            <div className="order-form-container">
                <div className="order-form-row">
                    <input type="search" placeholder="주문번호" value={orderHeaderId}
                        onChange={(e) => setOrderHeaderId(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input type="search" placeholder="상품코드" value={itemCode}
                        onChange={(e) => setItemCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input type="search" placeholder="상품명" value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input type="search" placeholder="판매업체코드" value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input type="search" placeholder="판매업체명" value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input type="search" placeholder="판매사원 이름" value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="order-form-row">
                    <input type="date" placeholder="주문일자" value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                    />
                    <input type="date" placeholder="승인일자" value={acceptDate}
                        onChange={(e) => setAcceptDate(e.target.value)}
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
