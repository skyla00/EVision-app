import React, { useState } from 'react';
import './ProductPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import DetailSearch from '../component/DetailSearch';
import SearchInfo from '../component/SearchInfo';
import ProductPostModal from '../component/Modal/ProductPostModal';
import ProductModifyModal from '../component/Modal/ProductModifyModal';
import { headers, items }  from '../component/MockData';

const ProductPage = () => {
    const fields = [
        { type: 'search', placeholder: '상품명' },
        { type: 'search', placeholder: '상품코드' },
    ];

    const [isProductPostModalOpen, setIsProductPostModalOpen] = useState(false);
    const [isProductModifyModalOpen, setIsProductModifyModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    const handleOpenPostModal = () => {
        setIsProductPostModalOpen(true);
    }

    const handleOpenModifyModal = () => {
        setIsProductModifyModalOpen(true);
    }
    
    const handleCloseProductPostModal = () => {
        setIsProductPostModalOpen(false);
    };

    const handleCloseProductModifyModal = () => {
        setIsProductModifyModalOpen(false);
    };

    const handleSubmitProductPostModal = (newOrder) => {
        setItems([...items, newOrder]);
        handleCloseProductPostModal();
    }

    const handleSubmitProductModifyModal = (newOrder) => {
        setItems([...items, newOrder]);
        handleCloseProductModifyModal();
    }

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <DetailSearch title="상품 조회" fields={fields}/>
            <SearchInfo title="상품 정보" headers={headers} items={items} 
            onOpenPostModal={handleOpenPostModal}
            onOpenModifyModal={handleOpenModifyModal}/>
            <ProductPostModal isOpen={isProductPostModalOpen} 
            onClose={handleCloseProductPostModal} onSubmit={handleSubmitProductPostModal}/>
            <ProductModifyModal isOpen={isProductModifyModalOpen} 
            onClose={handleCloseProductModifyModal} onSubmit={handleSubmitProductModifyModal}/>
        </div>
    )
  };
  
  export default ProductPage; 