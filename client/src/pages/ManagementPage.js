import React, { useCallback, useState, useEffect } from 'react';
import './ManagementPage.css';
import axios from 'axios';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import ManagementOrderDetailSearch from '../component/ManagementOrderDetailSearch'
import ManagementSearchInfo from '../component/ManagementSearchInfo'

const ManagementPage = () => {
    const [managementOrderList, setManagementOrderList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMyOrder, setSelectedMyOrder] = useState(null);

    const headers = [
        { value: 'orderHeaderId', label: '주문번호' },
        { value: 'orderHeaderStatus', label: '주문상태' },
        { value: 'customerName', label: '판매업체명'},
        { value: 'customerCode', label: '판매업체코드' },
        { value: 'memberName', label: '판매사원'},
        { value: 'orderDate', label: '주문일자' },
        { value: 'acceptDate', label: '납품확정일자' },
    ];

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        let accessToken = window.localStorage.getItem('accessToken');
        let storedData = JSON.parse(window.localStorage.getItem('userInfo'));
        let memberId = storedData.data.memberId; 
        try {
            const response = await axios.get(
                process.env.REACT_APP_API_URL + `orders?member-id=${memberId}`, 
                { headers: {
                     Authorization: `${accessToken}`
                }
            });
            
            setManagementOrderList(response.data.data);
            setSearchResults(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = useCallback((orderHeaderId, orderHeaderStatus, customerName, customerCode, memberName, orderDate, acceptDate ) => {
        let filteredResults = managementOrderList;

        if(!orderHeaderId && !orderHeaderStatus && !customerName && !customerCode && !memberName && !orderDate && !acceptDate) {
            setSearchResults(managementOrderList);
            return;
        }

        if (orderHeaderId) {
            filteredResults = filteredResults.filter((order) =>
                order.orderHeaderId.toLowerCase().includes(orderHeaderId.toLowerCase())
            );
        }

        if (orderHeaderStatus) {
            filteredResults = filteredResults.filter((order) =>
                order.orderHeaderStatus.toLowerCase().includes(orderHeaderStatus.toLowerCase())
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
                order.orderDate.toLowerCase().includes(orderDate.toLowerCase())
            );
        }

        if (acceptDate) {
            filteredResults = filteredResults.filter((order) =>
                order.acceptDate.toLowerCase().includes(acceptDate.toLowerCase())
            );
        }
        setSearchResults(fetchMyOrders);

    }, [managementOrderList]);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenMyOrderModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseOrderModal = () => setIsModalOpen(false);

    const handleSelectMyOrder = (order) => {
        setSelectedMyOrder(order);
    };
    const handleOrderPostSuccess = (newOrder) => {
        setManagementOrderList((prevList) => [...prevList, newOrder]);
        setSearchResults((prevResults) => [...prevResults, newOrder]);
        handleCloseOrderModal();
        window.location.reload();
    };

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <ManagementOrderDetailSearch title="주문 관리" list ={managementOrderList} onSearch={handleSearch}/>
            <ManagementSearchInfo
                    title="관리 정보"
                    headers={headers}
                    managementOrders={searchResults}
                    onSelectMyOrder={handleSelectMyOrder}
                    selectedOrder={selectedMyOrder}
                    onOpenOrderModal={handleOpenMyOrderModal}/>
        </div>
    )
  };
  
  export default ManagementPage;