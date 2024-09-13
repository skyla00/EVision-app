import './CustomerDetailSearch.css';
import React, { useState, useEffect } from 'react';

const CustomerDetailSearch = ({ title, onSearch}) => {
    // 입력 필드 상태 관리
    const [customerCode, setCustomerCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [manager, setManager] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    // 화면에 보여줄 키워드 저장 상태
    const [displayKeywords, setDisplayKeywords] = useState([]);
    // 검색 조건(실제 필터링에 사용되는 값)을 저장하는 상태
    const [selectedKeywords, setSelectedKeywords] = useState({
        customerCode: '',
        customerName: '',
        manager: '',
        customerAddress: '',
        customerPhone: '',
        customerEmail: ''
    }); // 검색한 결과를 키워드를 저장

        // 검색시 실시간 반영 + 키워드 검색 로직
    useEffect(() => {
        // 각 상태가 있으면 상태 값을 사용하고, 없으면 기존 selectedKeywords 값을 사용
        const finalCustomerCode = customerCode || selectedKeywords.customerCode;
        const finalCustomerName = customerName || selectedKeywords.customerName;
        const finalManager = manager || selectedKeywords.manager;
        const finalCustomerAddress = customerAddress || selectedKeywords.customerAddress; 
        const finalCustomerPhone = customerPhone || selectedKeywords.customerPhone;
        const finalCustomerEmail = customerEmail || selectedKeywords.customerEmail;
        
        // 검색 조건이 변경될 때, onSearch를 호출하여 필터링 적용
        onSearch(finalCustomerCode, finalCustomerName, finalManager, finalCustomerAddress, finalCustomerPhone, finalCustomerEmail);    
    }, [customerCode, customerName, manager, customerAddress, customerPhone, customerEmail, selectedKeywords, onSearch]);

    const handleSearch = () => {
        // 필터링에 사용할 순수한 값을 저장. 입력된 값이 있으면 selectedKeywords 상태에 저장
        setSelectedKeywords(prevKeywords => ({
            customerCode: customerCode || prevKeywords.customerCode,
            customerName: customerName || prevKeywords.customerName,
            manager: manager || prevKeywords.manager,
            customerAddress: customerAddress || prevKeywords.customerAddress,
            customerPhone: customerPhone || prevKeywords.customerPhone,
            customerEmail: customerEmail || prevKeywords.customerEmail,
        }));
    
        // 화면에 표시할 키워드를 저장
        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(customerCode ? [`판매업체 코드: ${customerCode}`] : []),
            ...(customerName ? [`판매업체명: ${customerName}`] : []),
            ...(manager ? [`담당자: ${manager}`] : []),
            ...(customerAddress ? [`판매업체 주소: ${customerAddress}`] : []),
            ...(customerPhone ? [`판매업체 연락처: ${customerPhone}`] : []),
            ...(customerEmail ? [`판매업체 이메일: ${customerEmail}`] : []),
        ]);
        
        // 검색 후 입력 필드 초기화
        setCustomerCode('');
        setCustomerName('');
        setManager('');
        setCustomerAddress('');
        setCustomerPhone('');
        setCustomerEmail('');
    };

    // 엔터키로 검색하는 로직
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // 엔터키를 누르면 검색 수행
        }
    };

    // 키워드를 삭제할 때 호출되는 함수
    const removeKeyword = (keywordToRemove) => {
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
        <div className="form-container">
            <div className="product-form-row-container">
                <div className="product-form-row">
                    <input type="search" placeholder="판매업체 코드" value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)} 
                        onKeyPress={handleKeyPress}
                     />
                </div>

                <div className="product-form-row">
                    <input 
                        type="search" 
                        placeholder="판매업체명" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)} 
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className="product-form-row">
                    <input type="search" placeholder="담당자" value={manager}
                        onChange={(e) => setManager(e.target.value)} 
                        onKeyPress={handleKeyPress}
                    />
                </div>
                
                <div className="product-form-row">
                    <input type="search" placeholder="판매업체 주소" value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)} 
                        onKeyPress={handleKeyPress}
                    />
                </div>
                
                <div className="product-form-row">
                    <input type="search" placeholder="판매업체 연락처" value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)} 
                        onKeyPress={handleKeyPress}
                     />
                </div>
                
                <div className="product-form-row">
                    <input type="search" placeholder="판매업체 이메일" value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)} 
                        onKeyPress={handleKeyPress}
                    />
                     <button className="cd-search-button" onClick={handleSearch}>조회</button>
                </div>
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

export default CustomerDetailSearch;