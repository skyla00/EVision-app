import React, { useState } from 'react';
import './CustomerPostModal.css';
import axios from 'axios';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [manager, setManager] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    // 항목 추가
    const handleSubmit = async () => {
        try {
            let accessToken = window.localStorage.getItem('accessToken');
            console.log('Access Token');

            const newCustomer = {
                customerCode,
                customerName,
                manager,
                customerPhone,
                customerEmail,
                customerAddress,
            };

            const response = await axios.post(process.env.REACT_APP_API_URL + 'customers', newCustomer, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            onSubmit(response.data); // API 응답을 상위로 전달
            setCustomerName('');
            setCustomerCode('');
            setManager('');
            setCustomerPhone('');
            setCustomerEmail('');
            setCustomerAddress('');
            onClose();

        } catch (error) {
            console.error('상품 등록 실패: ', error);
        }
    };

    if (!isOpen) return null;


    return (
      <div className="modal">
        <div className="modal-content">
            <div className="cp-modal-header">
                <div className="cp-modal-title">판매 업체 등록</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="cp-modal-input-section">
                <div className="cp-input-first-line">
                    <label>판매업체명</label>
                    <input 
                        type="text" 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)} 
                        placeholder="판매업체명" 
                    />
                    <label>판매업체 코드</label>
                    <input 
                        type="text" 
                        value={customerCode} 
                        onChange={(e) => setCustomerCode(e.target.value)} 
                        placeholder="판매업체 코드" 
                    />
                </div>
                <div className="cp-input-second-line">
                    <label>판매업체 담당자</label>
                    <input 
                        type="text" 
                        value={manager} 
                        onChange={(e) => setManager(e.target.value)} 
                        placeholder="판매업체 담당자" 
                    />
                    <label>판매업체 연락처</label>
                    <input 
                        type="text" 
                        value={customerPhone} 
                        onChange={(e) => setCustomerPhone(e.target.value)} 
                        placeholder="판매업체 연락처" 
                    />
                </div>
                <div className="cp-input-third-line">
                    <label>판매업체 이메일</label>
                    <input 
                        type="email" 
                        value={customerEmail} 
                        onChange={(e) => setCustomerEmail(e.target.value)} 
                        placeholder="판매업체 이메일" 
                    />
                    <label>판매업체 주소</label>
                    <input 
                        type="text" 
                        value={customerAddress} 
                        onChange={(e) => setCustomerAddress(e.target.value)} 
                        placeholder="판매업체 주소" 
                    />
                </div>
            </div>
            <button className="cp-post-submit-button" onClick={handleSubmit}>등록</button>
        </div>
      </div>
    );
};

export default PostModal;