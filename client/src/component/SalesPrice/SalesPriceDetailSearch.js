import './SalesPriceDetailSearch.css';
import React, { useState, useEffect } from 'react';

const SalesPriceDetailSearch = ({ title, list = [], onSearch}) => {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [salesAmount, setSalesAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [displayKeywords, setDisplayKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState({
        itemCode: '',
        itemName: '',
        customerCode: '',
        customerName: '',
        salesAmount: '',
        startDate: '',
        endDate: ''
    }); // 검색한 결과를 키워드를 저장

    // 검색시 실시간 반영 + 키워드 검색 로직
    useEffect(() => {
        const finalItemCode = itemCode || selectedKeywords.itemCode;
        const finalItemName = itemName || selectedKeywords.itemName;
        const finalCustomerCode = customerCode || selectedKeywords.customerCode;
        const finalCustomerName = customerName || selectedKeywords.customerName;
        const finalSalesAmount = salesAmount || selectedKeywords.salesAmount;
        const finalStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : selectedKeywords.startDate;
        const finalEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] :  selectedKeywords.endDate;

        onSearch(finalItemCode, finalItemName, finalCustomerCode, finalCustomerName, finalSalesAmount, finalStartDate, finalEndDate);    
    }, [itemCode, itemName, customerCode, customerName, salesAmount, startDate, endDate, selectedKeywords, onSearch]);

    const handleSearch = () => {
        // 필터링에 사용할 순수한 값을 저장
        setSelectedKeywords(prevKeywords => ({
            itemCode: itemCode || prevKeywords.itemCode,
            itemName: itemName || prevKeywords.itemName,
            customerCode: customerCode || prevKeywords.customerCode,
            customerName: customerName || prevKeywords.customerName,
            salesAmount: salesAmount || prevKeywords.salesAmount,
            startDate: startDate || prevKeywords.startDate,
            endDate: endDate || prevKeywords.endDate,
        }));
    
        // 화면에 표시할 포맷된 키워드를 저장
        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(itemCode ? [`상품 코드: ${itemCode}`] : []),
            ...(itemName ? [`상품명: ${itemName}`] : []),
            ...(customerCode ? [`판메업체 코드: ${customerCode}`] : []),
            ...(customerName ? [`판매업체명: ${customerName}`] : []),
            ...(salesAmount ? [`판매가: ${salesAmount}`] : []),
            ...(startDate ? [`기준일자: ${new Date(startDate).toISOString().split('T')[0]}`] : []),
            ...(endDate ? [`만료일자: ${new Date(endDate).toISOString().split('T')[0]}`] : []),
        ]);
       
        // 검색 후 입력 필드 초기화
        setItemCode('');
        setItemName('');
        setCustomerCode('');
        setCustomerName('');
        setSalesAmount('');
        setStartDate('');
        setEndDate('');
    };

    // 엔터키로 검색하는 로직
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // 엔터키를 누르면 검색 수행
        }
    };

    // 키워드를 삭제할 때 호출되는 함수
    const removeKeyword = (keywordToRemove) => {
        // 화면에 표시할 키워드에서 제거할 항목 필터링
        setDisplayKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToRemove));

        // 상태 업데이트 후 실행할 콜백 함수
        setSelectedKeywords(prev => {
            let updatedKeywords = { ...prev };

            // 키워드에 따라 해당하는 상태값을 빈 값으로 변경
            if (keywordToRemove.startsWith('상품코드')) {
                updatedKeywords.itemCode = '';
            } else if (keywordToRemove.startsWith('상품명')) {
                updatedKeywords.itemName = '';
            } else if (keywordToRemove.startsWith('판매처코드')) {
                updatedKeywords.customerCode = '';
            } else if (keywordToRemove.startsWith('판매처명')) {
                updatedKeywords.customerName = '';
            } else if (keywordToRemove.startsWith('판매가')) {
                updatedKeywords.salesAmount = '';
            } else if (keywordToRemove.startsWith('시작일자')) {
                updatedKeywords.startDate = '';
            } else if (keywordToRemove.startsWith('종료일자')) {
                updatedKeywords.endDate = '';
            }

            // 업데이트된 상태로 onSearch 호출
            onSearch(
                updatedKeywords.itemCode,
                updatedKeywords.itemName,
                updatedKeywords.customerCode,
                updatedKeywords.customerName,
                updatedKeywords.salesAmount,
                updatedKeywords.startDate,
                updatedKeywords.endDate
            );

            // 상태 업데이트를 반환
            return updatedKeywords;
        });
    };

    return (
        <div className="detail-search-box">
        <div className="detail-search-title">
            {title && <div className="form-title"></div>}
        </div>
        <div className="sp-form-container">
            <div className="sp-form-row">
                <input type="search" placeholder="상품 코드" value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)} 
                    onKeyPress={handleKeyPress}
                    />
                <input type="search" placeholder="상품명" value={itemName}
                    onChange={(e) => setItemName(e.target.value)} 
                    onKeyPress={handleKeyPress}
                    />
                <input type="search" placeholder="판매업체 코드" value={customerCode}
                    onChange={(e) => setCustomerCode(e.target.value)} 
                    onKeyPress={handleKeyPress}
                    />
                <input 
                    type="search" 
                    placeholder="판매업체명" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)} 
                    onKeyPress={handleKeyPress}
                />
                <input type="date" placeholder="기준일자" value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} 
                />
                <input type="date" placeholder="만료일자" value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} 
                    />
            </div>
            <div className="sp-form-row">
                <input type="search" placeholder="판매가" value={salesAmount}
                    onChange={(e) => setSalesAmount(e.target.value)} 
                    onKeyPress={handleKeyPress}
                />
                <button className="sp-search-button" onClick={handleSearch}>조회</button>
            </div>
        </div>
        <div className="sp-selected-keywords">
            <img src="/image/keyword.png" alt="키워드" className="keyword-icon"></img>
                {displayKeywords.map((value, index) => (
                <div key={index} className="keyword-tag">
                    {value}
                        <button onClick={() => removeKeyword(value)}>X</button>
                </div>
                ))}
        </div>
    </div>
  ); 
};

export default SalesPriceDetailSearch;