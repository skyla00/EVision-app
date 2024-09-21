import React, { useEffect, useState } from 'react';
import './SalesPriceModifyModal.css';
import axios from 'axios';

const SalesPriceModifyModal = ({ isOpen, onClose, onSubmit, salesPrice }) => {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [salesAmount, setSalesAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [salesAmountErrors, setSalesAmountErrors] = useState('');

    // 모달이 열릴 때 선택된 아이템 정보를 입력 필드에 채움
    useEffect(() => {
        if(isOpen && salesPrice !== undefined ) {
            setItemCode(salesPrice.itemCode);
            setItemName(salesPrice.itemName);
            setCustomerCode(salesPrice.customerCode);
            setCustomerName(salesPrice.customerName);
            setSalesAmount(salesPrice.salesAmount);
            setStartDate(salesPrice.startDate);
            setSalesAmountErrors('');
        }
    }, [isOpen, salesPrice]);

    // 판매가 검증
    const validateSalesAmount = (salesAmount) => {
        if (!salesAmount) return ''; 
        const regex = /^[0-9]+$/;
        if (!regex.test(salesAmount)) {
            return '0 이상 숫자만 입력 가능합니다.';
        }
        return '';
    };
    const handleSalesAmountChange = (e) => {
        const value = e.target.value;
        setSalesAmount(value);
        const error = validateSalesAmount(value);
        setSalesAmountErrors(error); // 오류를 실시간으로 업데이트
    };

    // 기준일자 검증
    const validateStartDate = (newStartDate) => {
        const currentStartDate = new Date(salesPrice.startDate);
        const newStart = new Date(newStartDate);
    
        if (newStart <= currentStartDate) {
            return '기준일자는 기존 기준일자보다 더 나중이어야 합니다';
        }
        return '';
    };

    const handleSubmit = async () => {
        const salesAmountError = validateSalesAmount(salesAmount);
        if (!itemCode || !itemName || !customerCode || !customerName || !salesAmount || !startDate) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (salesAmountError) {
            setSalesAmountErrors(salesAmountError);
            return alert('올바른 형식으로 입력해주세요.');
        }

        const startDateError = validateStartDate(startDate);
        if (startDateError) {
            return alert(startDateError);
        }
    
        try {
            let accessToken = window.localStorage.getItem('accessToken');
            
            const updatedSalesPrice = {
                itemCode,
                customerCode,
                salesAmount,
                startDate,
            };
    
            const response = await axios.patch(
                process.env.REACT_APP_API_URL + 'sales-prices' + '/' + salesPrice.salesPriceId,
                updatedSalesPrice, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            // 부모 컴포넌트로 데이터 전달
            onSubmit(response.data);
    
            // 상태 초기화
            setItemCode('');
            setItemName('');
            setCustomerName('');
            setCustomerCode('');
            setSalesAmount('');
            setStartDate('');
            onClose();
        } catch (error) {
            if (error.response) {
                const { status, message } = error.response.data;
    
                // 상태 코드와 메시지에 따라 다른 메시지 표시
                if (status === 409 && message === "new SalesPrices Exists") {
                    alert("이 판매가는 수정할 수 없습니다. 최근 판매가를 확인해주세요");
                } else if (status === 404 && message === "Sales Price Same") {
                    alert("동일한 판매가로 기준일을 변경할 수 없습니다.");
                } else {
                    alert(`에러 발생: ${message}`);
                }
            } else {
                console.error('판매업체 정보 등록 실패: ', error.message);
                alert('판매가 등록에 실패했습니다.');
            }
        }
    };

    if (!isOpen) return null;


    return (
        <div className="modal">
          <div className="modal-content">
              <div className="sp-modal-header">
                  <div className="sp-modal-title">판매가 수정</div>
                  <div className="modal-close" onClick={onClose}>&times;</div>
              </div>
  
              <div className="sp-modal-modify-input-section">
                  <div className="sp-modify-input-first-line">
                      <label>상품코드</label>
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
                  <div className="sp-modify-input-second-line">
                      <label>판매업체코드</label>
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
                  <div className="sp-modify-input-third-line">
                      <label>판매가</label>
                      <input 
                          type="text" 
                          value={salesAmount} 
                          onChange={handleSalesAmountChange} 
                          placeholder="판매가" 
                      />
                      <label>기준일자</label>
                      <input 
                          type="date" 
                          value={startDate} 
                          onChange={(e) => setStartDate(e.target.value)} 
                          placeholder="기준일자" 
                      />
                  </div>
                  <div className="order-error-fourth-line">
                        <div className='sales-amount-error'>
                            {salesAmountErrors && <p className="om-error-message">{salesAmountErrors}</p>}
                        </div>
                  </div>
              </div>
              <button className="sp-post-submit-button" onClick={handleSubmit}>수정</button>
          </div>
        </div>
      );
  };
  
  export default SalesPriceModifyModal;