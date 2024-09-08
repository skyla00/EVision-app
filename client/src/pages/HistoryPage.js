import React, { useState } from 'react';
import './HistoryPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import DetailSearch from '../component/DetailSearch';
import HistorySearchInfo from '../component/HistorySearchInfo';
import { headers, items } from '../component/MockData';

const HistoryPage = () => {
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

    const [items, setItems] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <DetailSearch title="주문 내역 히스토리" fields={fields}/>
            <HistorySearchInfo title="전체 주문 정보" headers={headers} items={items}/>
        </div>
    )
  };
  
  export default HistoryPage;