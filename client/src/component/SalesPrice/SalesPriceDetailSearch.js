import './SalesPriceDetailSearch.css';
import React, { useState, useEffect } from 'react';

const SalesPriceDetailSearch = ({ title, list = [], onSearch }) => {
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
    });

    useEffect(() => {
        const finalItemCode = selectedKeywords.itemCode || itemCode;
        const finalItemName = selectedKeywords.itemName || itemName;
        const finalCustomerCode = selectedKeywords.customerCode || customerCode;
        const finalCustomerName = selectedKeywords.customerName || customerName;
        const finalSalesAmount = selectedKeywords.salesAmount || salesAmount;
        const finalStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : selectedKeywords.startDate;
        const finalEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : selectedKeywords.endDate;

        onSearch(finalItemCode, finalItemName, finalCustomerCode, finalCustomerName, finalSalesAmount, finalStartDate, finalEndDate);
    }, [itemCode, itemName, customerCode, customerName, salesAmount, startDate, endDate, selectedKeywords, onSearch]);

    const handleSearch = () => {
        setSelectedKeywords(prevKeywords => ({
            itemCode: itemCode || prevKeywords.itemCode,
            itemName: itemName || prevKeywords.itemName,
            customerCode: customerCode || prevKeywords.customerCode,
            customerName: customerName || prevKeywords.customerName,
            salesAmount: salesAmount || prevKeywords.salesAmount,
            startDate: startDate || prevKeywords.startDate,
            endDate: endDate || prevKeywords.endDate,
        }));

        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(itemCode && !prevKeywords.includes(`상품코드: ${itemCode}`) ? [`상품코드: ${itemCode}`] : []),
            ...(itemName && !prevKeywords.includes(`상품명: ${itemName}`) ? [`상품명: ${itemName}`] : []),
            ...(customerCode && !prevKeywords.includes(`판매업체코드: ${customerCode}`) ? [`판매업체코드: ${customerCode}`] : []),
            ...(customerName && !prevKeywords.includes(`판매업체명: ${customerName}`) ? [`판매업체명: ${customerName}`] : []),
            ...(salesAmount && !prevKeywords.includes(`판매가: ${salesAmount}`) ? [`판매가: ${salesAmount}`] : []),
            ...(startDate && !prevKeywords.includes(`기준일자: ${new Date(startDate).toISOString().split('T')[0]}`) ? [`기준일자: ${new Date(startDate).toISOString().split('T')[0]}`] : []),
            ...(endDate && !prevKeywords.includes(`만료일자: ${new Date(endDate).toISOString().split('T')[0]}`) ? [`만료일자: ${new Date(endDate).toISOString().split('T')[0]}`] : []),
        ]);

        setItemCode('');
        setItemName('');
        setCustomerCode('');
        setCustomerName('');
        setSalesAmount('');
        setStartDate('');
        setEndDate('');
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

            if (keywordToRemove.startsWith('상품코드')) {
                updatedKeywords.itemCode = '';
            } else if (keywordToRemove.startsWith('상품명')) {
                updatedKeywords.itemName = '';
            } else if (keywordToRemove.startsWith('판매업체코드')) {
                updatedKeywords.customerCode = '';
            } else if (keywordToRemove.startsWith('판매업체명')) {
                updatedKeywords.customerName = '';
            } else if (keywordToRemove.startsWith('판매가')) {
                updatedKeywords.salesAmount = '';
            } else if (keywordToRemove.startsWith('기준일자')) {
                updatedKeywords.startDate = '';
            } else if (keywordToRemove.startsWith('만료일자')) {
                updatedKeywords.endDate = '';
            }

            onSearch(
                updatedKeywords.itemCode,
                updatedKeywords.itemName,
                updatedKeywords.customerCode,
                updatedKeywords.customerName,
                updatedKeywords.salesAmount,
                updatedKeywords.startDate,
                updatedKeywords.endDate
            );

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
                    <input type="search" placeholder="상품코드" value={itemCode}
                        onChange={(e) => {
                            if (!selectedKeywords.itemCode) {
                                setItemCode(e.target.value);
                            }
                        }}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.itemCode}
                    />
                    <input type="search" placeholder="상품명" value={itemName}
                        onChange={(e) => {
                            if (!selectedKeywords.itemName) {
                                setItemName(e.target.value);
                            }
                        }}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.itemName}
                    />
                    <input type="search" placeholder="판매업체코드" value={customerCode}
                        onChange={(e) => {
                            if (!selectedKeywords.customerCode) {
                                setCustomerCode(e.target.value);
                            }
                        }}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.customerCode}
                    />
                    <input type="search" placeholder="판매업체명" value={customerName}
                        onChange={(e) => {
                            if (!selectedKeywords.customerName) {
                                setCustomerName(e.target.value);
                            }
                        }}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.customerName}
                    />
                    <input type="date" placeholder="기준일자" value={startDate}
                        onChange={(e) => {
                            if (!selectedKeywords.startDate) {
                                setStartDate(e.target.value);
                            }
                        }}
                        disabled={!!selectedKeywords.startDate}
                    />
                    <input type="date" placeholder="만료일자" value={endDate}
                        onChange={(e) => {
                            if (!selectedKeywords.endDate) {
                                setEndDate(e.target.value);
                            }
                        }}
                        disabled={!!selectedKeywords.endDate}
                    />
                </div>
                <div className="sp-form-row">
                    <input type="search" placeholder="판매가" value={salesAmount}
                        onChange={(e) => {
                            if (!selectedKeywords.salesAmount) {
                                setSalesAmount(e.target.value);
                            }
                        }}
                        onKeyPress={handleKeyPress}
                        disabled={!!selectedKeywords.salesAmount}
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
