import React, { useState } from 'react';
import './SalePricePostModal.css';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [itemCode, setItemCode] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [salesPrice, setSalesPrice] = useState('');
    const [startDate, setstartDate] = useState('');

    // 항목 추가
    const handleSubmit = () => {
    
        // 입력값이 모두 있는지 확인
        if (!itemCode || !customerCode || !salesPrice || !startDate) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
        
        // 새로운 아이템 생성
        const newItem = {
            itemCode,
            customerCode,
            salesPrice,
            startDate,
        };

        // 부모 컴포넌트로 데이터 전달
        onSubmit(newItem);

        // 입력 필드 초기화
        setItemCode('');
        setCustomerCode('');
        setSalesPrice('');
        setstartDate('');
    };

    if (!isOpen) return null;


    return (
      <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title">판매가 수정</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="modal-input-section">
                <div className="input-first-line">
                    <input 
                        type="search" 
                        value={itemCode} 
                        onChange={(e) => setItemCode(e.target.value)} 
                        placeholder="상품 코드" 
                    />
                    <input 
                        type="search" 
                        value={customerCode} 
                        onChange={(e) => setCustomerCode(e.target.value)} 
                        placeholder="판매업체 코드" 
                    />
                </div>
                <div className="input-second-line">
                    <input 
                        type="text" 
                        value={salesPrice} 
                        onChange={(e) => setSalesPrice(e.target.value)} 
                        placeholder="판매 단가" 
                    />
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setstartDate(e.target.value)} 
                        placeholder="판매가 기준일" 
                    />
                </div>
            </div>
            <button className="post-submit-button" onClick={handleSubmit}>수정</button>
        </div>
      </div>
    );
};

export default PostModal;