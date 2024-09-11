import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import OrderPage from './pages/OrderPage';
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import SalePricePage from "./pages/SalePricePage";
import ManagementPage from "./pages/ManagementPage";
import HistoryPage from "./pages/HistoryPage";
import GraphPage from "./pages/GraphPage";
import { AuthProvider } from './auth/AuthContext';  // AuthContext 추가

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/main" element={<MainPage/>} />
          <Route path="/order" element={<OrderPage/>} />
          <Route path="/product" element={<ProductPage/>} />
          <Route path="/customer" element={<CustomerPage/>} />
          <Route path="/price" element={<SalePricePage/>} />
          <Route path="/manage" element={<ManagementPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
