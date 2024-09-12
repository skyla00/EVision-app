import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import OrderPage from './pages/OrderPage';
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import SalePricePage from "./pages/SalesPricePage";
import ManagementPage from "./pages/ManagementPage";
import HistoryPage from "./pages/HistoryPage";
import GraphPage from "./pages/GraphPage";
import { AuthProvider } from './auth/AuthContext';  // AuthContext 추가
import UseAxiosInterceptor from './auth/UseAxiosInterceptor';  // Axios 인터셉터 추가
import ProtectedRoute from './auth/ProtectedRoute';  // 보호된 경로 추가

const App = () => {
  return (
    <AuthProvider>
      <UseAxiosInterceptor /> {/* AuthProvider 내부에서 인터셉터 호출 */}
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<ProtectedRoute element={<MainPage />} />} />
          <Route path="/order" element={<ProtectedRoute element={<OrderPage />} />} />
          <Route path="/product" element={<ProtectedRoute element={<ProductPage />} />} />
          <Route path="/customer" element={<ProtectedRoute element={<CustomerPage />} />} />
          <Route path="/price" element={<ProtectedRoute element={<SalePricePage />} />} />
          <Route path="/manage" element={<ProtectedRoute element={<ManagementPage />} />} />
          <Route path="/history" element={<ProtectedRoute element={<HistoryPage />} />} />
          <Route path="/graph" element={<ProtectedRoute element={<GraphPage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
