import React, { useState } from 'react';
import './OrderPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import DetailSearch from '../component/DetailSearch';
import OrderSearchInfo from '../component/OrderSearchInfo';
import OrderModal from '../component/Modal/OrderModal';
import { headers, items } from '../component/MockData';

const OrderPage = () => {
    const fields = [
        { type: 'search', placeholder: '주문번호' },
        { type: 'search', placeholder: '상품명' },
        { type: 'search', placeholder: '상품코드' },
        { type: 'search', placeholder: '판매업체' },
        { type: 'search', placeholder: '판매사원' },
        { type: 'select', placeholder: '주문상태' },
        { type: 'date', placeholder: '주문일자' },
        { type: 'date', placeholder: '납품요청일자' },
        { type: 'date', placeholder: '납품확정일자' },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitOrder = (newOrder) => {
        setItems([...items, newOrder]);
        handleCloseModal();
    }

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <DetailSearch title="주문 조회" fields={fields}/>
            <OrderSearchInfo title="주문 정보" headers={headers} items={items} onOpenModal={handleOpenModal}/>
            <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitOrder}/>
        </div>
    )
  };
  
  export default OrderPage;