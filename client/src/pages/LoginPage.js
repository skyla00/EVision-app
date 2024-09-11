import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      //로그인 요청 보내기
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'login',
        {
          username: id,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      //헤더에서 토큰 가져오기
      let token = response.headers['authorization'];
      if (!token) {
        token = response.data.token;
      }

      if (token) {
        //로그인 후 /member/me로 사용자 정보 요청
        const memberResponse = await axios.get(
          process.env.REACT_APP_API_URL + 'members/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (memberResponse && memberResponse.data) {
          const userInfo = memberResponse.data; // 받아온 사용자 정보
          localStorage.setItem('accessToken', token); // 토큰 저장
          login(token, userInfo); // AuthContext에 로그인 상태 저장
          navigate('/main'); // 메인 페이지로 이동
        }
      } else {
        console.log('토큰을 찾을 수 없습니다.');
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.log('에러 발생:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="login-page-container">
      <img src="/image/loginback.jpeg" alt="Background" />
      <div className="login-page-overlay">
        <div className="login-page-wrap">
          <div className="login-logo-container-back"></div>
          <div className="login-logo-container">
            <div className="login-logo">
              <img src="/image/login-logo.png" alt="Logo" />
            </div>
          </div>
          <div className="login-box">
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              className="input-field"
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
