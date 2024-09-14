import React, { useEffect, useState } from 'react';
import './ProductModifyModal.css';
import axios from 'axios';

const ProductModifyModal = ({ isOpen, onClose, onSubmit, item }) => {
    console.log(isOpen);
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [unit, setUnit] = useState('');
    const [itemStatus, setItemStatus] = useState('');
    const [specs, setSpecs] = useState('');

    // 모달이 열릴 때 선택된 아이템 정보를 입력 필드에 채움
    useEffect(() => {
        if (isOpen && item !== undefined) {
            console.log(item);
            setItemName(item.itemName);
            setItemCode(item.itemCode);
            setUnit(item.unit);
            setItemStatus(item.itemStatus);
            setSpecs(item.specs);
        }
    }, [isOpen, item]);

    const handleSubmit = async () => {
        try {
            let accessToken = window.localStorage.getItem('accessToken');
            console.log('Access Token:', accessToken);

            const updatedItem = {
                itemName,
                itemCode,
                unit,
                itemStatus,
                specs,
            };

            const response = await axios.patch(process.env.REACT_APP_API_URL + 'items' + '/' + updatedItem.itemCode,
                updatedItem, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
            onSubmit(response.data);
            setItemName('');
            setItemCode('');
            setUnit('');
            setItemStatus('');
            setSpecs('');
            onClose();
        } catch (error) {
            console.error('상품 등록 실패: ', error);
        }
    };
                    

    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
            <div className="pd-modal-header">
                <div className="pd-modal-title">상품 정보 수정</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>
            <div className="pm-modal-input-section">
                <div className="pm-input-first-line">
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
                        readOnly
                    />
                </div>
                <div className="pm-input-second-line">
                    <label>단위</label>
                    <select 
                        value={unit} 
                        onChange={(e) => setUnit(e.target.value)} >
                        <option value="EA">EA</option>
                        <option value="SET">SET</option>
                    </select>
                    <label>상태</label>
                    <select 
                        value={itemStatus} 
                        onChange={(e) => setItemStatus(e.target.value)}>
                        <option value="ON_SALE">판매중</option>
                        <option value="NOT_FOR_SALE">판매중지</option>
                    </select>
                </div>
                <div className="pm-input-third-line">
                <label>정보</label>
                    <input 
                        type="text" 
                        value={specs} 
                        onChange={(e) => setSpecs(e.target.value)} 
                        placeholder="정보" 
                    />
                </div>
            </div>
            <button className="pd-post-submit-button" onClick={handleSubmit}>수정</button>
        </div>
      </div>
    );
};

export default ProductModifyModal;