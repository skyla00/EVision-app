import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // JWT 토큰 디코딩을 위한 라이브러리

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [permissions, setPermissions] = useState([]); // 권한 정보 상태 추가
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                setAccessToken(token);
                setIsAuthenticated(true);

                // 로컬 스토리지에서 사용자 정보 가져오기
                const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (storedUserInfo) {
                    setUserInfo(storedUserInfo);
                }

                // JWT 토큰에서 권한 정보 추출 및 설정
                const decodedToken = jwtDecode(token);
                if (decodedToken.permissions) {
                    setPermissions(decodedToken.permissions);
                }
            } catch (error) {
                console.error('토큰 디코딩 오류:', error);
                setIsAuthenticated(false);
                setPermissions([]);
            }
        }
        setLoading(false); // 인증 상태 확인 후 로딩 완료
    }, []);

    const login = (token, userInfo) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setAccessToken(token);
        setUserInfo(userInfo);
        setIsAuthenticated(true);

        try {
            // JWT 토큰에서 권한 정보 추출 및 설정
            const decodedToken = jwtDecode(token);
            if (decodedToken.permissions) {
                setPermissions(decodedToken.permissions);
            }
        } catch (error) {
            console.error('토큰 디코딩 오류:', error);
            setPermissions([]);
        }

        setLoading(false); // 로그인 후 로딩 상태 변경
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        setAccessToken(null);
        setUserInfo(null);
        setIsAuthenticated(false);
        setPermissions([]); // 로그아웃 시 권한 정보 초기화
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken, userInfo, permissions, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
