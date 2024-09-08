import React, { useState } from 'react';
import './CustomerPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import DetailSearch from '../component/DetailSearch';
import SearchInfo from '../component/SearchInfo';
import CustomerPostModal from '../Modal/CustomerPostModal';
import CustomerModifyModal from '../Modal/CustomerModifyModal';
import { headers, items }  from '../component/MockData';

const CustomerPage = () => {
    const fields = [
        { type: 'search', placeholder: '판매업체명' },
        { type: 'search', placeholder: '판매업체 코드' },
        { type: 'search', placeholder: '판매업체 담당자' },
        { type: 'search', placeholder: '판매업체 연락처' },
        { type: 'search', placeholder: '판매업체 이메일' },
        { type: 'search', placeholder: '판매업체 주소' },
    ];

    const [isCustomerPostModalOpen, setIsCustomerPostModalOpen] = useState(false);
    const [isCustomerModifyModalOpen, setIsCustomerModifyModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const handleOpenPostModal = () => {
        setIsCustomerPostModalOpen(true);
    }

    const handleOpenModifyModal = () => {
        setIsCustomerModifyModalOpen(true);
    }

    const handleCloseCustomerPostModal = () => {
        setIsCustomerPostModalOpen(false);
    };
    
    const handleCloseCustomerModifyModal = () => {
        setIsCustomerModifyModalOpen(false);
    };

    const handleSubmitCustomerPostModal = (newOrder) => {
        setItems([...items, newOrder]);
        handleCloseCustomerPostModal();
    };

    const handleSubmitCustomerModifyModal = (newOrder) => {
        setItems([...items, newOrder]);
        handleCloseCustomerModifyModal();
    };

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <DetailSearch title="판매업체 조회" fields={fields}/>
            <SearchInfo title="판매업체 정보" headers={headers} items={items} 
                onOpenPostModal={handleOpenPostModal} 
                onOpenModifyModal={handleOpenModifyModal}/>
            <CustomerPostModal isOpen={isCustomerPostModalOpen}
                onClose={handleCloseCustomerPostModal} onSubmit={handleSubmitCustomerPostModal}/>
            <CustomerModifyModal isOpen={isCustomerModifyModalOpen}
                onClose={handleCloseCustomerModifyModal} onSubmit={handleSubmitCustomerModifyModal}/>
        </div>
    )
  };
  
  export default CustomerPage;