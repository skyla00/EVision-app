import React, { useState } from 'react';
import './ManagementPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import DetailSearch from '../component/DetailSearch';
import ManagementSearchInfo from '../component/ManagementSearchInfo';
import DetailView from '../Modal/DetailView';

const ManagementPage = () => {
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    // const [searchResults, setSearchResults] = useState([]);

    const handleRowSelect = (item, index) => {
        setSelectedItem(item);
        setSelectedIndex(index);
    };

    const handleOpenModal = () => {
        if (selectedItem) {
            setIsModalOpen(true);
        } else {
            alert('항목을 선택해주세요.');
        }
    };
    
    const handleCloseModal = () => {
        setSelectedItem(null);
        setSelectedIndex(null);
        setIsModalOpen(false);
    };

    const handleSubmitOrder = (newOrder) => {
        handleCloseModal();
    }

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <DetailSearch title="주문 관리" fields={fields}/>
            {/* <ManagementSearchInfo title=" 주문 정보" headers={headers} items={items}  */}
                onRowSelect={handleRowSelect} onOpenModal={handleOpenModal} selectedIndex={selectedIndex}/>
            <DetailView isOpen={isModalOpen} onClose={handleCloseModal} 
                onSubmit={handleSubmitOrder} selectedItem={selectedItem}/>
        </div>
    )
  };
  
  export default ManagementPage;