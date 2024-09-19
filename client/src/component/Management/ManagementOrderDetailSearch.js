import './ManagementOrderDetailSearch.css';
import React, { useState, useEffect } from 'react';

const MyOrderDetailSearch = ({ title, list = [], onSearch }) => {
    const [orderHeaderId, setOrderHeaderId] = useState('');
    const [orderHeaderStatus, setOrderHeaderStatus] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [memberName, setMemberName] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [acceptDate, setAcceptDate] = useState('');
    const [displayKeywords, setDisplayKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState({
        orderHeaderId: '', 
        orderHeaderStatus: '', 
        customerName: '', 
        customerCode: '', 
        memberName: '', 
        orderDate: '', 
        acceptDate: ''
    });

    useEffect(() => {
        const finalOrderHeaderId = selectedKeywords.orderHeaderId;
        const finalOrderHeaderStatus = selectedKeywords.orderHeaderStatus;
        const finalCustomerName = selectedKeywords.customerName;
        const finalCustomerCode = selectedKeywords.customerCode;
        const finalMemberName = selectedKeywords.memberName;
        const finalOrderDate = selectedKeywords.orderDate;
        const finalAcceptDate = selectedKeywords.acceptDate;
        
        onSearch(finalOrderHeaderId, finalOrderHeaderStatus, finalCustomerName, finalCustomerCode, finalMemberName, finalOrderDate, finalAcceptDate);
    }, [selectedKeywords, onSearch]);

    const handleSearch = () => {
        const getOrderStatusDisplay = (status) => {
            if (!status) return ''; 
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

        setSelectedKeywords(prevKeywords => ({
            orderHeaderId: orderHeaderId || prevKeywords.orderHeaderId,
            orderHeaderStatus: orderHeaderStatus || prevKeywords.orderHeaderStatus,
            customerName: customerName || prevKeywords.customerName,
            customerCode: customerCode || prevKeywords.customerCode,
            memberName: memberName || prevKeywords.memberName,
            orderDate: orderDate || prevKeywords.orderDate,
            acceptDate: acceptDate || prevKeywords.acceptDate,
        }));

        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(orderHeaderId && !prevKeywords.includes(`주문번호 : ${orderHeaderId}`) ? [`주문번호 : ${orderHeaderId}`] : []),
            ...(orderHeaderStatus && !prevKeywords.includes(`주문상태 : ${getOrderStatusDisplay(orderHeaderStatus)}`) ? [`주문상태 : ${getOrderStatusDisplay(orderHeaderStatus)}`] : []),
            ...(customerName && !prevKeywords.includes(`판매업체명 : ${customerName}`) ? [`판매업체명 : ${customerName}`] : []),
            ...(customerCode && !prevKeywords.includes(`판매업체코드 : ${customerCode}`) ? [`판매업체코드 : ${customerCode}`] : []),
            ...(memberName && !prevKeywords.includes(`판매사원이름 : ${memberName}`) ? [`판매사원이름 : ${memberName}`] : []),
            ...(orderDate && !prevKeywords.includes(`주문일자 : ${new Date(orderDate).toISOString().split('T')[0]}`) ? [`주문일자 : ${new Date(orderDate).toISOString().split('T')[0]}`] : []),
            ...(acceptDate && !prevKeywords.includes(`승인일자 : ${new Date(acceptDate).toISOString().split('T')[0]}`) ? [`승인일자 : ${new Date(acceptDate).toISOString().split('T')[0]}`] : []),
        ]);

        setOrderHeaderId('');
        setOrderHeaderStatus('');
        setCustomerName('');
        setCustomerCode('');
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
            } else if (keywordToRemove.startsWith('주문상태')) {
                updatedKeywords.orderHeaderStatus = '';
            } else if (keywordToRemove.startsWith('판매업체명')) {
                updatedKeywords.customerName = '';
            } else if (keywordToRemove.startsWith('판매업체코드')) {
                updatedKeywords.customerCode = '';
            } else if (keywordToRemove.startsWith('판매사원이름')) {
                updatedKeywords.memberName = '';
            } else if (keywordToRemove.startsWith('주문일자')) {
                updatedKeywords.orderDate = '';
            } else if (keywordToRemove.startsWith('승인일자')) {
                updatedKeywords.acceptDate = '';
            }

            onSearch(
                updatedKeywords.orderHeaderId,
                updatedKeywords.orderHeaderStatus,
                updatedKeywords.customerName,
                updatedKeywords.customerCode,
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
            <div className="my-order-form-container">
                <div className="my-order-form-row">
                    <input type="search" placeholder="주문번호" value={orderHeaderId}
                        onChange={(e) => setOrderHeaderId(e.target.value)}
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
                    <input type="search" placeholder="판매업체명" value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input type="search" placeholder="판매업체코드" value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input type="date" placeholder="주문일자" value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                    />
                    <input type="date" placeholder="승인일자" value={acceptDate || ''}
                        onChange={(e) => setAcceptDate(e.target.value)}
                    />
                </div>
                <div className="my-order-form-row">
                    <input type="search" placeholder="판매사원 이름" value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />     
                    <button className="my-order-search-button" onClick={handleSearch}>조회</button>
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

export default MyOrderDetailSearch;
