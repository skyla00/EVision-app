import React, { useState } from 'react';
import './ProductPostModal.css';
import axios from 'axios';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [unit, setUnit] = useState('');
    const [itemStatus, setItemStatus] = useState('');
    const [specs, setSpecs] = useState('');

    // // 서버에 POST 요청을 보내는 함수
    // const handleSubmit = async () => {
    //     // 입력값이 모두 있는지 확인
    //     if (!itemName || !itemCode || !unit || !specs) {
    //         alert('모든 항목을 입력해주세요.');
    //         return;
    //     }
        
    //     // 새로운 아이템 데이터 생성
    //     const newItem = {
    //         itemName,
    //         itemCode,
    //         unit,
    //         specs,
    //     };

    //     try {
    //         // 로컬 스토리지에서 토큰을 가져옴
    //         let accessToken = window.localStorage.getItem('accessToken');
            
    //         // 서버에 POST 요청
    //         const response = await axios.post(`${process.env.REACT_APP_API_URL}items`, newItem, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         console.log('Access Token:', accessToken);
    //         onsubmit(response.data); //newItem 대신 API로부터 받은 실제 데이터를 전달 
            
    //         // 성공적으로 등록되었을 때
    //         alert('상품 등록 성공');
    //         onClose();
    //     } catch (error) {
    //         console.error('상품 등록 실패: ', error);
    //         alert('상품 등록 실패');
    //     }

    //     // 입력 필드 초기화
    //     setItemName('');
    //     setItemCode('');
    //     setUnit('');
    //     setSpecs('');
    // };

    // 항목 추가
    const handleSubmit = async () => {
        try {
            let accessToken = window.localStorage.getItem('accessToken');
            console.log('Access Token:', accessToken);

            const newItem = {
                itemName,
                itemCode,
                unit,
                itemStatus,
                specs,
            };

            const response = await axios.post(process.env.REACT_APP_API_URL + 'items', newItem, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            onSubmit(response.data); // API 응답을 부모로 전달
            setItemName('');
            setItemCode('');
            setUnit('');
            setItemStatus('');
            setSpecs('');
            onClose(); // 등록 후 모달을 닫음

        } catch (error) {
            console.error('상품 등록 실패: ', error);
        }
    };

    if (!isOpen) return null;


    return (
      <div className="modal">
        <div className="modal-content">
            <div className="pp-modal-header">
                <div className="pp-modal-title">상품 등록</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="pp-modal-input-section">
                <div className="pp-input-first-line">
                    <label>상품명</label>
                    <input 
                        type="text" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                        placeholder="상품명" 
                    />
                    <label>상품코드</label>
                    <input 
                        type="text" 
                        value={itemCode} 
                        onChange={(e) => setItemCode(e.target.value)} 
                        placeholder="상품코드" 
                    />
                </div>
                <div className="pp-input-second-line">
                <label>단위</label>
                    <input 
                        type="text" 
                        value={unit} 
                        onChange={(e) => setUnit(e.target.value)} 
                        placeholder="단위" 
                    />
                    <label>상태 </label>
                    <select 
                        value={itemStatus} 
                        onChange={(e) => setItemStatus(e.target.value)}>
                        <option value="" disabled hidden>상태</option>
                        <option value="ON_SALE">ON_SALE</option>
                        <option value="NOT_FOR_SALE">NOT_FOR_SALE</option>
                    </select>
                </div>
                <div className="pp-input-third-line">
                <label>정보</label>
                    <input 
                        type="text" 
                        value={specs} 
                        onChange={(e) => setSpecs(e.target.value)} 
                        placeholder="정보" 
                    />
                </div>
            </div>
            <button className="pp-post-submit-button" onClick={handleSubmit}>등록</button>
        </div>
      </div>
    );
};

export default PostModal;