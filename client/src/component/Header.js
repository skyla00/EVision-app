import './Header.css';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { userInfo, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            //서버에 로그아웃 요청 보내기
            await axios.post(process.env.REACT_APP_API_URL + 'logout', null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            //로그아웃 처리: 토큰과 사용자 정보 삭제
            logout();
            navigate('/');
        } catch (error) {
            console.log('로그아웃 실패:', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="header">
            <div className='logo-img' onClick={() => navigate('/main')}>
                <img src="/image/mainlogo.png" alt='메인로고'/>
            </div>
            <div className="user-info">
                <div className="user-info-detail">
                    <div className="user-info-position">
                        {userInfo.data.department ? `${userInfo.data.department} ${userInfo.data.position}` : '직책 없음'}
                    </div>
                    <div className="user-info-name">
                        {userInfo.data.memberName || '이름 없음'}
                    </div>
                </div>
                <button className="logout" onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default Header;
