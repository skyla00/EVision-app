import React, {useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const accessToken = "";

    const navigate = useNavigate();

    const handleLogin = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8080/login',
          {
              username : id,
              password : password
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        //alert(response.headers.get("Authorization"));
        if(response !== undefined)
        {
          localStorage.setItem('accessToken', response.headers.get("Authorization"));
          navigate('/main');
        }
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    };

    return (
        <div className="login-page-container">
            <img src="/image/loginback.jpeg" alt="Background"/>
            <div className="login-page-overlay">
                <div className="login-page-wrap">
                    <div className="login-logo-container-back"></div>
                    <div className="login-logo-container">
                        <div className="login-logo">
                            <img src="/image/login-logo.png"/>
                        </div>
                    </div>
                    <div className="login-box">
                        <input type="text" placeholder="ID" className="input-field"  onChange={(e) => setId(e.target.value)} />
                        <input type="password" placeholder="Password" className="input-field" onChange={(e) => setPassword(e.target.value)}  />
                        <button className="login-button"  onClick={handleLogin}>LOG IN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;