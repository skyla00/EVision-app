import React, { Children, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import OrderStatus from '../component/Order/OrderStatus';
import OrderModal from '../Modal/Order/OrderModal';

const NaviContainer = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return(
    <div className="main-page-navicontainer">
      <div className="order-search" onClick={() => navigate('/order')}>
        <span>주문 조회</span>
        <img src="/image/searchgreen.png" alt="주문 조회"/>
      </div>
      <div className="order-post" onClick={handleOpenModal}>
        <span>주문 등록</span>
        <img src="/image/writeicon.png" alt="주문 등록"/>
      </div>
      <div className="product-search" onClick={() => navigate('/product')}>
        <span>상품 조회</span>
        <img src="/image/productlogo.png" alt="상품 조회"/>
      </div>
      <div className="price-search" onClick={() => navigate('/price')}>
        <span>판매가 조회</span>
        <img src="/image/wonlogo.png" alt="판매가 조회"/>
      </div>
      <div className="customer-search" onClick={() => navigate('/customer')}>
        <span>판매 업체 조회</span>
        <img src="/image/companylogo.png" alt="판매 업체 조회"/>
      </div>
      <div className="management-go" onClick={() => navigate('/manage')}>
        <span>관리</span>
        <img src="/image/stampicon.png" alt="판매 업체 조회"/>
      </div>

      {isModalOpen && (
        <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  ); 
}

// 즐겨찾기 로직
const Favorite = (props) => {
  const [favorites, setFavorites] = useState([
    // 더미데이터
    {
      orderNumber: '12852',
      customerCode: 'HMKM2402',
      orderDate: '2024.09.04.',
      deliveryRequestDate: '2024.10.24.',
      orderStatus: props.orderStatus,
      isFavorite: true,
    },
    {
      orderNumber: '12853',
      customerCode: 'HMKM2403',
      orderDate: '2024.09.05.',
      deliveryRequestDate: '2024.10.25.',
      orderStatus: '',
      isFavorite: true,
    },
    {
      orderNumber: '12854',
      customerCode: 'HMKM2404',
      orderDate: '2024.09.06.',
      deliveryRequestDate: '2024.10.26.',
      orderStatus: '',
      isFavorite: true,
    },
  ]);

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index].isFavorite = !newFavorites[index].isFavorite;
      return newFavorites;
    });
  }

  return (
    <div className="favorite-section"> 
      <div className="favorite-title"> 즐겨찾기
        <div className="favorite-img">
          <img src="/image/favorite.png" alt="즐찾"></img>
        </div>
      </div>
      <div className="favorite-content">
        {favorites.map((item, index) => (
          <div key={index} className={`favorite-content-${index + 1}`}>
            <div className="favorite-content-firstline">
              <div className="order-number">주문번호 : {item.isFavorite ? item.orderNumber : ''}</div>
              <div className="customer-code">판매업체코드 : {item.isFavorite ? item.customerCode : ''}</div>
              <div className="order-status"> 주문상태 : 승인 요청
                <OrderStatus status={item.isFavorite ? item.orderStatus : ''} /> 
              </div>
              {/* <div className="order-status" style={{OrderStatus}}> 주문상태 : {props.OrderStatus} </div> */}
              <div className="favorite-icon" onClick={() => toggleFavorite(index)}>
                <img src={item.isFavorite ? "/image/favorite.png" : "/image/favorite-grey.png"}
                alt="즐찾" className="favorite-icon"/>
              </div>
            </div>
            <div className="favorite-content-secondline">
              <div className="order-date">주문일자 : {item.isFavorite ? item.orderDate : ''}</div>
              <div className="delivery-request-date">납품요청일자 : {item.isFavorite ? item.deliveryRequestDate : ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MainPage = () => {
  const orderStatus = '주문요청';

  return (
    <div className="app">
      <Header />
      <SideBar />
      <div className="mainpage-container">
          <NaviContainer />
          <Favorite OrderStatus={orderStatus}/>
      </div>
    </div>
  )
};

export default MainPage;