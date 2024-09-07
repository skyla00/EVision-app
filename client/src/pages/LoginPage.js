import React, {useRef} from 'react';
import './LoginPage.css';

const LoginPage = () => {
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
                        <input type="text" placeholder="ID" className="input-field" />
                        <input type="password" placeholder="Password" className="input-field" />
                        <button className="login-button">LOG IN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;