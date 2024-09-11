import React, { useEffect, useState } from 'react';
import './CustomerModifyModal.css';
import axios from 'axios';

const CustomerModifyModal = ({ isOpen, onClose, onSubmit, customer }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [manager, setManager] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    // 모달이 열릴 때 선택된 아이템 정보를 입력 필드에 채움
    useEffect(() => {
        if(isOpen && customer !== undefined ) {
            console.log(customer);
            setCustomerCode(customer.customerCode);
            setCustomerName(customer.customerName);
            setManager(customer.manager);
            setCustomerAddress(customer.customerAddress);
            setCustomerPhone(customer.customerPhone);
            setCustomerEmail(customer.customerEmail);
        }
    }, [isOpen, customer]);

    const handleSubmit = async () => {
        try {
            let accessToken = window.localStorage.getItem('accessToken');
            console.log('Access Token:', accessToken);
        
            const updatedCustomer = {
            customerName,
            customerCode,
            manager,
            customerPhone,
            customerEmail,
            customerAddress,
        };
        
        const response = await axios.patch(process.env.REACT_APP_API_URL + 'customers' + '/' + updatedCustomer.customerCode,
            updatedCustomer, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

        // 부모 컴포넌트로 데이터 전달
        onSubmit(response.data);
        setCustomerName('');
        setCustomerCode('');
        setManager('');
        setCustomerPhone('');
        setCustomerEmail('');
        setCustomerAddress('');
        onClose();
        } catch (error) {
            console.error('판매업체 정보 등록 실패: ', error);
        }
    };

    if (!isOpen) return null;


    return (
      <div className="modal">
        <div className="modal-content">
            <div className="cm-modal-header">
                <div className="cm-modal-title">판매 업체 수정</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="cm-modal-input-section">
                <div className="cm-input-first-line">
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
                <div className="cm-input-second-line">
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
                <div className="cm-input-third-line">
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
            <button className="cm-post-submit-button" onClick={handleSubmit}>수정</button>
        </div>
      </div>
    );
};

export default CustomerModifyModal;