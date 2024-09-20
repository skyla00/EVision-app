import React, { useCallback, useState, useEffect } from 'react';
import './OrderPage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import OrderDetailSearch from '../component/Order/OrderDetailSearch';
import OrderSearchInfo from '../component/Order/OrderSearchInfo';
import OrderModal from '../Modal/Order/OrderModal';
import axios from 'axios';

const OrderPage = () => {
    const [orderList, setOrderList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const headers = [
        { value: 'orderHeaderId', label: '주문번호' },
        { value: 'memberName', label: '판매사원' },
        { value: 'orderDate', label: '주문일자' },
        { value: 'requestDate', label: '납품요청일자' },
        { value: 'orderHeaderStatus', label: '주문상태' },
        { value: 'acceptDate', label: '승인일자' },
        { value: 'customerCode', label: '판매업체코드' },
        { value: 'customerName', label: '판매업체명'},
        { value: 'itemCode', label: '상품코드' },
        { value: 'itemName', label: '상품명' },
        { value: 'orderItemQuantity', label: '수량' },
        { value: 'purchaseAmount', label: '매입단가' },
        { value: 'salesAmount', label: '판매단가' },
        { value: 'marginRate', label: '마진률' },
        { value: 'marginAmount', label: '마진금액' },
        { value: 'finalAmount', label: '최종판매금액' },
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let accessToken = window.localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error("Access token is missing");
                    return;
                }
                const response = await axios.get(process.env.REACT_APP_API_URL + 'orders', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                console.log(response.data);
                
                if (response.data && response.data.data) {
                    // 주문 데이터 : orderItems 배열을 펼쳐서 각 항목을 개별적으로 처리
                    const expandedOrders = response.data.data.flatMap(order =>
                        order.orderItems.map(item => ({
                            orderHeaderId: order.orderHeaderId,
                            memberName: order.memberName,
                            orderDate: order.orderDate,
                            orderHeaderStatus: order.orderHeaderStatus,
                            acceptDate: order.acceptDate,
                            customerCode: order.customerCode,
                            customerName: order.customerName,
                            itemCode: item.itemCode,
                            itemName: item.itemName,
                            orderItemQuantity: item.orderItemQuantity,
                            purchaseAmount: item.purchaseAmount,
                            salesAmount: item.salesAmount,
                            marginRate: item.marginRate,
                            marginAmount: item.marginAmount,
                            finalAmount: item.finalAmount,
                            requestDate: item.requestDate
                        }))
                    );
                    setOrderList(expandedOrders); // 펼쳐진 주문 데이터 저장
                    setSearchResults(expandedOrders); // 검색 결과에도 동일하게 저장
                    // setOrderList(response.data.data);
                    // setSearchResults(response.data.data);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching orders:', error.response ? error.response.data : error.message);
            }
        };

        fetchOrders();
    }, []);

    const handleSearch = useCallback((
        orderHeaderId, itemName, itemCode, customerName, customerCode, 
        memberName, orderDate, acceptDate
    ) => {
        let filteredResults = orderList;
    
        // 필터링 로직 추가
        if (orderHeaderId) {
            filteredResults = filteredResults.filter((order) =>
                order.orderHeaderId.toLowerCase().includes(orderHeaderId.toLowerCase())
            );
        }
        if (itemName) {
            filteredResults = filteredResults.filter((order) =>
                order.itemName.toLowerCase().includes(itemName.toLowerCase())
            );
        }
        if (itemCode) {
            filteredResults = filteredResults.filter((order) =>
                order.itemCode.toLowerCase().includes(itemCode.toLowerCase())
            );
        }
        if (customerName) {
            filteredResults = filteredResults.filter((order) =>
                order.customerName.toLowerCase().includes(customerName.toLowerCase())
            );
        }
        if (customerCode) {
            filteredResults = filteredResults.filter((order) =>
                order.customerCode.toLowerCase().includes(customerCode.toLowerCase())
            );
        }
        if (memberName) {
            filteredResults = filteredResults.filter((order) =>
                order.memberName.toLowerCase().includes(memberName.toLowerCase())
            );
        }
        if (orderDate) {
            filteredResults = filteredResults.filter((order) =>
                order.orderDate.includes(orderDate)
            );
        }
        if (acceptDate) {
            filteredResults = filteredResults.filter((order) =>
                order.acceptDate.includes(acceptDate)
            );
        }
    
        // 필터링된 결과를 저장
        setSearchResults(filteredResults);
    }, [orderList]);

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const handleOpenOrderModal = () => {
        setIsOrderModalOpen(true);
    };
    const handleCloseOrderModal = () => setIsOrderModalOpen(false);

    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleOrderPostSuccess = (newOrder) => {
        setOrderList((prevList) => [...prevList, newOrder]);
        setSearchResults((prevResults) => [...prevResults, newOrder]);
        handleCloseOrderModal();
        window.location.reload();
    };
    
    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <OrderDetailSearch title="주문 조회" onSearch={handleSearch} />
            <OrderSearchInfo
                title="주문 정보"
                headers={headers}
                orders={searchResults}
                onSelectOrder={handleSelectOrder}
                selectedOrder={selectedOrder}
                onOpenOrderModal={handleOpenOrderModal}
            />
            <OrderModal
                isOpen={isOrderModalOpen}
                onClose={handleCloseOrderModal}
                onSubmit={handleOrderPostSuccess}
            />
        </div>
    );
  };
  
  export default OrderPage;