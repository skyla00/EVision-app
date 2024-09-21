import './ManagementOrderDetailSearch.css';
import React, { useState, useEffect } from 'react';

const MyOrderDetailSearch = ({ title, list = [], onSearch }) => {
    const [orderHeaderId, setOrderHeaderId] = useState('');
    const [orderHeaderStatus, setOrderHeaderStatus] = useState(''); // 주문상태 초기값
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

    // 실시간 검색과 키워드 기반 검색을 통합한 필터링
    useEffect(() => {
        const finalOrderHeaderId = selectedKeywords.orderHeaderId || orderHeaderId;
        const finalOrderHeaderStatus = selectedKeywords.orderHeaderStatus; // 엔터키로 영향받지 않게 수정
        const finalCustomerName = selectedKeywords.customerName || customerName;
        const finalCustomerCode = selectedKeywords.customerCode || customerCode;
        const finalMemberName = selectedKeywords.memberName || memberName;
        const finalOrderDate = selectedKeywords.orderDate || orderDate;
        const finalAcceptDate = selectedKeywords.acceptDate || acceptDate;

        onSearch(finalOrderHeaderId, finalOrderHeaderStatus, finalCustomerName, finalCustomerCode, finalMemberName, finalOrderDate, finalAcceptDate);
    }, [orderHeaderId, customerName, customerCode, memberName, orderDate, acceptDate, selectedKeywords, onSearch]);

    // 선택된 주문 상태를 문자열로 반환하는 헬퍼 함수
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

    // 주문상태 변경 시 바로 키워드로 등록
    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setOrderHeaderStatus(selectedStatus);

        // 주문상태 키워드만 업데이트
        setSelectedKeywords(prevKeywords => ({
            ...prevKeywords,
            orderHeaderStatus: selectedStatus
        }));

        // 주문상태를 키워드로 등록
        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(selectedStatus && !prevKeywords.includes(`주문상태 : ${getOrderStatusDisplay(selectedStatus)}`) 
                ? [`주문상태 : ${getOrderStatusDisplay(selectedStatus)}`] 
                : [])
        ]);
    };

    const handleDateChange = (e, type) => {
        const selectedDate = e.target.value;

        if (type === 'orderDate') {
            setOrderDate(selectedDate);
            setSelectedKeywords(prevKeywords => ({
                ...prevKeywords,
                orderDate: selectedDate
            }));
            setDisplayKeywords(prevKeywords => [
                ...prevKeywords,
                ...(selectedDate && !prevKeywords.includes(`주문일자 : ${new Date(selectedDate).toISOString().split('T')[0]}`) 
                    ? [`주문일자 : ${new Date(selectedDate).toISOString().split('T')[0]}`] 
                    : [])
            ]);
        } else if (type === 'acceptDate') {
            setAcceptDate(selectedDate);
            setSelectedKeywords(prevKeywords => ({
                ...prevKeywords,
                acceptDate: selectedDate
            }));
            setDisplayKeywords(prevKeywords => [
                ...prevKeywords,
                ...(selectedDate && !prevKeywords.includes(`승인일자 : ${new Date(selectedDate).toISOString().split('T')[0]}`) 
                    ? [`승인일자 : ${new Date(selectedDate).toISOString().split('T')[0]}`] 
                    : [])
            ]);
        }
    };

    // 검색 버튼 클릭 시
    const handleSearch = () => {
        setSelectedKeywords(prevKeywords => ({
            ...prevKeywords,
            orderHeaderId: orderHeaderId || prevKeywords.orderHeaderId,
            customerName: customerName || prevKeywords.customerName,
            customerCode: customerCode || prevKeywords.customerCode,
            memberName: memberName || prevKeywords.memberName,
            orderDate: orderDate || prevKeywords.orderDate,
            acceptDate: acceptDate || prevKeywords.acceptDate,
        }));

        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(orderHeaderId && !prevKeywords.includes(`주문번호 : ${orderHeaderId}`) ? [`주문번호 : ${orderHeaderId}`] : []),
            ...(customerName && !prevKeywords.includes(`판매업체명 : ${customerName}`) ? [`판매업체명 : ${customerName}`] : []),
            ...(customerCode && !prevKeywords.includes(`판매업체코드 : ${customerCode}`) ? [`판매업체코드 : ${customerCode}`] : []),
            ...(memberName && !prevKeywords.includes(`판매사원이름 : ${memberName}`) ? [`판매사원이름 : ${memberName}`] : []),
            ...(orderDate && !prevKeywords.includes(`주문일자 : ${new Date(orderDate).toISOString().split('T')[0]}`) ? [`주문일자 : ${new Date(orderDate).toISOString().split('T')[0]}`] : []),
            ...(acceptDate && !prevKeywords.includes(`승인일자 : ${new Date(acceptDate).toISOString().split('T')[0]}`) ? [`승인일자 : ${new Date(acceptDate).toISOString().split('T')[0]}`] : []),
        ]);

        // 검색 후 입력 필드 초기화
        setOrderHeaderId('');
        setCustomerName('');
        setCustomerCode('');
        setMemberName('');
        setOrderDate('');
        setAcceptDate('');
    };

    // 엔터키로도 검색 가능
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // 키워드를 제거했을 때 해당 필드 재활성화
    const removeKeyword = (keywordToRemove) => {
        setDisplayKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToRemove));

        setSelectedKeywords(prev => {
            let updatedKeywords = { ...prev };

            if (keywordToRemove.startsWith('주문번호')) {
                updatedKeywords.orderHeaderId = '';
            } else if (keywordToRemove.startsWith('주문상태')) {
                updatedKeywords.orderHeaderStatus = '';
                setOrderHeaderStatus(''); // 주문상태를 초기값으로 리셋
            } else if (keywordToRemove.startsWith('판매업체명')) {
                updatedKeywords.customerName = '';
            } else if (keywordToRemove.startsWith('판매업체코드')) {
                updatedKeywords.customerCode = '';
            } else if (keywordToRemove.startsWith('판매사원이름')) {
                updatedKeywords.memberName = '';
            } else if (keywordToRemove.startsWith('주문일자')) {
                updatedKeywords.orderDate = '';
                setOrderDate('');
            } else if (keywordToRemove.startsWith('승인일자')) {
                updatedKeywords.acceptDate = '';
                setAcceptDate('');
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
                    <input 
                        type="search" 
                        placeholder="주문번호" 
                        value={orderHeaderId}
                        onChange={(e) => setOrderHeaderId(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.orderHeaderId} // 선택된 키워드가 있으면 비활성화
                    />
                    <select 
                        value={orderHeaderStatus}
                        onChange={handleStatusChange} // 주문상태 변경 시 즉시 키워드로 등록
                        disabled={!!selectedKeywords.orderHeaderStatus} // 선택된 키워드가 있으면 비활성화
                    >
                        <option value="" disabled hidden>주문상태</option>
                        <option value="WAITING">임시저장</option>
                        <option value="REQUEST">승인요청</option>
                        <option value="ACCEPT">승인</option>
                        <option value="DENY">반려</option>
                    </select>
                    <input 
                        type="search" 
                        placeholder="판매업체명" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.customerName} // 선택된 키워드가 있으면 비활성화
                    />
                    <input 
                        type="search" 
                        placeholder="판매업체코드" 
                        value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.customerCode} // 선택된 키워드가 있으면 비활성화
                    />
                    <input 
                        type="date" 
                        placeholder="주문일자" 
                        value={orderDate}
                        onChange={(e) => handleDateChange(e, 'orderDate')}
                        disabled={!!selectedKeywords.orderDate}
                    />
                    <input 
                        type="date" 
                        placeholder="승인일자" 
                        value={acceptDate || ''}
                        onChange={(e) => handleDateChange(e, 'acceptDate')}
                        disabled={!!selectedKeywords.acceptDate}
                    />
                </div>
                <div className="my-order-form-row">
                    <input 
                        type="search" 
                        placeholder="판매사원 이름" 
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.memberName} // 선택된 키워드가 있으면 비활성화
                    />     
                    <button className="my-order-search-button" onClick={handleSearch}>조회</button>
                </div>
                <div className="selected-keywords">
                    <img src="/image/keyword.png" alt="키워드" className="keyword-icon" />
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
