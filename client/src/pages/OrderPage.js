import React, { useCallback, useState, useEffect } from 'react';
import './OrderPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import OrderDetailSearch from '../component/OrderDetailSearch';
import OrderSearchInfo from '../component/OrderSearchInfo';
import OrderModal from '../Modal/OrderModal';
import axios from 'axios';

const OrderPage = () => {
    const [orderList, setOrderList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const headers = [
        { value: 'orderHeaderId', label: '주문번호' },
        { value: 'itemName', label: '상품명' },
        { value: 'itemCode', label: '상품 코드' },
        { value: 'customerName', label: '판매업체명'},
        { value: 'customerCode', label: '판매업체 코드' },
        { value: 'orderHeaderStatus', label: '주문상태' },
        { value: 'memberName', label: '판매사원' },
        { value: 'orderDate', label: '주문일자' },
        { value: 'requestDate', label: '납품요청일자' },
        { value: 'acceptDate', label: '납품확정일자' },
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

                console.log("API Response: ", response.data); // 응답 데이터를 확인
            if (response.data && response.data.data) {
                setOrderList(response.data.data);
                setSearchResults(response.data.data);
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        }
    };

    fetchOrders();
}, []);

    const handleSearch = useCallback(( orderHeaderId, itemName, itemCode, customerName, customerCode, 
        orderHeaderStatus, memberName, orderDate, requestDate, acceptDate ) => {
        let filteredResults = orderList;

        if (!orderHeaderId && !itemName && !itemCode && !customerName && !customerCode &&
            !orderHeaderStatus && !memberName && !orderDate && !requestDate && !acceptDate) {
                setSearchResults(orderList);
                return;
        }

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

        if (orderHeaderStatus) {
            filteredResults = filteredResults.filter((order) =>
                order.orderHeaderStatus.toLowerCase().includes(orderHeaderStatus.toLowerCase())
            );
        }

        if (memberName) {
            filteredResults = filteredResults.filter((order) =>
                order.memberName.toLowerCase().includes(memberName.toLowerCase())
            );
        }
        
        if (orderDate) {
            filteredResults = filteredResults.filter((order) =>
                order.orderDate.toLowerCase().includes(orderDate.toLowerCase())
            );
        }

        if (requestDate) {
            filteredResults = filteredResults.filter((order) =>
                order.requestDate.toLowerCase().includes(requestDate.toLowerCase())
            );
        }

        if (acceptDate) {
            filteredResults = filteredResults.filter((order) =>
                order.acceptDate.toLowerCase().includes(acceptDate.toLowerCase())
            );
        }
        setSearchResults(filteredResults);
    }, [orderList]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseOrderModal = () => setIsModalOpen(false);

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
            <OrderDetailSearch title="판매업체 조회" list={orderList} onSearch={handleSearch}/>
            <OrderSearchInfo 
                title="주문 정보" 
                headers={headers} 
                orders={searchResults}
                onSelectOrder={handleSelectOrder}
                selectedOrder={selectedOrder}
                onOpenModal={handleOpenModal}/>
            <OrderModal 
                isOpen={isModalOpen} 
                onClose={handleCloseOrderModal}
                onSubmit={handleOrderPostSuccess}/>
        </div>
    )
  };
  
  export default OrderPage;