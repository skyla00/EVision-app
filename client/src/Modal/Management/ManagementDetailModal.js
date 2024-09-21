import React, { useState, useEffect, useContext } from 'react';
import './ManagementDetailModal.css';
import axios from 'axios';
import ProductSearch from '../Product/ProductSearch';
import { AuthContext } from '../../auth/AuthContext';

const ManagementDetailModal = ({ isOpen, onClose, onSubmit, order = {} }) => {
    const { userInfo } = useContext(AuthContext);
    const [orderDate, setOrderDate] = useState('');
    const [orderHeaderStatus, setOrderHeaderStatus] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [salesAmount, setSalesAmount] = useState('');
    const [orderItemQuantity, setOrderItemQuantity] = useState('');
    const [finalAmount, setFinalAmount] = useState('');
    const [requestDate, setRequestDate] = useState('');
    const [orderItemList, setOrderItemList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);

    //초기 상태 위한 변수
    const [startorderHeaderStatus, setStartorderHeaderStatus] = useState('');

    // 수량이나 판매가가 변경될 때마다 최종 금액 업데이트
    useEffect(() => {
        const calculateFinalAmount = () => {
            const quantity = Number(orderItemQuantity);
            const amount = Number(salesAmount);
            setFinalAmount(quantity * amount);
        };
        calculateFinalAmount();
    }, [orderItemQuantity, salesAmount]);

    // orderHeader에 있는 정보인 orderDate, orderHeaderStatus를 담음
    useEffect(() => {
        if (isOpen && order) {
            setOrderDate(order.orderDate || '');
            setOrderHeaderStatus(order.orderHeaderStatus || '');
            setStartorderHeaderStatus (order.orderHeaderStatus);
            setItemName('');
            setItemCode('');
            setSalesAmount('');
            setOrderItemQuantity('');
            setFinalAmount('');
            setRequestDate('');
            setOrderItemList(order.orderItems || []);
        }
    }, [isOpen, order, order.orderHeaderStatus]);

    const handleSubmit = async () => {
        if (orderItemList.length === 0) {
            alert('등록할 내용이 없습니다.');
            return;
        }

        const requestBody = {
            orderDate,
            orderHeaderStatus,
            orderItems: orderItemList.map(item => ({
                itemCode: item.itemCode,
                salesAmount: Number(item.salesAmount),
                orderItemQuantity: Number(item.orderItemQuantity),
                requestDate: item.requestDate,
            })),
        };

        try {
            let accessToken = window.localStorage.getItem('accessToken');
            let orderHeaderId = order.orderHeaderId;

            const response = await axios.patch(
                process.env.REACT_APP_API_URL + 'orders' + `/${orderHeaderId}`,
                requestBody,
                {
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('서버 응답:', response);
            alert('주문이 등록되었습니다.');
            onClose(); // 모달 닫기
            window.location.reload();    
        } catch (error) {
            if (error.response) {
                const { status, message } = error.response.data;

                // 상태 코드와 메시지에 따라 다른 메시지 표시
                if (status === 404 && message === 'Order Status Already Accept') {
                    alert('승인 상태인 주문은 수정할 수 없습니다.');
                } else {
                    alert(`에러 발생: ${message}`);
                }
            } else {
                console.error('주문 등록 실패:', error.message);
                alert('주문 등록에 실패했습니다.');
            }
        }
    };

    const handleDeleteItem = () => {
        if (selectedIndex === null) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }

        if (window.confirm('삭제하시겠습니까?')) {
            const updatedList = orderItemList.filter((_, i) => i !== selectedIndex);
            setOrderItemList(updatedList);
            setSelectedIndex(null); // 선택 초기화
        }
    };

    const handleModifyItem = () => {
        if (selectedIndex === null) {
            alert('수정할 항목을 선택해주세요.');
            return;
        }

        // 1. 납품 요청일자가 주문 날짜보다 이전인지 확인
        if (new Date(requestDate) < new Date(orderDate)) {
            alert('주문일자 이전 날짜로는 변경할 수 없습니다.');
            return;
        }

        // 2. 수정된 내용이 있는지 확인
        const selectedOrderItem = orderItemList[selectedIndex];
        if (
            selectedOrderItem.itemName === itemName &&
            selectedOrderItem.itemCode === itemCode &&
            selectedOrderItem.salesAmount === salesAmount &&
            selectedOrderItem.orderItemQuantity === orderItemQuantity &&
            selectedOrderItem.finalAmount === finalAmount &&
            selectedOrderItem.requestDate === requestDate
        ) {
            alert('수정된 내용이 없습니다.');
            return;
        }

        // 수정된 내용이 있을 때만 업데이트 진행
        const updatedList = orderItemList.map((item, index) =>
            index === selectedIndex
                ? {
                      ...item,
                      itemName: itemName,
                      itemCode: itemCode,
                      salesAmount: salesAmount,
                      orderItemQuantity: orderItemQuantity,
                      finalAmount: finalAmount,
                      requestDate: requestDate,
                  }
                : item
        );

        setOrderItemList(updatedList);
        setSelectedIndex(null); // 선택 초기화
        alert('아이템이 수정되었습니다.');
    };

    const openProductSearch = () => setIsProductSearchOpen(true);
    const closeProductSearch = () => setIsProductSearchOpen(false);

    const handleProductSelect = (product) => {
        setItemCode(product.itemCode);
        setItemName(product.itemName);
        closeProductSearch();
    };

    // item 누르면 선택 또는 선택 해제
    const handleRowClick = (index) => {
        if (selectedIndex === index) {
            // 이미 선택된 항목을 다시 클릭하면 선택 해제
            setSelectedIndex(null);
            setItemName('');
            setItemCode('');
            setSalesAmount('');
            setOrderItemQuantity('');
            setFinalAmount('');
            setRequestDate('');
        } else {
            // 선택한 항목으로 설정
            const selectedOrderItem = orderItemList[index];
            setSelectedIndex(index);
            setItemName(selectedOrderItem.itemName);
            setItemCode(selectedOrderItem.itemCode);
            setSalesAmount(selectedOrderItem.salesAmount);
            setOrderItemQuantity(selectedOrderItem.orderItemQuantity);
            setFinalAmount(selectedOrderItem.finalAmount);
            setRequestDate(selectedOrderItem.requestDate);
        }
    };

    const renderOrderStatusOptions = () => {
        if(startorderHeaderStatus === 'WAITING' || startorderHeaderStatus === 'REQUEST' || startorderHeaderStatus === 'ACCEPT'){
            if (userInfo.data.position === '팀장') {
                return (
                    <>
                        <option value="WAITING">임시저장</option>
                        <option value="REQUEST">승인요청</option>
                        <option value="ACCEPT">승인</option>
                        <option value="DENY">반려</option>
                    </>
                );
            } else {
                return (
                    <>
                        <option value="WAITING">임시저장</option>
                        <option value="REQUEST">승인요청</option>
                    </>
                );
            }
        }
        else if(startorderHeaderStatus === 'DENY'){
            if (userInfo.data.position === '팀장') {
                return (
                    <>
                        <option value="WAITING">임시저장</option>
                        <option value="DENY">반려</option>
                    </>
                );
            } else {
                return (
                    <>
                        <option value="WAITING">임시저장</option>
                        <option value="REQUEST">승인요청</option>
                    </>
                );
            }
        }
    };

    return (
        <div className="md-modal">
            <div className="md-order-modal-content">
                <div className="md-order-modal-header">
                    <div className="md-modal-title">주문 상세</div>
                    <div className="md-modal-close" onClick={onClose}>&times;</div>
                </div>

                <div className="md-modal-input-section">
                    <div className="md-input-first-line">
                        <input
                            type="date"
                            value={orderDate}
                            readOnly
                            placeholder="주문일자"
                        />
                        {startorderHeaderStatus !== "ACCEPT" ?
                            <select
                                placeholder="주문상태"
                                value={orderHeaderStatus}
                                onChange={(e) => setOrderHeaderStatus(e.target.value)}
                            >
                                <option value="" disabled hidden>주문상태</option>
                                {renderOrderStatusOptions()}
                            </select> :
                            <select
                                disabled
                                placeholder="주문상태"
                                value={orderHeaderStatus}
                                onChange={(e) => setOrderHeaderStatus(e.target.value)}
                            >
                                <option value="" disabled hidden>주문상태</option>
                                {renderOrderStatusOptions()}
                            </select>
                        }
                    </div>
                    {orderHeaderStatus === "WAITING" ? <>
                        <div className="md-input-third-line">
                            <input
                                type="number"
                                value={salesAmount}
                                onChange={(e) => setSalesAmount(e.target.value)}
                                placeholder="판매가(원)"
                            />
                            <input
                                type="number"
                                value={orderItemQuantity}
                                onChange={(e) => setOrderItemQuantity(e.target.value)}
                                placeholder="수량"
                            />
                        </div>

                        <div className="md-input-second-line">
                            <input
                                type="search"
                                value={itemName}
                                readOnly
                                placeholder="상품명"
                            />
                            <input
                                type="search"
                                value={itemCode}
                                readOnly
                                placeholder="상품코드"
                            />
                            <button className="order-modal-button" onClick={openProductSearch}>검색</button>
                        </div>
                        <div className="md-input-fourth-line">
                            <input
                                type="text"
                                value={finalAmount}
                                onChange={(e) => setFinalAmount(e.target.value)}
                                placeholder="최종금액"
                                readOnly
                            />
                            <input
                                type="date"
                                value={requestDate}
                                onChange={(e) => setRequestDate(e.target.value)}
                                placeholder="납품요청일자"
                            />
                        </div>
                        
                    </> :                 <div>주문 총 금액 : {orderItemList.reduce((acc, orderItem) => {
                return acc + (orderItem.salesAmount * orderItem.orderItemQuantity);
                    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>}
                </div>
                {orderHeaderStatus !== "WAITING" ? <></> :

                            <div className="md-option-button-container"><div>주문 총 금액 : {orderItemList.reduce((acc, orderItem) => {
                return acc + (orderItem.salesAmount * orderItem.orderItemQuantity);
                    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                            <button className="md-option-button" onClick={handleDeleteItem}>- 삭제</button>
                            <button className="md-option-button" onClick={handleModifyItem}>+ 수정</button>
                        </div>}
                <table className={orderHeaderStatus !== "WAITING" ? "order-table_big" : "order-table"}>
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
                        {orderItemList.map((orderItem, index) => (
                            <tr
                                key={index}
                                onClick={() => {
                                    if (orderHeaderStatus === "WAITING") {
                                        handleRowClick(index)
                                    }
                                }
                                }
                                className={`order-row ${index === selectedIndex ? 'selected-row' : ''}`}
                            >
                                <td>{orderItem.requestDate}</td>
                                <td>{orderItem.itemName}</td>
                                <td>{orderItem.itemCode}</td>
                                <td>{orderItem.salesAmount}</td>
                                <td>{orderItem.orderItemQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="submit-button" onClick={handleSubmit}>등록</button>
            </div>
            {isProductSearchOpen && (
                <ProductSearch onProductSelect={handleProductSelect} onClose={closeProductSearch} />
            )}
        </div>
    );
};

export default ManagementDetailModal;
