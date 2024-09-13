import './ManagementOrderDetailSearch.css'
import React, { useState, useEffect } from 'react';

const MyOrderDetailSearch = ({ title, list = [], onSearch}) => {
//orderHeaderId, orderHeaderStatus, customerName, customerCode, memberName, orderDate, acceptDate 
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
        const finalOrderHeaderId = orderHeaderId || selectedKeywords.orderHeaderId;
        const finalOrderHeaderStatus = orderHeaderStatus || selectedKeywords.orderHeaderStatus;
        const finalCustomerName = customerName || selectedKeywords.customerName;
        const finalCustomerCode = customerCode || selectedKeywords.customerCode;
        const finalMemberName = memberName || selectedKeywords.memberName;
        const finalOrderDate = orderDate || selectedKeywords.orderDate;
        const finalAcceptDate = acceptDate || selectedKeywords.acceptDate;
        onSearch(finalOrderHeaderId, finalOrderHeaderStatus, finalCustomerName,
            finalCustomerCode, finalMemberName, finalOrderDate, finalAcceptDate);
    }, [orderHeaderId, orderHeaderStatus, customerName, customerCode, memberName, orderDate, acceptDate, setSelectedKeywords, onSearch]);

    const handleSearch = () => {
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
            ...(orderHeaderId ? [`주문번호: ${orderHeaderId}`] : []),
            ...(orderHeaderStatus ? [`주문상태: ${orderHeaderStatus}`] : []),
            ...(customerName ? [`판매처명: ${customerName}`] : []),
            ...(customerCode ? [`판매처 코드: ${customerCode}`] : []),
            ...(memberName ? [`판매사원 이름: ${memberName}`] : []),
            ...(orderDate ? [`주문일자: ${orderDate}`] : []),
            ...(acceptDate ? [`납품확정일자: ${acceptDate}`] : []),
        ]);

        setOrderHeaderId('');
        setOrderHeaderStatus('');
        setCustomerName('');
        setCustomerCode('');
        setMemberName('');
        setOrderDate('');
        setAcceptDate('');
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const removeKeyword = (keywordToRemove) => {
        const updatedKeywords = { ...selectedKeywords };
        updatedKeywords[keywordToRemove] = ''; 
        setSelectedKeywords(updatedKeywords);
        onSearch(
            updatedKeywords.orderHeaderId,
            updatedKeywords.orderHeaderStatus,
            updatedKeywords.customerName,
            updatedKeywords.customerCode,
            updatedKeywords.memberName,
            updatedKeywords.orderDate,
            updatedKeywords.acceptDate,
        );

    };

    return (
        <div className="detail-search-box">
        <div className="detail-search-title"> {}
            {title && <div className="form-title">{title}</div>}
        </div>
        <div className="my-order-form-container">
            <div className="my-order-form-row">
                <input type="search" placeholder="주문번호" value={orderHeaderId}
                        onChange={(e) => setOrderHeaderId(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="search" placeholder="주문상태" value={orderHeaderStatus}
                        onChange={(e) => setOrderHeaderStatus(e.target.value)} 
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
                <input type="search" placeholder="판매사원 이름" value={memberName}
                        onChange={(e) => setMemberName(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />                
            </div>
            <div className="my-order-form-row">
                <input type="search" placeholder="주문일자" value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <input type="search" placeholder="납품확정일자" value={acceptDate}
                        onChange={(e) => setAcceptDate(e.target.value)} 
                        onKeyPress={handleKeyPress}
                />
                <button className="my-order-search-button" onClick={handleSearch}>조회</button>
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

    )
}
export default MyOrderDetailSearch;