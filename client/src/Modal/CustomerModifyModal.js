import React, { useState } from 'react';
import './ProductPostModal.css';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [manager, setManager] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    // 항목 추가
    const handleSubmit = () => {
    
        // 입력값이 모두 있는지 확인
        if (!customerName || !customerCode || !manager || !customerPhone || !customerEmail || !customerAddress) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
        
        // 새로운 아이템 생성
        const newItem = {
            customerName,
            customerCode,
            manager,
            customerPhone,
            customerEmail,
            customerAddress
        };

        // 부모 컴포넌트로 데이터 전달
        onSubmit(newItem);

        // 입력 필드 초기화
        setCustomerName('');
        setCustomerCode('');
        setManager('');
        setCustomerPhone('');
        setCustomerEmail('');
        setCustomerAddress('');
    };

    if (!isOpen) return null;


    return (
      <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title">판매 업체 수정</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="modal-input-section">
                <div className="input-first-line">
                    <input 
                        type="text" 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)} 
                        placeholder="판매업체명" 
                    />
                    <input 
                        type="text" 
                        value={customerCode} 
                        onChange={(e) => setCustomerCode(e.target.value)} 
                        placeholder="판매업체 코드" 
                    />
                </div>
                <div className="input-second-line">
                    <input 
                        type="text" 
                        value={manager} 
                        onChange={(e) => setManager(e.target.value)} 
                        placeholder="판매업체 담당자" 
                    />
                    <input 
                        type="text" 
                        value={customerPhone} 
                        onChange={(e) => setCustomerPhone(e.target.value)} 
                        placeholder="판매업체 연락처" 
                    />
                </div>
                <div className="input-third-line">
                    <input 
                        type="email" 
                        value={customerEmail} 
                        onChange={(e) => setCustomerEmail(e.target.value)} 
                        placeholder="판매업체 이메일" 
                    />
                    <input 
                        type="text" 
                        value={customerAddress} 
                        onChange={(e) => setCustomerAddress(e.target.value)} 
                        placeholder="판매업체 주소" 
                    />
                </div>
            </div>
            <button className="post-submit-button" onClick={handleSubmit}>수정</button>
        </div>
      </div>
    );
};

export default PostModal;