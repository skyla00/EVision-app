import './Tab.css';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Tab = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="tab-section">
            <div 
                className={`order-tab ${location.pathname === '/order' ? 'active' : ''}`} 
                onClick={() => navigate('/order')}> 주문 조회 <img src="/image/go.png" alt='메인로고'/>
            </div>
            <div 
                className={`product-tab ${location.pathname === '/product' ? 'active' : ''}`} 
                onClick={() => navigate('/product')}> 상품 조회 <img src="/image/go.png" alt='메인로고'/>
            </div>
            <div 
                className={`customer-tab ${location.pathname === '/customer' ? 'active' : ''}`} 
                onClick={() => navigate('/customer')}> 판매 업체 조회 <img src="/image/go.png" alt='메인로고'/>
            </div>
            <div 
                className={`price-tab ${location.pathname === '/price' ? 'active' : ''}`} 
                onClick={() => navigate('/price')}> 판매가 조회 <img src="/image/go.png" alt='메인로고'/>
            </div>
            <div 
                className={`history-tab ${location.pathname === '/history' ? 'active' : ''}`} 
                onClick={() => navigate('/history')}> 거래 히스토리 조회 <img src="/image/go.png" alt='메인로고'/>
            </div>
        </div>
    );
  };

  export default Tab;