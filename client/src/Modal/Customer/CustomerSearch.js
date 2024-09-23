import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerSearch.css';
import '../Customer/CustomerModifyModal.css';

const CustomerSearch = ({ onCustomerSelect, onClose }) => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                let accessToken = window.localStorage.getItem('accessToken');
                const response = await axios.get(process.env.REACT_APP_API_URL + 'customers', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setCustomers(response.data.data || []);
                setFilteredCustomers(response.data.data || []);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    // 필터링 처리
    const handleSearchChange = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchTerm(search);
        const filtered = customers.filter(customer =>
            customer.customerName.toLowerCase().includes(search) ||
            customer.customerCode.toLowerCase().includes(search)
        );
        setFilteredCustomers(filtered);
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
                        placeholder="판매업체명 또는 코드 검색"
                    />
                </div>
                <div className="cs-table-wrapper">
                    <table className="cs-table">
                        <thead className="ps-head">
                            <tr className="cs-head-cell">
                                <th className="cs-code">판매업체코드</th>
                                <th className="cs-name">판매업체명</th>
                                <th className="cs-manager">담당자</th>
                                <th className="cs-address">판매업체주소</th>
                                <th className="cs-phone">판매업체연락처</th>
                                <th className="cs-email">판매업체이메일</th>
                            </tr>
                        </thead>
                        <tbody className="ps-body">
                            {filteredCustomers.map(customer => (
                                <tr key={customer.customerCode} onClick={() => onCustomerSelect(customer)}>
                                    <td className="cs-code">{customer.customerCode}</td>
                                    <td className="cs-name">{customer.customerName}</td>
                                    <td className="cs-manager">{customer.manager}</td>
                                    <td className="cs-address">{customer.customerAddress}</td>
                                    <td className="cs-phone">{customer.customerPhone}</td>
                                    <td className="cs-email">{customer.customerEmail}</td>
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

export default CustomerSearch;