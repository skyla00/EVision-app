import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const useAxiosInterceptor = () => {
    const { logout } = useContext(AuthContext);
    const [alertShown, setAlertShown] = useState(false); // 알람이 뜬 상태를 관리

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
                if (error.response && error.response.status === 401 && !alertShown) {
                    // 토큰 만료 처리: 로그아웃 및 로그인 페이지로 이동
                    logout();
                    alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
                    setAlertShown(true);  // 알람이 뜬 상태로 설정
                    window.location.href = '/';
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [logout, alertShown]);

    // 페이지가 이동된 후에 alertShown을 초기화
    useEffect(() => {
        setAlertShown(false); // 페이지가 변경되면 알람 상태 초기화
    }, [window.location.pathname]); // pathname이 변경될 때 상태 초기화
};

export default useAxiosInterceptor;
