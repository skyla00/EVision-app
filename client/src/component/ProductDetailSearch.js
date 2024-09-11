import './ProductDetailSearch.css';
import React, { useState, useEffect } from 'react';

const ProductDetailSearch = ({ title, list = [], onSearch }) => {
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [itemSpecs, setItemSpecs] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState({
        itemName: '',
        itemCode: '',
        itemSpecs: ''
    }); // 선택된 키워드를 저장하는 상태

    // 실시간 검색과 키워드 기반 검색을 통합한 필터링
    useEffect(() => {
        const finalItemName = itemName || selectedKeywords.itemName;
        const finalItemCode = itemCode || selectedKeywords.itemCode;
        const finalItemSpecs = itemSpecs || selectedKeywords.itemSpecs;

        onSearch(finalItemName, finalItemCode, finalItemSpecs); // 실시간 검색 또는 키워드 기반 검색 결과 반영
    }, [itemName, itemCode, itemSpecs, selectedKeywords, onSearch]); // 의존성 배열 확인

    // 검색 버튼 클릭 또는 엔터키 입력 시 키워드를 추가하고 검색 수행
    const handleSearch = () => {
        setSelectedKeywords(prevKeywords => ({
            itemName: itemName ? `상품명 : ${itemName}` : prevKeywords.itemName,
            itemCode: itemCode ? `상품코드 : ${itemCode}` : prevKeywords.itemCode,
            itemSpecs: itemSpecs ? `상품 정보 : ${itemSpecs}` : prevKeywords.itemSpecs
        }));

        // 검색 후 입력 필드를 초기화 (하지만 키워드 유지)
        setItemName('');
        setItemCode('');
        setItemSpecs('');
    };

    // 엔터키로도 검색되도록 처리
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

        // 키워드를 모두 삭제했을 경우, 전체 상품 조회 실행
        if (!updatedKeywords.itemName && !updatedKeywords.itemCode && !updatedKeywords.itemSpecs) {
            onSearch('', '', ''); // 검색 조건이 없을 때 전체 상품 조회
        }
    };

    return (
        <div className="detail-search-box">
            <div className="detail-search-title">
                {title && <div className="form-title">{title}</div>}
            </div>
            <div className="form-container">
                <div className="product-form-row-container">
                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="상품코드"
                            value={itemCode}
                            onChange={(e) => setItemCode(e.target.value)}
                            onKeyPress={handleKeyPress} // 엔터키로 검색 가능
                        />
                    </div>
                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="상품명"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            onKeyPress={handleKeyPress} // 변경된 부분
                        />
                    </div>
                    <div className="product-form-row">
                        <input
                            type="search"
                            placeholder="상품 정보"
                            value={itemSpecs}
                            onChange={(e) => setItemSpecs(e.target.value)}
                            onKeyPress={handleKeyPress} // 엔터키로 검색 가능
                        />
                    </div>
                    <div className="form-row">
                        <button className="pd-search-button" onClick={handleSearch}>조회</button>
                    </div>
                </div>

                <div className="selected-keywords">
                    <img src="/image/keyword.png" alt="키워드" className="keyword-icon" />
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

export default ProductDetailSearch;