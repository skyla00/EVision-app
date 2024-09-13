import React, { useEffect, useState } from 'react';
import './SalesPricePostModal.css';
import axios from 'axios';

const SalesPriceModifyModal = ({ isOpen, onClose, onSubmit, salesPrice }) => {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [salesAmount, setSalesAmount] = useState('');
    const [startDate, setstartDate] = useState('');

    // 모달이 열릴 때 선택된 아이템 정보를 입력 필드에 채움
    useEffect(() => {
        if(isOpen && salesPrice !== undefined ) {
            console.log(salesPrice);
            setItemCode(salesPrice.itemCode);
            setItemName(salesPrice.itemName);
            setCustomerCode(salesPrice.customerCode);
            setCustomerName(salesPrice.customerName);
            setSalesAmount(salesPrice.salesAmount);
            setstartDate(salesPrice.startDate);
        }
    }, [isOpen, salesPrice]);

    const handleSubmit = async () => {
        try {
            let accessToken = window.localStorage.getItem('accessToken');
            console.log('Access Token:', accessToken);
        
            const updatedSalesPrice = {
            itemCode,
            customerCode,
            salesAmount,
            startDate
        };
        
        const response = await axios.patch(process.env.REACT_APP_API_URL + 'sales-prices' + '/' + salesPrice.salesPriceId,
            updatedSalesPrice, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

        // 부모 컴포넌트로 데이터 전달
        onSubmit(response.data);
        setItemCode('');
        setItemName('');
        setCustomerName('');
        setCustomerCode('');
        setSalesAmount('');
        setstartDate('');
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
                  <div className="cm-modal-title">판매가 수정</div>
                  <div className="modal-close" onClick={onClose}>&times;</div>
              </div>
  
              <div className="cm-modal-input-section">
                  <div className="cm-input-first-line">
                      <label>상품 코드</label>
                      <input 
                          type="text" 
                          value={itemCode} 
                          onChange={(e) => setItemCode(e.target.value)} 
                          readOnly
                      />
                      <label>상품명</label>
                      <input 
                          type="text" 
                          value={itemName} 
                          onChange={(e) => setItemName(e.target.value)} 
                          readOnly
                      />
                  </div>
                  <div className="cm-input-second-line">
                      <label>판매업체 코드</label>
                      <input 
                          type="text" 
                          value={customerCode} 
                          onChange={(e) => setCustomerCode(e.target.value)} 
                          readOnly
                      />
                      <label>판매업체명</label>
                      <input 
                          type="text" 
                          value={customerName} 
                          onChange={(e) => setCustomerName(e.target.value)} 
                          readOnly
                      />
                  </div>
                  <div className="cm-input-third-line">
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
              <button className="cm-post-submit-button" onClick={handleSubmit}>수정</button>
          </div>
        </div>
      );
  };
  
  export default SalesPriceModifyModal;