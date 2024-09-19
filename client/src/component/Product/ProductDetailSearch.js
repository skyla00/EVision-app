import './ProductDetailSearch.css';
import React, { useState, useEffect } from 'react';

const ProductDetailSearch = ({ title, onSearch }) => {
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [itemSpecs, setItemSpecs] = useState('');
    const [displayKeywords, setDisplayKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState({
        itemName: '',
        itemCode: '',
        itemSpecs: ''
    });

    // 실시간 검색과 키워드 기반 검색을 통합한 필터링
    useEffect(() => {
        const finalItemName = selectedKeywords.itemName || itemName;
        const finalItemCode = selectedKeywords.itemCode || itemCode;
        const finalItemSpecs = selectedKeywords.itemSpecs || itemSpecs;

        onSearch(finalItemName, finalItemCode, finalItemSpecs);
    }, [itemName, itemCode, itemSpecs, selectedKeywords, onSearch]);

    // 검색 버튼 클릭 또는 엔터키 입력 시 키워드를 추가하고 검색 수행
    const handleSearch = () => {
        // 선택된 키워드를 업데이트
        setSelectedKeywords(prevKeywords => ({
            itemName: itemName || prevKeywords.itemName,
            itemCode: itemCode || prevKeywords.itemCode,
            itemSpecs: itemSpecs || prevKeywords.itemSpecs,
        }));

        // 화면에 표시할 키워드를 업데이트 (UI용)
        setDisplayKeywords(prevKeywords => [
            ...prevKeywords,
            ...(itemName && !prevKeywords.includes(`상품명: ${itemName}`) ? [`상품명: ${itemName}`] : []),
            ...(itemCode && !prevKeywords.includes(`상품코드: ${itemCode}`) ? [`상품코드: ${itemCode}`] : []),
            ...(itemSpecs && !prevKeywords.includes(`상품 정보: ${itemSpecs}`) ? [`상품 정보: ${itemSpecs}`] : []),
        ]);

        // 검색 후 입력 필드를 초기화
        setItemName('');
        setItemCode('');
        setItemSpecs('');
    };

    // 엔터키로도 검색되도록 처리
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // 키워드를 삭제할 때 호출되는 함수
    const removeKeyword = (keywordToRemove) => {
        setDisplayKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToRemove));

        // 키워드에 따라 해당하는 상태값을 빈 값으로 변경
        setSelectedKeywords(prev => {
            const updatedKeywords = { ...prev };
            if (keywordToRemove.startsWith('상품명')) {
                updatedKeywords.itemName = '';
            } else if (keywordToRemove.startsWith('상품코드')) {
                updatedKeywords.itemCode = '';
            } else if (keywordToRemove.startsWith('상품 정보')) {
                updatedKeywords.itemSpecs = '';
            }

            // 남아 있는 키워드로 다시 검색 수행
            onSearch(updatedKeywords.itemName, updatedKeywords.itemCode, updatedKeywords.itemSpecs);
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
                            placeholder="상품코드"
                            value={itemCode}
                            onChange={(e) => {
                                if (!selectedKeywords.itemCode) {
                                    setItemCode(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.itemCode} // 키워드가 등록되면 입력 비활성화
                        />
                    </div>
                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="상품명"
                            value={itemName}
                            onChange={(e) => {
                                if (!selectedKeywords.itemName) {
                                    setItemName(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.itemName} // 키워드가 등록되면 입력 비활성화
                        />
                    </div>
                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="상품 정보"
                            value={itemSpecs}
                            onChange={(e) => {
                                if (!selectedKeywords.itemSpecs) {
                                    setItemSpecs(e.target.value);
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            disabled={!!selectedKeywords.itemSpecs} // 키워드가 등록되면 입력 비활성화
                        />
                    </div>
                    <div className="pd-form-row">
                        <button className="pd-search-button" onClick={handleSearch}>조회</button>
                    </div>
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

export default ProductDetailSearch;
