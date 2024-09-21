import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import OrderStatus from '../component/OrderStatus';
import OrderModal from '../Modal/Order/OrderModal';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';  // AuthContext 추가

const NaviContainer = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-page-navicontainer">
      <div className="order-search" onClick={() => navigate('/order')}>
        <span>주문 조회</span>
        <img src="/image/searchgreen.png" alt="주문 조회" />
      </div>
      <div className="order-post" onClick={handleOpenModal}>
        <span>주문 등록</span>
        <img src="/image/writeicon.png" alt="주문 등록" />
      </div>
      <div className="product-search" onClick={() => navigate('/product')}>
        <span>상품 조회</span>
        <img src="/image/productlogo.png" alt="상품 조회" />
      </div>
      <div className="customer-search" onClick={() => navigate('/customer')}>
        <span>판매 업체 조회</span>
        <img src="/image/companylogo.png" alt="판매 업체 조회" />
      </div>
      <div className="price-search" onClick={() => navigate('/price')}>
        <span>판매가 조회</span>
        <img src="/image/wonlogo.png" alt="판매가 조회" />
      </div>
      <div className="management-go" onClick={() => navigate('/manage')}>
        <span>관리</span>
        <img src="/image/stampicon.png" alt="관리" />
      </div>

      {isModalOpen && <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

// 즐겨찾기 로직
const Favorite = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);  // AuthContext에서 userInfo와 setUserInfo 사용
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(userInfo?.data?.favorites || []);
  }, [userInfo]);

  const toggleFavorite = async (orderHeaderId) => {
    const isFavorite = favorites.some(fav => fav.orderHeaderId === orderHeaderId);

    try {
      // 즐겨찾기 추가/해제 API 호출
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}orders/favorite?order-header-id=${orderHeaderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200) {
        const updatedFavorites = isFavorite
          ? favorites.filter(fav => fav.orderHeaderId !== orderHeaderId)  // 즐겨찾기 해제
          : [...favorites, { orderHeaderId }];  // 즐겨찾기 추가

        setFavorites(updatedFavorites);

        // userInfo 업데이트 및 로컬스토리지 저장
        const updatedUserInfo = { ...userInfo, data: { ...userInfo.data, favorites: updatedFavorites } };
        setUserInfo(updatedUserInfo);
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      }
    } catch (error) {
      console.error("즐겨찾기 요청 중 오류 발생:", error);
    }
  };

  // 3개의 슬롯을 유지, 빈 슬롯(null)이 아래로 정렬
  const sortedFavorites = [...favorites, ...Array(3 - favorites.length).fill(null)];

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
                  <div className="favorite-icon">
                    <img
                      src="/image/favorite-grey.png"
                      alt="빈 슬롯"
                      className="favorite-icon"
                    />
                  </div>
                </div>
                <div className="favorite-content-secondline">
                  <div className="order-date">주문일자 : </div>
                  <div className="delivery-request-date">승인일자 : </div>
                </div>
              </div>
            );
          }

          // 데이터가 있는 즐겨찾기 항목
          return (
            <div key={slotIndex} className={`favorite-content-${slotIndex + 1}`}>
              <div className="favorite-content-firstline">
                <div className="order-number">주문번호 : {item.orderHeaderId}</div>
                <div className="customer-code">판매업체코드 : {item.customerCode || 'N/A'}</div>
                <div className="order-status">
                  주문상태 : <OrderStatus status={item.orderStatus || item.orderHeaderStatus} />
                </div>
                <div className="favorite-icon" onClick={() => toggleFavorite(item.orderHeaderId)}>
                  <img
                    src={item ? "/image/favorite.png" : "/image/favorite-grey.png"}
                    alt="즐겨찾기 해제"
                    className="favorite-icon"
                  />
                </div>
              </div>
              <div className="favorite-content-secondline">
                <div className="order-date">주문일자 : {item.orderDate || 'N/A'}</div>
                <div className="delivery-request-date">승인일자 : {item.acceptDate || '미확인'}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MainPage = () => {
  return (
    <div className="app">
      <Header />
      <SideBar />
      <div className="mainpage-container">
        <NaviContainer />
        <Favorite />
      </div>
    </div>
  );
};

export default MainPage;
