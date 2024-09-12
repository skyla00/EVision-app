import { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const useAxiosInterceptor = () => {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const originalRequest = error.config;

                // 로그인 요청은 토큰 만료 처리를 제외
                if (originalRequest.url.includes('/login')) {
                    return Promise.reject(error);
                }

                if (error.response && error.response.status === 401) {
                    // 토큰 만료 처리: 로그아웃 및 로그인 페이지로 이동
                    logout();
                    alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
                    window.location.href = '/';
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [logout]);
};

export default useAxiosInterceptor;
