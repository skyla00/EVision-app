import React, { useState } from 'react';
import './SalesPricePostModal.css';
import axios from 'axios';
import ProductSearch from '../Product/ProductSearch';
import CustomerSearch from '../Customer/CustomerSearch';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [salesAmount, setSalesAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [salesAmountErrors, setSalesAmountErrors] = useState('');
    const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);  // 상품 검색 모달 열기 상태
    const [isCustomerSearchOpen, setIsCustomerSearchOpen] = useState(false);  // 판매업체 검색 모달 열기 상태

     // 모달 열고 닫는 함수
     const openProductSearch = () => setIsProductSearchOpen(true);
     const closeProductSearch = () => setIsProductSearchOpen(false);
 
     const openCustomerSearch = () => setIsCustomerSearchOpen(true);
     const closeCustomerSearch = () => setIsCustomerSearchOpen(false);
 
     // 상품 선택 시 호출
     const handleProductSelect = (product) => {
         setItemCode(product.itemCode);
         setItemName(product.itemName);
         closeProductSearch();
     };
 
     // 판매업체 선택 시 호출
     const handleCustomerSelect = (customer) => {
         setCustomerCode(customer.customerCode);
         setCustomerName(customer.customerName);
         closeCustomerSearch();
     };

    // 판매가 검증
    const validateSalesAmount = (salesAmount) => {
        if (!salesAmount) return ''; 
        const regex = /^[1-9][0-9]*(?:,[0-9])*$/;
        if (!regex.test(salesAmount)) {
            return '0 이상 숫자만 입력 가능'
        }
        return '';
    };
    const handleSalesAmountChange = (e) => {
        const value = e.target.value;
        setSalesAmount(value);
        const error = validateSalesAmount(value);
        setSalesAmountErrors(error); // 오류를 실시간으로 업데이트
    };

    // 항목 추가
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
            setStartDate('');
            setEndDate('');
            onClose();

        } catch (error) {
            console.error('상품 등록 실패: ', error);
            const errorMessage = error.response.data.message;

            if (errorMessage === "SalesPrices Exists") {
              alert("이미 해당 상품과 판매업체의 판매단가가 존재합니다");
            } else if (errorMessage === "PurchaseAmount Not Found") {
                alert("매입단가가 존재하지 않는 상품이므로 판매단가 등록이 불가능합니다");
            }else if (errorMessage === ""){
              alert(errorMessage); // Default alert for other errors
            }
        }
    };

    // 모달 닫을 때 상태 초기화
    const handleClose = () => {
        setItemCode('');
        setItemName('');
        setCustomerName('');
        setCustomerCode('');
        setSalesAmount('');
        setStartDate('');
        setEndDate('');
        onClose();
    };

    if (!isOpen) return null;


    return (
        <div className="modal">
          <div className="modal-content">
              <div className="cp-modal-header">
                  <div className="cp-modal-title">판매가 등록</div>
                  <div className="modal-close" onClick={handleClose}>&times;</div>
              </div>
  
              <div className="cp-modal-input-section">
                  <div className="sp-input-first-line">
                      <label>상품코드</label>
                      <input 
                          type="text" 
                          value={itemCode} 
                          readOnly
                          onChange={(e) => setItemCode(e.target.value)} 
                          placeholder="상품코드" 
                      />
                      <label>상품명</label>
                      <input 
                          type="text" 
                          value={itemName} 
                          readOnly
                          onChange={(e) => setItemName(e.target.value)} 
                          placeholder="상품명" 
                      />
                       <button className="ps-modal-button" onClick={openProductSearch}>검색</button> 
                  </div>
                  <div className="sp-input-second-line">
                      <label>판매업체 코드</label>
                      <input 
                          type="text" 
                          value={customerCode} 
                          readOnly
                          onChange={(e) => setCustomerCode(e.target.value)} 
                          placeholder="판매업체코드" 
                      />
                      <label>판매업체명</label>
                      <input 
                          type="text" 
                          value={customerName} 
                          readOnly
                          onChange={(e) => setCustomerName(e.target.value)} 
                          placeholder="판매업체명" 
                      />
                      <button className="ps-modal-button" onClick={openCustomerSearch}>검색</button> 
                  </div>
                  <div className="sp-input-third-line">
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
              <button className="sp-post-submit-button" onClick={handleSubmit}>등록</button>
          </div>
           {/* ProductSearch 모달 */}
            {isProductSearchOpen && (
                <ProductSearch onProductSelect={handleProductSelect} onClose={closeProductSearch} />
            )}

            {/* CustomerSearch 모달 */}
            {isCustomerSearchOpen && (
                <CustomerSearch onCustomerSelect={handleCustomerSelect} onClose={closeCustomerSearch} />
            )}
        </div>
      );
  };
  
  export default PostModal;