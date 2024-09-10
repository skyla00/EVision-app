import './ProductDetailSearch.css';
import React, { useState, useEffect } from 'react';

const ProductDetailSearch = ({ title, list = [], onSearch }) => {

    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [filteredItemsByName, setFilteredItemsByName] = useState([]); // 상품명 필터링된 항목
    const [filteredItemsByCode, setFilteredItemsByCode] = useState([]); // 상품코드 필터링된 항목
    const [isNameDropdownVisible, setIsNameDropdownVisible] = useState(false); // 상품명 드롭다운 표시
    const [isCodeDropdownVisible, setIsCodeDropdownVisible] = useState(false); // 상품코드 드롭다운 표시 여부
    const [selectedKeywords, setSelectedKeywords] = useState([]); // 선택된 키워드를 저장하는 상태

    // 상품명이 입력될 때 실시간으로 필터링
    useEffect(() => {
        if (itemName) {
            const filtered = list.filter(item =>
                item.itemName.toLowerCase().includes(itemName.toLowerCase())
            );
            setFilteredItemsByName(filtered);
            setIsNameDropdownVisible(true); // 필터링 결과가 있을 때 드롭다운 표시
        } else {
            setFilteredItemsByName([]); // 입력값이 없으면 초기화
            setIsNameDropdownVisible(false); // 드롭다운 숨김
        }
    }, [itemName, list]);

    // 상품코드가 입력될 때 실시간으로 필터링
    useEffect(() => {
        if (itemCode) {
            const filtered = list.filter(item =>
                item.itemCode.toLowerCase().includes(itemCode.toLowerCase())
            );
            setFilteredItemsByCode(filtered);
            setIsCodeDropdownVisible(true); // 필터링 결과가 있을 때 드롭다운 표시
        } else {
            setFilteredItemsByCode([]); // 입력값이 없으면 초기화
            setIsCodeDropdownVisible(false); // 드롭다운 숨김
        }
    }, [itemCode, list]);

    // 드롭다운에서 상품명를 클릭했을 때 검색 수행
    const handleSelectItemName = (item) => {
        setItemName(item.itemName); // 선택된 항목의 itemName을 설정
        setIsNameDropdownVisible(false); // 드롭다운 숨김
        onSearch(item.itemName, ''); // 상품명으로만 검색
        setSelectedKeywords(prevKeywords => [...prevKeywords, item.itemName]);
        // onSearch(filteredItemsByName); // 필터링된 결과를 넘김
    };

    // 드롭다운에서 상품코드를 클릭했을 때 검색 수행
    const handleSelectItemCode = (item) => {
        setItemCode(item.itemCode); // 선택된 항목의 itemCode을 설정
        setIsCodeDropdownVisible(false); // 드롭다운 숨김
        onSearch('', item.itemCode); // 상품코드로만 검색
        // onSearch(filteredItemsByCode); // 필터링된 결과를 넘김
        setSelectedKeywords(prevKeywords => [...prevKeywords, item.itemCode]);
    };

    // 조회 버튼 또는 엔터키를 눌렀을 때 검색 수행
    const handleSearch = () => {
        onSearch(itemName, itemCode); // 검색 실행
        if (itemName) setSelectedKeywords(prev => [...prev, itemName]);
        if (itemCode) setSelectedKeywords(prev => [...prev, itemCode]);
        setItemName(''); // 검색 후 입력 필드를 빈 값으로 초기화
        setItemCode(''); // 검색 후 입력 필드를 빈 값으로 초기화
    };

    // 키워드를 삭제할 때 호출
    const removeKeyword = (keywordToRemove) => {
        const updatedKeywords = selectedKeywords.filter(keyword => keyword !== keywordToRemove);
        setSelectedKeywords(updatedKeywords);

        // 키워드를 모두 삭제했을 경우, 전체 상품 조회 실행
        if (updatedKeywords.length === 0) {
            onSearch('', ''); // 검색어가 없을 때 전체 상품 조회
        }
    };


    return (
        <div className="detail-search-box">
            <div className="detail-search-title"> {}
                {title && <div className="form-title">{title}</div>}
            </div>
            <div className="form-container">
                <div className="product-form-row-container">
                    <div className="product-form-row">
                        <input type="search" placeholder="상품명" value={itemName}
                            onChange={(e) => setItemName(e.target.value)} 
                            onFocus={() => setIsNameDropdownVisible(true)} />
                        {isNameDropdownVisible && filteredItemsByName.length > 0 && (
                            <ul className="product-dropdown-list">
                                {filteredItemsByName.map((item) => (
                                    <li key={item.itemCode} onClick={() => handleSelectItemName(item)}>
                                        {item.itemName}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="product-form-row">
                        <input type="search" placeholder="상품코드" value={itemCode}
                            onChange={(e) => setItemCode(e.target.value)} 
                            onFocus={() => setIsCodeDropdownVisible(true)} />
                        {isCodeDropdownVisible && filteredItemsByCode.length > 0 && (
                            <ul className="product-dropdown-list">
                                {filteredItemsByCode.map((item) => (
                                    <li key={item.itemCode} onClick={() => handleSelectItemCode(item)}>
                                        {item.itemCode}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="selected-keywords">
                    <img src="/image/keyword.png" alt="키워드" className="keyword-icon"></img>
                    {selectedKeywords.map((keyword, index) => (
                        <div key={index} className="keyword-tag">
                        {keyword}
                        <button onClick={() => removeKeyword(keyword)}>X</button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      );
    };

export default ProductDetailSearch;