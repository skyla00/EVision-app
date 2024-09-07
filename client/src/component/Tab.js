import './Tab.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tab = () => {
    const navigate = useNavigate();
    return (
        <div className="tab-section">
            <div className="order-tab" onClick={() => navigate('/order')}> 주문 조회 
                <img src="/image/go.png" alt='메인로고'/>
            </div>
            <div className="product-tab" onClick={() => navigate('/main')}> 상품 조회 
                <img src="/image/go.png" alt='메인로고'/>
            </div>
            <div className="customer-tab" onClick={() => navigate('/main')}> 판매 업체 조회 
                <img src="/image/go.png" alt='메인로고'/>
            </div>
            <div className="price-tab" onClick={() => navigate('/main')}> 판매가 조회 
                <img src="/image/go.png" alt='메인로고'/>
            </div>
            <div className="history-tab" onClick={() => navigate('/main')}> 거래 히스토리 조회 
                <img src="/image/go.png" alt='메인로고'/>
            </div>
        </div>
    );
  };

  export default Tab;