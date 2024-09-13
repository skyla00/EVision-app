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
            itemCode: itemCode ? `상품코드 : ${itemCode}` : prevKeywords.itemCode,
            itemName: itemName ? `상품명 : ${itemName}` : prevKeywords.itemName,
            customerCode: customerCode ? `판매업체코드 : ${customerCode}` : prevKeywords.customerCode,
            customerName: customerName ? `판매업체코드 : ${customerName}` : prevKeywords.customerName,
            salesAmount: salesAmount ? `판매가 : ${salesAmount}` : prevKeywords.salesAmount,
            startDate: startDate ? `기준일자 : ${new Date(startDate).toISOString().split('T')[0]}` : prevKeywords.startDate,
            endDate: endDate ? `만료일자 : ${new Date(endDate).toISOString().split('T')[0]}` : prevKeywords.endDate,
        }));
    
        // 화면에 표시할 포맷된 키워드를 저장
        // setDisplayKeywords(prevKeywords => [
        //     ...prevKeywords,
        //     ...(itemCode ? [`상품 코드: ${itemCode}`] : []),
        //     ...(itemName ? [`상품명: ${itemName}`] : []),
        //     ...(customerCode ? [`판메업체 코드: ${customerCode}`] : []),
        //     ...(customerName ? [`판매업체명: ${customerName}`] : []),
        //     ...(salesAmount ? [`판매가: ${salesAmount}`] : []),
        //     ...(startDate ? [`기준일자: ${startDate}`] : []),
        //     ...(endDate ? [`만료일자: ${endDate}`] : [])
        // ]);
       
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
        const updatedKeywords = { ...selectedKeywords };
        updatedKeywords[keywordToRemove] = ''; // 해당 키워드를 빈 값으로 설정
        setSelectedKeywords(updatedKeywords);
        onSearch(
            updatedKeywords.itemCode,
            updatedKeywords.itemName,
            updatedKeywords.customerCode,
            updatedKeywords.customerName,
            updatedKeywords.salesAmount,
            updatedKeywords.startDate,
            updatedKeywords.endDate
        );
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
  ); 
};

export default SalesPriceDetailSearch;