import React, { useState } from 'react';
import './ProductPostModal.css';
import axios from 'axios';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [unit, setUnit] = useState('');
    const [itemStatus, setItemStatus] = useState('');
    const [specs, setSpecs] = useState('');

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
                    Authorization: `${accessToken}`,
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
                    <select 
                        value={unit} 
                        onChange={(e) => setUnit(e.target.value)} >
                        <option value="" disabled hidden>단위</option>
                        <option value="EA">EA</option>
                        <option value="SET">SET</option>
                    </select>
                    <label>상태</label>
                    <select 
                        value={itemStatus} 
                        onChange={(e) => setItemStatus(e.target.value)}>
                        <option value="" disabled hidden>상태</option>
                        <option value="ON_SALE">판매중</option>
                        <option value="NOT_FOR_SALE">판매중지</option>
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