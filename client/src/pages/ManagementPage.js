import React, { useCallback, useState, useEffect } from 'react';
import './ManagementPage.css';
import axios from 'axios';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import ManagementOrderDetailSearch from '../component/Management/ManagementOrderDetailSearch'
import ManagementSearchInfo from '../component/Management/ManagementSearchInfo'
import ManagementDetailModal from '../Modal/Management/ManagementDetailModal'

const ManagementPage = () => {
    const [managementOrderList, setManagementOrderList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    // 주문번호, 판ㅁㅐ사원, 주문일자, 주ㄴ상태, 납품확정일자, 판매업체코드, 판매업체명. 

    const headers = [
        { value: 'orderHeaderId', label: '주문번호' },
        { value: 'memberName', label: '판매사원'},
        { value: 'orderDate', label: '주문일자' },
        { value: 'orderHeaderStatus', label: '주문상태' },
        { value: 'acceptDate', label: '납품확정일자' },
        { value: 'customerCode', label: '판매업체코드' },
        { value: 'customerName', label: '판매업체명'},
    ];

    useEffect(() => {
        const fetchMyOrders = async () => {
            let accessToken = window.localStorage.getItem('accessToken');
            let storedData = JSON.parse(window.localStorage.getItem('userInfo'));
            let memberId = storedData.data.memberId; 
            try {
                const response = await axios.get(
                    process.env.REACT_APP_API_URL + `orders?member-id=${memberId}`, { 
                        headers: {
                         Authorization: `${accessToken}`
                    }
                });
                
                setManagementOrderList(response.data.data);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMyOrders();
    }, []);

    const handleSearch = useCallback((orderHeaderId, orderHeaderStatus, customerName, customerCode, memberName, orderDate, acceptDate ) => {
        let filteredResults = managementOrderList;

        if(!orderHeaderId && !orderHeaderStatus && !customerName && !customerCode 
            && !memberName && !orderDate && !acceptDate) {
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
            filteredResults = filteredResults.filter((order) => {
                const orderAcceptDate = order.acceptDate ? order.acceptDate.toLowerCase() : '';
                return orderAcceptDate.includes(acceptDate.toLowerCase());
            });
        }
        setSearchResults(filteredResults);

    }, [managementOrderList]);

    const [isManagementDetailModalOpen, setIsManagementDetailModalOpen] = useState(false);

    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
    }
    const handleOpenDetailModal = () => {
        if(selectedOrder) {
            setIsManagementDetailModalOpen(true);
        } else {
            alert('상세보 기할 상품을 선택하세요.');
        }
    }
    console.log(handleOpenDetailModal);
    const handleCloseManagementDetailModal = () => setIsManagementDetailModalOpen(false);

    const handleManagementDetailSuccess = (updatedOrder) => {
        const updatedList = managementOrderList.map(order => 
            order.orderHeaderId === updatedOrder.orderHeaderId ? updatedOrder : order
        );
        setManagementOrderList(updatedList);
        setSearchResults(updatedList);
        window.location.reload();
    }


    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <ManagementOrderDetailSearch list ={managementOrderList} onSearch={handleSearch}/>
            <ManagementSearchInfo
                    title="관리 정보"
                    headers={headers}
                    managementOrders={searchResults}
                    onSelectOrder={handleSelectOrder}
                    selectedOrder={selectedOrder}
                    onOpenDetailModal={handleOpenDetailModal}/>
            <ManagementDetailModal
                isOpen = {isManagementDetailModalOpen}
                onClose = {handleCloseManagementDetailModal}
                onSubmit = {handleManagementDetailSuccess}
                order = {selectedOrder} // 선택된 order 전달. 
            />
        </div>
    )
  };
  
  export default ManagementPage;