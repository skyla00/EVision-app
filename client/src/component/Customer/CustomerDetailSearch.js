import './CustomerDetailSearch.css';
import React, { useState, useEffect } from 'react';

const CustomerDetailSearch = ({ title, onSearch }) => {
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
    });

    // 실시간 검색 및 키워드 검색 로직
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
        setSelectedKeywords(prevKeywords => ({
            customerCode: customerCode || prevKeywords.customerCode,
            customerName: customerName || prevKeywords.customerName,
            manager: manager || prevKeywords.manager,
            customerAddress: customerAddress || prevKeywords.customerAddress,
            customerPhone: customerPhone || prevKeywords.customerPhone,
            customerEmail: customerEmail || prevKeywords.customerEmail,
        }));

        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(customerCode && !prevKeywords.includes(`판매업체 코드: ${customerCode}`) ? [`판매업체 코드: ${customerCode}`] : []),
            ...(customerName && !prevKeywords.includes(`판매업체명: ${customerName}`) ? [`판매업체명: ${customerName}`] : []),
            ...(manager && !prevKeywords.includes(`담당자: ${manager}`) ? [`담당자: ${manager}`] : []),
            ...(customerAddress && !prevKeywords.includes(`판매업체 주소: ${customerAddress}`) ? [`판매업체 주소: ${customerAddress}`] : []),
            ...(customerPhone && !prevKeywords.includes(`판매업체 연락처: ${customerPhone}`) ? [`판매업체 연락처: ${customerPhone}`] : []),
            ...(customerEmail && !prevKeywords.includes(`판매업체 이메일: ${customerEmail}`) ? [`판매업체 이메일: ${customerEmail}`] : []),
        ]);

        // 검색 후 입력 필드를 초기화
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
            handleSearch();
        }
    };

    // 키워드를 삭제할 때 호출되는 함수
    const removeKeyword = (keywordToRemove) => {
        setDisplayKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToRemove));

        setSelectedKeywords(prev => {
            const updatedKeywords = { ...prev };
            if (keywordToRemove.startsWith('판매업체 코드')) {
                updatedKeywords.customerCode = '';
            } else if (keywordToRemove.startsWith('판매업체명')) {
                updatedKeywords.customerName = '';
            } else if (keywordToRemove.startsWith('담당자')) {
                updatedKeywords.manager = '';
            } else if (keywordToRemove.startsWith('판매업체 주소')) {
                updatedKeywords.customerAddress = '';
            } else if (keywordToRemove.startsWith('판매업체 연락처')) {
                updatedKeywords.customerPhone = '';
            } else if (keywordToRemove.startsWith('판매업체 이메일')) {
                updatedKeywords.customerEmail = '';
            }

            // 남아 있는 키워드로 다시 검색 수행
            onSearch(
                updatedKeywords.customerCode,
                updatedKeywords.customerName,
                updatedKeywords.manager,
                updatedKeywords.customerAddress,
                updatedKeywords.customerPhone,
                updatedKeywords.customerEmail
            );
            return updatedKeywords;
        });
    };

    return (
        <div className="detail-search-box">
            <div className="detail-search-title">
                {title && <div className="form-title"></div>}
            </div>
            <div className="form-container">
                <div className="product-form-row-container">
                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="판매업체 코드"
                            value={customerCode}
                            onChange={(e) => {
                                if (!selectedKeywords.customerCode) {
                                    setCustomerCode(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.customerCode} // 키워드가 등록되면 입력 비활성화
                        />
                    </div>

                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="판매업체명"
                            value={customerName}
                            onChange={(e) => {
                                if (!selectedKeywords.customerName) {
                                    setCustomerName(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.customerName} // 키워드가 등록되면 입력 비활성화
                        />
                    </div>

                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="담당자"
                            value={manager}
                            onChange={(e) => {
                                if (!selectedKeywords.manager) {
                                    setManager(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.manager} // 키워드가 등록되면 입력 비활성화
                        />
                    </div>

                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="판매업체 주소"
                            value={customerAddress}
                            onChange={(e) => {
                                if (!selectedKeywords.customerAddress) {
                                    setCustomerAddress(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.customerAddress} // 키워드가 등록되면 입력 비활성화
                        />
                    </div>

                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="판매업체 연락처"
                            value={customerPhone}
                            onChange={(e) => {
                                if (!selectedKeywords.customerPhone) {
                                    setCustomerPhone(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.customerPhone} // 키워드가 등록되면 입력 비활성화
                        />
                    </div>

                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="판매업체 이메일"
                            value={customerEmail}
                            onChange={(e) => {
                                if (!selectedKeywords.customerEmail) {
                                    setCustomerEmail(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.customerEmail} // 키워드가 등록되면 입력 비활성화
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
