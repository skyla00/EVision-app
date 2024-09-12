import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // 로딩 중일 때 화면을 표시하지 않음
    if (loading) {
        return <div>로딩 중...</div>;
    }

    // 인증되지 않았으면 로그인 페이지로 리다이렉트
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // 인증되었으면 해당 컴포넌트를 렌더링
    return element;
};

export default ProtectedRoute;
