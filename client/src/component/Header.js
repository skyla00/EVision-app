import './Header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="header">
            <div className='logo-img' onClick={() => navigate('/main')}>
                <img src="/image/mainlogo.png" alt='메인로고'/>
            </div>
            <div className="user-info">
                <div className="user-img">
                    <img src="/image/112.png" alt="프로필"/>
                </div>
                <div className="user-info-detail">
                    <div className="user-info-position">영업4팀 사원{}</div>
                    <div className="user-info-name">박원일{}</div>
                </div>
            <button className="logout">로그아웃</button>
        </div>
    </div>
    );
  };

  export default Header;