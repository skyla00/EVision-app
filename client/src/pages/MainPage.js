import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import OrderStatus from '../component/OrderStatus';
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
const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  // 로컬 스토리지에서 즐겨찾기 불러오기
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteOrders');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (index) => {
    const updatedFavorites = [...favorites];

    if (!updatedFavorites[index]) {
      return;
   }

    // 선택한 즐겨찾기 항목을 제거
    updatedFavorites[index] = null;

    // 상태 및 로컬 스토리지 업데이트
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteOrders', JSON.stringify(updatedFavorites));
  };

  // 즐겨찾기를 데이터가 있는 항목이 위로, 빈 항목(null)이 아래로 정렬
  const sortedFavorites = [...favorites].filter(fav => fav !== null).concat(
    Array(3 - favorites.filter(fav => fav !== null).length).fill(null)
  );

  return (
    <div className="favorite-section"> 
      <div className="favorite-title">
        즐겨찾기
        <div className="favorite-img">
          <img src="/image/favorite.png" alt="즐겨찾기 아이콘" />
        </div>
      </div>
      <div className="favorite-content">
        {sortedFavorites.map((item, slotIndex) => {
          if (!item) {
            // 빈 슬롯
            return (
              <div key={slotIndex} className={`favorite-content-${slotIndex + 1}`}>
                <div className="favorite-content-firstline">
                  <div className="order-number">주문번호 : </div>
                  <div className="customer-code">판매업체코드 : </div>
                  <div className="order-status">주문상태 : </div>
                  <div className="favorite-icon" onClick={() => toggleFavorite(slotIndex)}>
                    <img
                      src="/image/favorite-grey.png"
                      alt="즐찾"
                      className="favorite-icon"
                    />
                  </div>
                </div>
                <div className="favorite-content-secondline">
                  <div className="order-date">주문일자 : </div>
                  <div className="delivery-request-date">납품확정일자 : </div>
                </div>
              </div>
            );
          }

          // 데이터가 있는 즐겨찾기 항목
          return (
            <div key={slotIndex} className={`favorite-content-${slotIndex + 1}`}>
              <div className="favorite-content-firstline">
                <div className="order-number">주문번호 : {item.orderHeaderId}</div>
                <div className="customer-code">판매업체코드 : {item.customerCode}</div>
                <div className="order-status">
                  주문상태 :
                  <OrderStatus status={item.orderStatus || item.orderHeaderStatus} />
                </div>
                <div className="favorite-icon" onClick={() => toggleFavorite(slotIndex)}>
                  <img
                    src={item ? "/image/favorite.png" : "/image/favorite-grey.png"}
                    alt="즐찾"
                    className="favorite-icon"
                  />
                </div>
              </div>
              <div className="favorite-content-secondline">
                <div className="order-date">주문일자 : {item.orderDate}</div>
                <div className="delivery-request-date">납품확정일자 : {item.acceptDate}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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