import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);  // 초기값 null

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
            setAccessToken(token);
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo) {
                setUserInfo(storedUserInfo);  // 사용자 정보 설정
            }
        }
    }, []);

    const login = (token, userInfo) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));  // 사용자 정보를 localStorage에 저장
        setAccessToken(token);
        setUserInfo(userInfo);  // 사용자 정보 설정
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');  // 사용자 정보 제거
        setAccessToken(null);
        setUserInfo(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
