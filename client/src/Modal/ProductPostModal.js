import React, { useState } from 'react';
import './ProductPostModal.css';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [unit, setUnit] = useState('');
    const [specs, setSpecs] = useState('');

    // 항목 추가
    const handleSubmit = () => {
    
        // 입력값이 모두 있는지 확인
        if (!itemName || !itemCode || !unit || !specs) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
        
        // 새로운 아이템 생성
        const newItem = {
            itemName,
            itemCode,
            unit,
            specs,
        };

        // 부모 컴포넌트로 데이터 전달
        onSubmit(newItem);

        // 입력 필드 초기화
        setItemName('');
        setItemCode('');
        setUnit('');
        setSpecs('');
    };

    if (!isOpen) return null;


    return (
      <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title">상품 등록</div>
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
                </div>
                <div className="input-third-line">
                    <input 
                        type="text" 
                        value={specs} 
                        onChange={(e) => setSpecs(e.target.value)} 
                        placeholder="정보" 
                    />
                </div>
            </div>
            <button className="post-submit-button" onClick={handleSubmit}>등록</button>
        </div>
      </div>
    );
};

export default PostModal;