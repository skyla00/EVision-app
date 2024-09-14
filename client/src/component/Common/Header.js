import './Header.css';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { userInfo, logout, login } = useContext(AuthContext); // login 함수 추가
    const [loading, setLoading] = useState(true);  // 로딩 상태

    // useEffect로 사용자 정보를 가져오는 부분 추가
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                let accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.log('토큰이 없습니다.');
                    return;
                }

                // 멤버 정보를 서버에서 가져옴
                const response = await axios.get(process.env.REACT_APP_API_URL + 'members/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (response.data) {
                    const userInfo = response.data;
                    login(accessToken, userInfo);  // AuthContext에 로그인 상태 및 사용자 정보 저장
                } else {
                    console.log('사용자 정보를 가져오지 못했습니다.');
                }
            } catch (error) {
                console.error('사용자 정보를 가져오는 중 에러 발생:', error);
            } finally {
                setLoading(false);  // 로딩 완료
            }
        };
        if (!userInfo) {  // 기존에 저장된 정보가 없을 때만 서버 호출
            fetchUserInfo();
        } else {
            setLoading(false);
        }
    }, [userInfo, login]);

    const handleLogout = async () => {
        try {
            let accessToken = localStorage.getItem('accessToken');
            await axios.post(process.env.REACT_APP_API_URL + 'logout', null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            logout();  // AuthContext에서 로그아웃 처리
            navigate('/');
        } catch (error) {
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;  // 사용자 정보 로딩 중일 때 표시
    }

    return (
        <div className="header">
            <div className='logo-img' onClick={() => navigate('/main')}>
                <img src="/image/mainlogo.png" alt='메인로고' />
            </div>
            <div className="user-info">
                {userInfo ? (
                    <div className="user-info-detail">
                        <div className="user-info-position">
                            {userInfo.data.department ? `${userInfo.data.department} ${userInfo.data.position}` : '직책 없음'}
                        </div>
                        <div className="user-info-name">
                            {userInfo.data.memberName || '이름 없음'}
                        </div>
                    </div>
                ) : (
                    <div className="user-info-name">로그인하지 않음</div>
                )}
                <button className="logout" onClick={handleLogout}>로그아웃</button>
            </div>
            
        </div>
    );
};

export default Header;