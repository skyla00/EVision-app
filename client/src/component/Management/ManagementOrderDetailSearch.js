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
        const finalOrderDate = orderDate ? new Date(orderDate).toISOString().split('T')[0] : selectedKeywords.orderDate;
        const finalAcceptDate = acceptDate ? new Date(acceptDate).toISOString().split('T')[0] : selectedKeywords.acceptDate;
        
        onSearch(finalOrderHeaderId, finalOrderHeaderStatus, finalCustomerName,
            finalCustomerCode, finalMemberName, finalOrderDate, finalAcceptDate);
    }, [orderHeaderId, orderHeaderStatus, customerName, customerCode, memberName, orderDate, acceptDate, setSelectedKeywords, onSearch]);
 
    const handleSearch = () => {
        // 필터링에 사용할 순수한 값을 저장. 입력된 값이 있으면 selectedKeywords 상태에 저장
        // 주문 상태 값을 한글로 변환하는 함수
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
    
        // 화면에 표시할 키워드를 저장 (UI용)
        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(orderHeaderId ? [`주문번호 : ${orderHeaderId}`] : []),
            ...(orderHeaderStatus ? [`주문상태 : ${getOrderStatusDisplay(orderHeaderStatus)}`] : []),
            ...(customerName ? [`판매처명 : ${customerName}`] : []),
            ...(customerCode ? [`판매처코드 : ${customerCode}`] : []),
            ...(memberName ? [`판매사원이름 : ${memberName}`] : []),
            ...(orderDate ? [`주문일자 : ${new Date(orderDate).toISOString().split('T')[0]}`] : []),
            ...(acceptDate ? [`납품확정일자 : ${new Date(acceptDate).toISOString().split('T')[0]}`] : []),
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
        // 화면에 표시할 키워드에서 제거할 항목 필터링
        setDisplayKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToRemove));
    
        // 키워드에 따라 해당하는 상태값을 빈 값으로 변경
        if (keywordToRemove.startsWith('판매업체 코드')) {
            setSelectedKeywords(prev => ({ ...prev, customerCode: '' }));
        } else if (keywordToRemove.startsWith('판매업체명')) {
            setSelectedKeywords(prev => ({ ...prev, customerName: '' }));
        } else if (keywordToRemove.startsWith('담당자')) {
            setSelectedKeywords(prev => ({ ...prev, manager: '' }));
        } else if (keywordToRemove.startsWith('판매업체 주소')) {
            setSelectedKeywords(prev => ({ ...prev, customerAddress: '' }));
        } else if (keywordToRemove.startsWith('판매업체 연락처')) {
            setSelectedKeywords(prev => ({ ...prev, customerPhone: '' }));
        } else if (keywordToRemove.startsWith('판매업체 이메일')) {
            setSelectedKeywords(prev => ({ ...prev, customerEmail: '' }));
        }
    
        // 상태 업데이트 후 검색 함수 호출
        onSearch(
            selectedKeywords.customerCode,
            selectedKeywords.customerName,
            selectedKeywords.manager,
            selectedKeywords.customerAddress,
            selectedKeywords.customerPhone,
            selectedKeywords.customerEmail
        );
    };

    return (
        <div className="detail-search-box">
        <div className="detail-search-title"> {}
            {title && <div className="form-title"></div>}
        </div>
        <div className="my-order-form-container">
            <div className="my-order-form-row">
                <input type="search" placeholder="주문번호" value={orderHeaderId}
                        onChange={(e) => setOrderHeaderId(e.target.value)} 
                />
                <select placeholder="주문상태" value={orderHeaderStatus}
                        onChange={(e) => setOrderHeaderStatus(e.target.value)} >
                    <option value="" disabled hidden>주문상태</option>
                    <option value="WAITING">임시저장</option>
                    <option value="REQUEST">승인요청</option>
                    <option value="ACCEPT">승인</option>
                    <option value="DENY">반려</option>
                </select>
                 <input type="search" placeholder="판매처명" value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)} 
                />
                <input type="search" placeholder="판매처 코드" value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)} 
                />
                <input type="date" placeholder="주문일자" value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                />
                <input type="date" placeholder="납품확정일자" value={acceptDate || ''}
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