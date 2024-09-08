import React, { useState } from 'react';
import './CustomerPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import DetailSearch from '../component/DetailSearch';
import SearchInfo from '../component/SearchInfo';
import SalePricePostModal from '../component/Modal/SalePricePostModal';
import SalePriceModifyModal from '../component/Modal/SalePriceModifyModal';
import { headers, items }  from '../component/MockData';

const SalePricePage = () => {
    const fields = [
        { type: 'search', placeholder: '상품 코드' },
        { type: 'search', placeholder: '판매업체 코드' },
        { type: 'search', placeholder: '판매 단가' },
        { type: 'date', placeholder: '판매가 기준일' },
        { type: 'date', placeholder: '판매가 기준 만료일' },
    ];

    const [isSalePricePostModalOpen, setIsSalePricePostModalOpen] = useState(false);
    const [isSalePriceModifyModalOpen, setIsSalePriceModifyModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const handleOpenPostModal = () => {
        setIsSalePricePostModalOpen(true);
    };

    const handleOpenModifyModal = () => {
        setIsSalePriceModifyModalOpen(true);
    };

    const handleCloseSalePricePostModal = () => {
        setIsSalePricePostModalOpen(false);
    };

    const handleCloseSalePriceModifyModal = () => {
        setIsSalePriceModifyModalOpen(false);
    };

    const handleSubmitSalePricePostModal = (newOrder) => {
        setItems([...items, newOrder]);
        handleCloseSalePricePostModal();
    };

    const handleSubmitSalePriceModifyModal = (newOrder) => {
        setItems([...items, newOrder]);
        handleCloseSalePriceModifyModal();
    };

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <DetailSearch title="판매가 조회" fields={fields}/>
            <SearchInfo 
                title="판매가 정보" headers={headers} items={items} 
                onOpenPostModal={handleOpenPostModal}
                onOpenModifyModal={handleOpenModifyModal} />
            <SalePricePostModal isOpen={isSalePricePostModalOpen} 
                onClose={handleCloseSalePricePostModal} onSubmit={handleSubmitSalePricePostModal}/>
            <SalePriceModifyModal isOpen={isSalePriceModifyModalOpen} 
                onClose={handleCloseSalePriceModifyModal} onSubmit={handleSubmitSalePriceModifyModal}/>
        </div>
    )
  };
  
  export default SalePricePage; 