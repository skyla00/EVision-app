import { createContext, useState, useEffect } from 'react'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
            setIsAuthenticated(true);
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo) {
                setUserInfo(storedUserInfo);
            }
        }
        setLoading(false);  // 인증 상태 확인 후 로딩 완료
    }, []);

    const login = (token, userInfo) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setAccessToken(token);
        setUserInfo(userInfo);
        setIsAuthenticated(true);
        setLoading(false);  // 로그인 후 로딩 상태 변경
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        setAccessToken(null);
        setUserInfo(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken, userInfo, setUserInfo, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
