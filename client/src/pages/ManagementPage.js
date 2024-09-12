import React, { useCallback, useState, useEffect } from 'react';
import './ManagementPage.css';
import axios from 'axios';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import MyOrderDetailSearch from './MyOrderDetailSearch'
import DetailView from '../Modal/DetailView';

const ManagementPage = () => {
    const [myOrderList, setMyOrderList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const fields = [
        { type: 'search', placeholder: '주문번호' },
        { type: 'search', placeholder: '판매업체코드' },
        { type: 'search', placeholder: '판매사원' },
        { type: 'date', placeholder: '주문일자' },
        { type: 'date', placeholder: '출고일자' },
        { type: 'select', placeholder: '주문상태' },
        { type: 'date', placeholder: '납품요청일자' },
        { type: 'date', placeholder: '납품확정일자' },
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
            setMyOrderList(response.data.data);
            setSearchResults(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = useCallback((orderHeaderId, orderHeaderStatus, customerName, customerCode, memberName, orderDate, acceptDate ) => {
        let filteredResults = myOrderList;

        if(!orderHeaderId && !orderHeaderStatus && !customerName && !customerCode && !memberName && !orderDate && !acceptDate) {
            setSearchResults(myOrderList);
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

    }, [myOrderList]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    // const [searchResults, setSearchResults] = useState([]);

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <MyOrderDetailSearch title="주문 관리" list ={myOrderList} onSearch={handleSearch}/>
        </div>
    )
  };
  
  export default ManagementPage;