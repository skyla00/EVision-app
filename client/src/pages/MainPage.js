import React, {useRef} from 'react';
import './MainPage.css';
import Header from '../component/Header.js';
import SideBar from '../component/SideBar.js';

const NaviContainer = () => {
  return(
    <div className="main-page-navicontainer">
      <div className="order-search">
        <img src="/image/searchicon.png" alt="주문 조회"/>
      </div>
      <div className="order-post">
        <img src="/image/writeicon.png" alt="주문 등록"/>
      </div>
      <div className="product-search">
        <img src="/image/producticon.png" alt="상품 조회"/>
      </div>
      <div className="price-search">
        <img src="/image/wonlogo.png" alt="판매가 조회"/>
      </div>
      <div className="customer-search">
        <img src="/image/companylogo.png" alt="판매 업체 조회"/>
      </div>
      <div className="management-go">
        <img src="/image/companylogo.png" alt="판매 업체 조회"/>
      </div>
    </div>
  );
}

const Favorite = () => {
  return (
    <div>
      <div className="favorite-title"> 즐겨찾기
        <div className="favorite-img">
          <img src="/image/favorite.png" alt="즐찾"></img>
        </div>
      </div>
      <div className="favorite-section">
        <div className="favorite-section-1"></div>
      </div>
    </div>
  );
}

const MainPage = () => {
  return (
    <div className="app">
      <Header />
      <SideBar />
      {/* <NaviContainer />
      <Favorite /> */}
    </div>
  )
};

export default MainPage;