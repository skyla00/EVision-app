import React, { useState, useEffect } from 'react';
import './ProductSearch.css';
import '../Customer/CustomerModifyModal.css';
import axios from 'axios';

const ProductSearch = ({ onProductSelect, onClose }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let accessToken = window.localStorage.getItem('accessToken');
                const response = await axios.get(process.env.REACT_APP_API_URL + 'items', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setProducts(response.data.data || []);
                setFilteredProducts(response.data.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // 필터링 처리
    const handleSearchChange = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchTerm(search);
        const filtered = products.filter(product =>
            product.itemName.toLowerCase().includes(search) ||
            product.itemCode.toLowerCase().includes(search)
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="modal">
            <div className="modal-content">
            <div className="modal-search">
                <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="ps-search-input"
                        placeholder="상품명 또는 코드 검색"
                    />
            </div>
                <div className="ps-table-wrapper">
                    <table className="ps-table">
                        <thead className="ps-head">
                            <tr className="ps-head-cell">
                                <th className="ps-code">상품코드</th>
                                <th className="ps-name">상품명</th>
                                <th className="ps-unit">단위</th>
                                <th className="ps-info">정보</th>
                            </tr>
                        </thead>
                        <tbody className="ps-body">
                            {filteredProducts.map(product => (
                                <tr className="ps-row" key={product.itemCode} onClick={() => onProductSelect(product)}>
                                    <td className="ps-code">{product.itemCode}</td>
                                    <td className="ps-name">{product.itemName}</td>
                                    <td className="ps-unit">{product.unit}</td>
                                    <td className="ps-info">{product.specs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="ps-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default ProductSearch;