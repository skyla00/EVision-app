import React, { useState, useEffect } from 'react';
import './OrderModal.css';
import axios from 'axios';
import ProductSearch from '../Product/ProductSearch';
import CustomerSearch from '../Customer/CustomerSearch';

const OrderModal = ({ isOpen, onClose }) => {

    const [orderDate, setOrderDate] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [salesAmount, setSalesAmount] = useState('');
    const [orderItemQuantity, setOrderItemQuantity] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [orderList, setOrderList] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [salesAmountErrors, setSalesAmountErrors] = useState('');
    const [orderItemQuantityErrors, setOrderItemQuantityErrors] = useState('');
    const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);  // 상품 검색 모달 열기 상태
    const [isCustomerSearchOpen, setIsCustomerSearchOpen] = useState(false);  // 판매업체 검색 모달 열기 상태
    const [isCustomerInfoLocked, setIsCustomerInfoLocked] = useState(false); // 판매업체명과 판매업체코드 비활성화 여부
    const [isOrderDateLocked, setIsOrderDateLocked] = useState(false); // 주문일자 비활성화 여부
    
    // 판매가 검증
    const validateSalesAmount = (salesAmount) => {
        if (!salesAmount) return ''; 
        const regex = /^[1-9][0-9]*(?:,[0-9])*$/;
        if (!regex.test(salesAmount)) {
            return '0 이상 숫자만 입력'
        }
        return '';
    };
    const handleSalesAmountChange = (e) => {
        const value = e.target.value;
        setSalesAmount(value);
        const error = validateSalesAmount(value);
        setSalesAmountErrors(error);
    }

    // 수량 검증 
    const validateOrderItemQuantity = (orderItemQuantity) => {
        if (!orderItemQuantity) return ''; 
        const regex = /^[1-9][0-9]*(?:,[0-9])*$/;
        if(!regex.test(orderItemQuantity)) {
            return '0 이상 숫자만 입력'
        }
        return '';
    }
    const handleOrderItemQuantityChange = (e) => {
        const value = e.target.value;
        setOrderItemQuantity(value);
        const error = validateOrderItemQuantity(value);
        setOrderItemQuantityErrors(error);
    }
    
    

    useEffect(() => {
        if (isOpen) {
            setOrderDate('');
            setItemName('');
            setItemCode('');
            setDeliveryDate('');
            setSalesAmount('');
            setOrderItemQuantity('');
            setCustomerName('');
            setCustomerCode('');
            setIsCustomerInfoLocked(false);
            setIsOrderDateLocked(false);
            setSalesAmountErrors('');
            setOrderItemQuantityErrors('');
        } else {
            setOrderList([]);
        }
    }, [isOpen]);
    
    // 판매업체 정보 수정 

    useEffect(() => {
        if(!isCustomerInfoLocked) {
            setCustomerName('');
            setCustomerCode('');
            setOrderDate('');
        }
    }, [isCustomerInfoLocked]);

    // 항목 추가
    const handleAddItem = async () => {
        const salesAmountError = validateSalesAmount(salesAmount);
        const orderItemQuantityError = validateOrderItemQuantity(orderItemQuantity);

        // 입력값이 모두 있는지 먼저 확인하는 창
        if (!itemName || !itemCode || !salesAmount || !orderItemQuantity || !deliveryDate) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (salesAmountError || orderItemQuantityError) {
            setSalesAmountErrors(salesAmountError);
            setOrderItemQuantityErrors(orderItemQuantityError);
            return alert('올바른 형식으로 입력해주세요');
        }
    
        // 판매업체명과 판매업체코드가 입력되었는지 확인하고, 입력된 경우 수정 불가로 설정
        if (!customerName || !customerCode || !orderDate) {
            alert('판매업체명과 판매업체코드를 입력해주세요.');
            return;
        }
    
        // 새 항목을 먼저 리스트에 추가
        const newItem = {
            // orderItemId,
            deliveryDate,
            itemName,
            itemCode,
            salesAmount,
            orderItemQuantity,
            customerCode,
            orderDate,
        };
        console.log(orderDate);
    
        setOrderList(prevList => [...prevList, newItem]);  // 상태 업데이트
    
        // 입력 필드 초기화
        setItemName('');
        setDeliveryDate('');
        setItemCode('');
        setSalesAmount('');
        setOrderItemQuantity('');
        setSalesAmountErrors('');
        setOrderItemQuantityErrors('');
        // 판매업체 정보 수정 불가 상태로 변경
        setIsCustomerInfoLocked(true);
        setIsOrderDateLocked(true);
    
    };
    
    // 항목 삭제
    const handleDeleteItem = () => {
        if (selectedIndex === null) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }

        if (window.confirm('삭제하시겠습니까?')) {
            const updatedList = orderList.filter((_, i) => i !== selectedIndex);
            setOrderList(updatedList);
            setSelectedIndex(null); // 선택 초기화
        }
    };

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

    useEffect(() => {
        const fetchSalesPrice = async () => {
            if (!itemCode || !customerCode || !orderDate) {
                return; // 모든 값이 입력되지 않으면 요청하지 않음
            }
            try {
                // 상품코드로 Get 요청을 보내서 판매가 자동으로 가져오는 로직
                let accessToken = window.localStorage.getItem('accessToken');
                const response = await axios.get(process.env.REACT_APP_API_URL + 'sales-prices', {
                    params: {
                        'item-code': itemCode,
                        'customer-code': customerCode,
                        'order-date': orderDate,
                    },
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
               
                setSalesAmount(response.data.data.salesAmount)
    
            } catch (error) {
                console.error('판매가 정보를 가져오는 데 실패했습니다:', error);
                alert('해당 판매업체(또는 상품)와 일치하는 판매가가 존재하지 않습니다.');
            }
        };
    
        fetchSalesPrice();
    }, [itemCode, customerCode, orderDate]);

    // 주문 등록
    const handleSubmit = async () => {
        if (orderList.length === 0) {
            alert('등록할 내용이 없습니다.');
            return;
        }

        if (!customerCode || !orderDate) {
            alert('판매업체코드와 주문일자는 필수 항목입니다.');
            return;
        }

        const parsedOrderDate = new Date(orderDate); // 문자열을 Date 객체로 변환
        if (isNaN(parsedOrderDate)) {
            alert("Order Date Not Correct");
            return;
        }
        
        const requestBody = {
            customerCode,
            orderDate,
            orderItems: orderList.map(item => ({
                // orderItemId: item.orderItemId,
                itemCode: item.itemCode,
                salesAmount: Number(item.salesAmount),
                orderItemQuantity: Number(item.orderItemQuantity),
                requestDate: item.deliveryDate,
                // customerCode: item.customerCode,
                // orderDate: item.orderDate,
            })),
        };

        console.log("전송되는 데이터:", JSON.stringify(requestBody, null, 2));

        try {
            let accessToken = window.localStorage.getItem('accessToken');
            console.log('Access Token');

            // 전체 주문 리스트를 서버에 한 번에 POST 요청
            const response = await axios.post(process.env.REACT_APP_API_URL + 'orders', requestBody, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('서버 응답:', response);
            alert('주문이 등록되었습니다.');

            onClose();  // 모달 닫기
            setOrderList([]);  // 리스트 초기화
            setIsCustomerInfoLocked(false); // 판매업체 정보 수정 가능하게 초기화
        } catch (error) {
            console.error('주문 등록 실패:', error.response ? error.response.data : error.message);
            alert('주문 등록에 실패했습니다.');
        }
    };

    // 클릭하면 선택, 한번 더 누르면 해제
    const handleRowClick = (index) => {
        setSelectedIndex((prevSelectedIndex) => 
            prevSelectedIndex === index ? null : index
        );
    };

    if (!isOpen) return null;
  
    return (
      <div className="om-modal">
        <div className="om-order-modal-content">
            <div className="order-modal-header">
                <div className="modal-title">주문 등록</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="om-modal-input-section">
                <div className="om-input-first-line">
                    <input 
                        type="search" value={customerName} onChange={(e) => setCustomerName(e.target.value)} 
                        placeholder="판매업체명" readOnly disabled={isCustomerInfoLocked} // 판매업체명 비활성화 여부
                    />
                    <input 
                        type="search" value={customerCode} onChange={(e) => setCustomerCode(e.target.value)} 
                        placeholder="판매업체코드" readOnly disabled={isCustomerInfoLocked} // 판매업체코드 비활성화 여부
                    />
                    <button className="order-modal-button" onClick={openCustomerSearch} disabled={isCustomerInfoLocked}>검색</button> 
                </div>
                <div className="od-input-third-line">
                    <input type="search" value={itemName} readOnly onChange={(e) => setItemName(e.target.value)} placeholder="상품명" />
                    <input type="search" value={itemCode} readOnly onChange={(e) => setItemCode(e.target.value)} placeholder="상품코드" />
                    <button className="order-modal-button" onClick={openProductSearch}>검색</button> 
                </div>
                <div className="order-input-second-line">
                    <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} 
                    className="order-date-input-text" placeholder="주문일자" disabled={isOrderDateLocked} 
                        max={new Date().toISOString().split("T")[0]}/>
                    <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} 
                        placeholder="납품요청일자" min={new Date().toISOString().split("T")[0]}/>
                </div>
                <div className="order-input-fourth-line">
                    <input type="text" value={salesAmount} onChange={handleSalesAmountChange} placeholder="판매가" />
                    <input type="text" value={orderItemQuantity} onChange={handleOrderItemQuantityChange} placeholder="수량" />
                </div>
                <div className="order-error-fourth-line">
                    <div className='sales-amount-error'>
                     {salesAmountErrors && <div className="om-error-message">{salesAmountErrors}</div>}
                    </div>
                    <div className='quantity-error'>
                     {orderItemQuantityErrors && <div className="om-error-message">{orderItemQuantityErrors}</div>}
                    </div>
                </div>
                
            </div>
            <div className="om-option-button-container">
                <button className="option-button" onClick={handleDeleteItem}> - 삭제</button>
                <button className="option-button" onClick={handleAddItem}>+ 추가</button>
            </div>
       
            <table className="order-table">
                <thead> 
                    <tr>
                        <th>납품요청일자</th>
                        <th>상품명</th>
                        <th>상품코드명</th>
                        <th>판매가</th>
                        <th>수량</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((item, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)} 
                        className={`order-row ${index === selectedIndex ? 'selected-row' : ''}`}
                    >
                        <td>{item.deliveryDate}</td>
                        <td>{item.itemName}</td>
                        <td>{item.itemCode}</td>
                        <td>{item.salesAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{item.orderItemQuantity}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button className="submit-button" onClick={handleSubmit}>등록</button>
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
  
  export default OrderModal;