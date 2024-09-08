import React, { useState, useEffect } from 'react';
import './DetailView.css';

const DetailView = ({ isOpen, onClose, onSearch, selectedItem }) => {

    const [orderDate] = useState(new Date().toISOString().split('T')[0]); // 오늘 날짜
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [orderList, setOrderList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [status, setStatus] = useState('');

    // 판매업체명과 판매업체코드 상태
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [isCustomerInfoLocked, setIsCustomerInfoLocked] = useState(false); // 판매업체명과 판매업체코드 비활성화 여부

    useEffect(() => {
        if (selectedItem) {
            setCustomerName(selectedItem.customerName);
            setCustomerCode(selectedItem.customerCode);
            setItemName(selectedItem.itemName);
            setItemCode(selectedItem.itemCode);
            setPrice(selectedItem.price);
            setQuantity(selectedItem.quantity);
            setDeliveryDate(selectedItem.deliveryDate);
            setIsCustomerInfoLocked(true); 
        }
    }, [selectedItem]);

    // 항목 추가
    const handleAddItem = () => {
        const newItem = {
            orderDate,
            deliveryDate,
            itemName,
            itemCode,
            price,
            quantity,
            customerName,
            customerCode,
            status,
        };

        // 입력값이 모두 있는지 확인하는 창
        if (!itemName || !itemCode || !price || !quantity) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        // 판매업체명과 판매업체코드가 입력되었는지 확인하고, 입력된 경우 수정 불가로 설정
        if (!customerName || !customerCode) {
            alert('판매업체명과 판매업체코드를 입력해주세요.');
            return;
        }

        // 선택한 항목을 수정하거나 새로 추가
        if (selectedIndex !== null) {
            const updatedList = [...orderList];
            updatedList[selectedIndex] = newItem;
            setOrderList(updatedList);
        } else {
            setOrderList([...orderList, newItem]);
        }

        setIsCustomerInfoLocked(true); // 판매업체 정보 수정 불가 상태로 변경

        // 입력 필드 초기화
        setItemName('');
        setItemCode('');
        setPrice('');
        setStatus('');
        setQuantity('');
        setDeliveryDate('');
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

        const updatedList = orderList.filter((_, i) => i !== selectedIndex);
        setOrderList(updatedList);
        setSelectedIndex(null)
    };

    // 주문 등록
    const handleSubmit = () => {
         if (orderList.length === 0) {
            alert('등록할 내용이 없습니다.');;
            return;
         }


        // 등록 처리
        console.log('등록된 항목: ', orderList);
        alert('주문이 등록되었습니다.');

        onClose();
        setOrderList([]);
        setIsCustomerInfoLocked(false); // 등록 후에 판매업체 정보 수정 가능하게 초기화
    };

    const handleRowClick = (index) => {
        const selectedItem = orderList[index];
        setSelectedIndex(index);
        setItemName(selectedItem.itemName);
        setItemCode(selectedItem.itemCode);
        setPrice(selectedItem.price);
        setQuantity(selectedItem.quantity);
        setDeliveryDate(selectedItem.deliveryDate);

    };

    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="order-modal-content">
            <div className="order-modal-header">
                <div className="modal-title">주문 등록</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="modal-input-section">
                <div className="input-first-line">
                <input type="date" value={orderDate} readOnly className="order-date-input-text" placeholder="주문일자"/>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="" disabled hidden>주문상태</option>
                        <option value="승인요청">승인요청</option>
                        <option value="승인">승인</option>
                        <option value="반려">반려</option>
                        <option value="임시저장">임시저장</option>
                    </select>
                </div>
                <hr className="line"/>
                <div className="input-second-line">
                    <input type="search" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="상품명" />
                    <input type="search" value={itemCode} onChange={(e) => setItemCode(e.target.value)} placeholder="상품코드" />
                </div>
                <div className="input-third-line">
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="판매가 (원)" />
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="수량 (개)" />
                </div>
                <div className="input-fourth-line">
                    <input type="text" value={price} readOnly onChange={(e) => setPrice(e.target.value)} placeholder="최종금액 (원)" />
                    <input type="datetime-local" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} placeholder="납품요청일자"/>
                </div>
            </div>
            <div className="option-button-container">
                <button className="option-button" onClick={handleDeleteItem}> - 삭제</button>
                <button className="option-button" onClick={handleAddItem}>+ 수정</button>
            </div>
       
            <table className="order-table">
                <thead>
                    <tr>
                        <th>납품요청일자</th>
                        <th>상품명</th>
                        <th>상품코드명</th>
                        <th>판매가 (원)</th>
                        <th>수량 (개)</th>
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
                        <td>{item.price}</td>
                        <td>{item.quantity} 개</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button className="submit-button" onClick={handleSubmit}>등록</button>
        </div>
      </div>
  );
};
  
  export default DetailView;