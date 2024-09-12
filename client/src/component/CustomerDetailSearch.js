import './CustomerDetailSearch.css';
import React, { useState, useEffect } from 'react';

const CustomerDetailSearch = ({ title, list = [], onSearch}) => {
    const [customerCode, setCustomerCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [manager, setManager] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [displayKeywords, setDisplayKeywords] = useState([]);
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
        const finalCustomerCode = customerCode || selectedKeywords.customerCode;
        const finalCustomerName = customerName || selectedKeywords.customerName;
        const finalManager = manager || selectedKeywords.manager;
        const finalCustomerAddress = customerAddress || selectedKeywords.customerAddress;
        const finalCustomerPhone = customerPhone || selectedKeywords.customerPhone;
        const finalCustomerEmail = customerEmail || selectedKeywords.customerEmail;

        onSearch(finalCustomerCode, finalCustomerName, finalManager, finalCustomerAddress, finalCustomerPhone, finalCustomerEmail);    
    }, [customerCode, customerName, manager, customerAddress, customerPhone, customerEmail, selectedKeywords, onSearch]);

    const handleSearch = () => {
        // 필터링에 사용할 순수한 값을 저장
        setSelectedKeywords(prevKeywords => ({
            customerCode: customerCode ? `판매업체코드 : ${customerCode}` :  prevKeywords.customerCode,
            customerName: customerName ? `판매업체명 : ${customerName}` :  prevKeywords.customerName,
            manager: manager ? `담당자 : ${manager}` : prevKeywords.manager,
            customerAddress: customerAddress ? `판매업체주소 : ${customerAddress}` : prevKeywords.customerAddress,
            customerPhone: customerPhone ? `판매업체연락처 : ${customerPhone}` : prevKeywords.customerPhone,
            customerEmail: customerEmail ? `판매업체이메일 : ${customerEmail}` : prevKeywords.customerEmail,
        }));
    
        // 화면에 표시할 포맷된 키워드를 저장
        // setDisplayKeywords(prevKeywords => [
        //     ...prevKeywords,
        //     ...(customerCode ? [`판매업체 코드: ${customerCode}`] : []),
        //     ...(customerName ? [`판매업체명: ${customerName}`] : []),
        //     ...(manager ? [`담당자: ${manager}`] : []),
        //     ...(customerAddress ? [`판매업체 주소: ${customerAddress}`] : []),
        //     ...(customerPhone ? [`판매업체 연락처: ${customerPhone}`] : []),
        //     ...(customerEmail ? [`판매업체 이메일: ${customerEmail}`] : []),
        // ]);
       
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
        const updatedKeywords = { ...selectedKeywords };
        updatedKeywords[keywordToRemove] = ''; // 해당 키워드를 빈 값으로 설정
        setSelectedKeywords(updatedKeywords);
        onSearch(
            updatedKeywords.customerCode,
            updatedKeywords.customerName,
            updatedKeywords.manager,
            updatedKeywords.customerAddress,
            updatedKeywords.customerPhone,
            updatedKeywords.customerEmail
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
  ); 
};

export default CustomerDetailSearch;