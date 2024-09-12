import React, { useState } from 'react';
import './SalesPricePostModal.css';
import axios from 'axios';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [salesAmount, setSalesAmount] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 항목 추가
    const handleSubmit = async () => {
        try {
            let accessToken = window.localStorage.getItem('accessToken');

            const newSalesPrice = {
                itemCode,
                customerCode,
                salesAmount: parseInt(salesAmount),
                startDate,
            };

            const response = await axios.post(process.env.REACT_APP_API_URL + 'sales-prices', newSalesPrice, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            onSubmit(response.data); // API 응답을 상위로 전달
            setItemCode('');
            setItemName('');
            setCustomerName('');
            setCustomerCode('');
            setSalesAmount('');
            setstartDate('');
            setEndDate('');
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
                  <div className="cp-modal-title">판매가 등록</div>
                  <div className="modal-close" onClick={onClose}>&times;</div>
              </div>
  
              <div className="cp-modal-input-section">
                  <div className="cp-input-first-line">
                      <label>상품 코드</label>
                      <input 
                          type="text" 
                          value={itemCode} 
                          onChange={(e) => setItemCode(e.target.value)} 
                          placeholder="상품 코드" 
                      />
                      <label>상품명</label>
                      <input 
                          type="text" 
                          value={itemName} 
                          onChange={(e) => setItemName(e.target.value)} 
                          placeholder="상품명" 
                      />
                  </div>
                  <div className="cp-input-second-line">
                      <label>판매업체 코드</label>
                      <input 
                          type="text" 
                          value={customerCode} 
                          onChange={(e) => setCustomerCode(e.target.value)} 
                          placeholder="판매업체 코드" 
                      />
                      <label>판매업체명</label>
                      <input 
                          type="text" 
                          value={customerName} 
                          onChange={(e) => setCustomerName(e.target.value)} 
                          placeholder="판매업체명" 
                      />
                  </div>
                  <div className="cp-input-third-line">
                      <label>판매가</label>
                      <input 
                          type="text" 
                          value={salesAmount} 
                          onChange={(e) => setSalesAmount(e.target.value)} 
                          placeholder="판매가" 
                      />
                      <label>기준일자</label>
                      <input 
                          type="date" 
                          value={startDate} 
                          onChange={(e) => setstartDate(e.target.value)} 
                          placeholder="기준일자" 
                      />
                  </div>
              </div>
              <button className="cp-post-submit-button" onClick={handleSubmit}>등록</button>
          </div>
        </div>
      );
  };
  
  export default PostModal;