import './OrderDetailSearch.css';
import React, { useState, useEffect } from 'react';

const OrderDetailSearch = ({ title, onSearch }) => {
    const [orderHeaderId, setOrderHeaderId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [memberName, setMemberName] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [acceptDate, setAcceptDate] = useState('');
    const [requestDate, setRequestDate] = useState('');
    const [displayKeywords, setDisplayKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState({
        orderHeaderId: '',
        itemName: '',
        itemCode: '',
        customerName: '',
        customerCode: '',
        memberName: '',
        orderDate: '',
        acceptDate: '',
        requestDate: ''
    });

    useEffect(() => {
        const finalOrderHeaderId = selectedKeywords.orderHeaderId || orderHeaderId;
        const finalItemName = selectedKeywords.itemName || itemName;
        const finalItemCode = selectedKeywords.itemCode || itemCode;
        const finalCustomerName = selectedKeywords.customerName || customerName;
        const finalCustomerCode = selectedKeywords.customerCode || customerCode;
        const finalMemberName = selectedKeywords.memberName || memberName;
        const finalOrderDate = selectedKeywords.orderDate || orderDate;
        const finalAcceptDate = selectedKeywords.acceptDate || acceptDate;
        const finalRequestDate = selectedKeywords.requestDate || requestDate;
        
        onSearch(finalOrderHeaderId, finalItemName, finalItemCode, finalCustomerName, finalCustomerCode,
            finalMemberName, finalOrderDate, finalAcceptDate, finalRequestDate);
    }, [orderHeaderId, itemName, itemCode, customerName, customerCode, memberName, orderDate, acceptDate, requestDate, onSearch]);

    const handleDateKeyword = (dateValue, setDateFunction, keywordType) => {
        setDateFunction(dateValue);
    
        // 키워드로 날짜 등록
        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(dateValue && !prevKeywords.includes(`${keywordType}: ${new Date(dateValue).toISOString().split('T')[0]}`) 
                ? [`${keywordType}: ${new Date(dateValue).toISOString().split('T')[0]}`] 
                : []
            )
        ]);
    
        // 키워드 선택 상태에도 반영
        setSelectedKeywords(prevKeywords => ({
            ...prevKeywords,
            [keywordType]: dateValue
        }));
    };


    // 검색 버튼 클릭 시 키워드 등록 및 필드 초기화
    const handleSearch = () => {
        setSelectedKeywords(prevKeywords => ({
            ...prevKeywords,
            orderHeaderId: orderHeaderId || prevKeywords.orderHeaderId,
            itemName: itemName || prevKeywords.itemName,
            itemCode: itemCode || prevKeywords.itemCode,
            customerName: customerName || prevKeywords.customerName,
            customerCode: customerCode || prevKeywords.customerCode,
            memberName: memberName || prevKeywords.memberName,
            orderDate: orderDate || prevKeywords.orderDate,
            acceptDate: acceptDate || prevKeywords.acceptDate,
            requestDate: requestDate || prevKeywords.requestDate,
        }));

        // 키워드로 등록된 검색어들
        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(orderHeaderId && !prevKeywords.includes(`주문번호: ${orderHeaderId}`) ? [`주문번호: ${orderHeaderId}`] : []),
            ...(itemName && !prevKeywords.includes(`상품명: ${itemName}`) ? [`상품명: ${itemName}`] : []),
            ...(itemCode && !prevKeywords.includes(`상품코드: ${itemCode}`) ? [`상품코드: ${itemCode}`] : []),
            ...(customerName && !prevKeywords.includes(`판매업체명: ${customerName}`) ? [`판매업체명: ${customerName}`] : []),
            ...(customerCode && !prevKeywords.includes(`판매업체코드: ${customerCode}`) ? [`판매업체코드: ${customerCode}`] : []),
            ...(memberName && !prevKeywords.includes(`판매사원이름: ${memberName}`) ? [`판매사원이름: ${memberName}`] : []),
            ...(orderDate && !prevKeywords.includes(`주문일자: ${new Date(orderDate).toISOString().split('T')[0]}`) ? [`주문일자: ${new Date(orderDate).toISOString().split('T')[0]}`] : []),
            ...(acceptDate && !prevKeywords.includes(`승인일자: ${new Date(acceptDate).toISOString().split('T')[0]}`) ? [`승인일자: ${new Date(acceptDate).toISOString().split('T')[0]}`] : []),
            ...(requestDate && !prevKeywords.includes(`납품요청일자: ${new Date(requestDate).toISOString().split('T')[0]}`) ? [`납품요청일자: ${new Date(requestDate).toISOString().split('T')[0]}`] : []),
        ]);

        // 입력 필드 초기화
        setOrderHeaderId('');
        setItemName('');
        setItemCode('');
        setCustomerName('');
        setCustomerCode('');
        setMemberName('');
        setOrderDate('');
        setAcceptDate('');
        setRequestDate('');
    };

    // 엔터키로도 검색 가능
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // 키워드를 제거했을 때 해당 필드 다시 활성화
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
            } else if (keywordToRemove.startsWith('판매사원이름')) {
                updatedKeywords.memberName = '';
            } else if (keywordToRemove.startsWith('주문일자')) {
                updatedKeywords.orderDate = '';
                setOrderDate('');
            } else if (keywordToRemove.startsWith('승인일자')) {
                updatedKeywords.acceptDate = '';
                setAcceptDate('');
            } else if (keywordToRemove.startsWith('납품요청일자')) {
                updatedKeywords.requestDate = '';
                setRequestDate('');  
            }
    
            onSearch(
                updatedKeywords.orderHeaderId,
                updatedKeywords.itemName,
                updatedKeywords.itemCode,
                updatedKeywords.customerName,
                updatedKeywords.customerCode,
                updatedKeywords.memberName,
                updatedKeywords.orderDate,
                updatedKeywords.acceptDate,
                updatedKeywords.requestDate
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
                        disabled={!!selectedKeywords.orderHeaderId} // 선택된 키워드가 있으면 비활성화
                    />
                    <input type="search" placeholder="상품코드" value={itemCode}
                        onChange={(e) => setItemCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.itemCode} // 선택된 키워드가 있으면 비활성화
                    />
                    <input type="search" placeholder="상품명" value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.itemName} // 선택된 키워드가 있으면 비활성화
                    />
                    <input type="search" placeholder="판매업체코드" value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.customerCode} // 선택된 키워드가 있으면 비활성화
                    />
                    <input type="search" placeholder="판매업체명" value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.customerName} // 선택된 키워드가 있으면 비활성화
                    />
                    <input type="search" placeholder="판매사원 이름" value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.memberName} // 선택된 키워드가 있으면 비활성화
                    />
                </div>
                <div className="order-form-row">
                <input 
                        type="date" 
                        placeholder="주문일자" 
                        value={orderDate}
                        onChange={(e) => handleDateKeyword(e.target.value, setOrderDate, '주문일자')}
                        disabled={!!selectedKeywords.orderDate}
                    />
                    <input 
                        type="date" 
                        placeholder="승인일자" 
                        value={acceptDate || ''}
                        onChange={(e) => handleDateKeyword(e.target.value, setAcceptDate, '승인일자')}
                        disabled={!!selectedKeywords.acceptDate}
                    />
                    <input 
                        type="date" 
                        placeholder="납품요청일자" 
                        value={requestDate || ''}
                        onChange={(e) => handleDateKeyword(e.target.value, setRequestDate, '납품요청일자')}
                        disabled={!!selectedKeywords.requestDate}
                    />
                    <button className="order-search-button" onClick={handleSearch}>조회</button>
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

export default OrderDetailSearch;
