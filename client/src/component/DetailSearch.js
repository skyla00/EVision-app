import axios from 'axios';
import './DetailSearch.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DetailSearch = ({ title, fields = [], onsearchhandler }) => {
    const halfIndex = Math.ceil(fields.length / 2); 
    const firstRowFields = fields.slice(0, 6);
    const secondRowFields = fields.slice(6, 11) || []; // 기본값을 빈 배열로 설정
    const [searchTerm, setSearchTerm] = React.useState(''); // 검색어 상태 추가
    const [searchResults, setSearchResults] = React.useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    useEffect(() => {
        handleSearch();
      }, []);

    const location = useLocation();

    const handleSearch = async () => {
        let accessToken = window.localStorage.getItem('accessToken');
        try {
            let response;
            if(location.pathname.indexOf('product') > -1){
                response = await axios.get(
                    // 'http://127.0.0.1:8080/items?page=' + 1 + '&size=' + 10 + '&itemCode=' + firstRowFields + '&itemName=' + secondRowFields,
                     process.env.REACT_APP_API_URL + 'items?page=' + 1 + '&size=' + 50,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                      },
                    }
                  );
            }

          if(response !== undefined){
            console.log(response);
            if(onsearchhandler !== undefined)
                onsearchhandler(response.data.data);
        }

        } catch (error) {
          alert(JSON.stringify(error.message));
        }
      };

//    // 검색 버튼 클릭 시 키워드 추가
//     const handleSearch = () => {
//         const selected = [];

//         // 각 필드에 입력된 값을 기준으로 검색 로직을 수행하고 해당 값을 키워드로 추가
//         fields.forEach(field => {
//             const fieldElement = document.querySelector(`input[placeholder="${field.placeholder}"]`);
//             if (fieldElement && fieldElement.value) {
//                 selected.push(fieldElement.value);
//             }

//             if (field.type === 'select') {
//                 const selectElement = document.querySelector(`select[placeholder="${field.placeholder}"]`);
//                 if (selectElement && selectElement.value) {
//                     selected.push(selectElement.value);
//                 }
//             }
//         });

//         setSelectedKeywords((prevKeywords) => {
//         // 이미 선택된 키워드를 중복 없이 추가
//             const newKeywords = selected.filter((keyword) => !prevKeywords.includes(keyword));
//             return [...prevKeywords, ...newKeywords];
//         });
//     };

    // 키워드 삭제
    const removeKeyword = (keywordToRemove) => {
        setSelectedKeywords((prevKeywords) =>
            prevKeywords.filter((keyword) => keyword !== keywordToRemove)
        );
    };

    return (
        <div className="detail-search-box">
            <div className="detail-search-title"> {}
            {title && <h2 className="form-title">{title}</h2>}</div>
            <div className="form-container">
                <div className="form-row">
                    {firstRowFields.map((field, index) => (
                    <div key={index} className="form-group">
                        {field.type === 'select' ? (
                        <select className="drop-down">
                            <option value="">{field.placeholder}</option>
                            {field.options && field.options.map((option, optionIndex) => ( // options가 정의되어 있는지 확인
                                <option key={optionIndex} value={option}>{option}</option>
                            ))}
                            <option value="approval">승인</option>
                            <option value="reject">반려</option>
                            <option value="request">승인요청</option>
                            <option value="temporary">임시저장</option>
                        </select>
                        ) : (
                            <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="form-input"
                            />
                        )}                        
                    </div>
                    ))}
                </div>
                <div className="form-row">
                    {secondRowFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="form-input"
                        />
                    </div>
                    ))}
                    <button className="search-button" onClick={handleSearch}> 조회 </button>
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

export default DetailSearch;