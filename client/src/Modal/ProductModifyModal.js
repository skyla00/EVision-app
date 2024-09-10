import React, { useEffect, useState } from 'react';
import './ProductModifyModal.css';

const ProductModifyModal = ({ isOpen, onClose, onSubmit, item }) => {
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [unit, setUnit] = useState('');
    const [status, setStatus] = useState('');
    const [specs, setSpecs] = useState('');

    // 항목 추가
    const handleSubmit = () => {
    
        // 입력값이 모두 있는지 확인
        if (!itemName || !itemCode || !unit || !status || !specs) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
        
        // 새로운 아이템 생성
        const newItem = {
            itemName,
            itemCode,
            unit,
            status,
            specs,
        };

        // 부모 컴포넌트로 데이터 전달
        onSubmit(newItem);

        // 입력 필드 초기화
        setItemName('');
        setItemCode('');
        setUnit('');
        setStatus('');
        setSpecs('');
    };

    useEffect(() => {
        if(isOpen && item !== undefined){
            console.log(item);
            setItemName(item.itemName);
            setItemCode(item.itemCode);
            setUnit(item.unit);
            setStatus(item.status);
            setSpecs(item.specs);
        }
      }, [item]);

    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title">상품 정보 수정</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="modal-input-section">
                <div className="input-first-line">
                    <input 
                        type="text" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                        placeholder="상품명" 
                    />
                    <input 
                        type="text" 
                        value={itemCode} 
                        onChange={(e) => setItemCode(e.target.value)} 
                        placeholder="상품코드" 
                    />
                </div>
                <div className="input-second-line">
                    <input 
                        type="text" 
                        value={unit} 
                        onChange={(e) => setUnit(e.target.value)} 
                        placeholder="단위" 
                    />
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="" disabled hidden>상태</option>
                        <option value="판매중">판매중</option>
                        <option value="품절">판매종료</option>
                    </select>
                </div>
                <div className="input-third-line-product">
                    <input 
                        type="text" 
                        value={specs} 
                        onChange={(e) => setSpecs(e.target.value)} 
                        placeholder="정보" 
                    />
                </div>
            </div>
            <button className="post-submit-button" onClick={handleSubmit}>수정</button>
        </div>
      </div>
    );
};

export default ProductModifyModal;