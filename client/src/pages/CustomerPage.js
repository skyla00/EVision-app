import React, { useCallback, useState, useEffect } from 'react';
import './CustomerPage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import CustomerDetailSearch from '../component/Customer/CustomerDetailSearch';
import CustomerSearchInfo from '../component/Customer/CustomerSearchInfo';
import CustomerPostModal from '../Modal/Customer/CustomerPostModal';
import CustomerModifyModal from '../Modal/Customer/CustomerModifyModal';
import axios from 'axios';

const CustomerPage = () => {
    const [customerList, setCustomerList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const headers = [
        { value: 'customerCode', label: '판매업체코드' },
        { value: 'customerName', label: '판매업체명' },
        { value: 'manager', label: '담당자' },
        { value: 'customerAddress', label: '주소' },
        { value: 'customerDetailAddress', label: '상세주소'},
        { value: 'customerAddressNumber', label: '우편번호'},
        { value: 'customerPhone', label: '연락처' },
        { value: 'customerEmail', label: '이메일' },
    ];

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                let accessToken = window.localStorage.getItem('accessToken');
                const response = await axios.get(process.env.REACT_APP_API_URL + 'customers', {
                    headers: {
                         Authorization: `${accessToken}`
                    }
                });
                setCustomerList(response.data.data);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCustomers();
    }, []);

    const handleSearch = useCallback((customerCode, customerName, manager, customerAddress, customerPhone, customerEmail) => {
        let filteredResults = customerList;

        if (!customerCode && !customerName && !manager && !customerAddress && !customerPhone && !customerEmail) {
            setSearchResults(customerList);
            return;
        }

        if (customerCode) {
            filteredResults = filteredResults.filter((customer) =>
                customer.customerCode.toLowerCase().includes(customerCode.toLowerCase())
            );
        }

        if (customerName) {
            filteredResults = filteredResults.filter((customer) => 
                customer.customerName.toLowerCase().includes(customerName.toLowerCase())
            );
        }

        if (manager) {
            filteredResults = filteredResults.filter((customer) => 
                customer.manager.toLowerCase().includes(manager.toLowerCase())
            );
        }

        if (customerAddress) {
            filteredResults = filteredResults.filter((customer) => 
                customer.customerAddress.toLowerCase().includes(customerAddress.toLowerCase())
            );
        }

        if (customerPhone) {
            filteredResults = filteredResults.filter((customer) => 
                customer.customerPhone.toLowerCase().includes(customerPhone.toLowerCase())
            );
        }

        if (customerEmail) {
            filteredResults = filteredResults.filter((customer) => 
                customer.customerEmail.toLowerCase().includes(customerEmail.toLowerCase())
            );
        }
        setSearchResults(filteredResults);
     }, [customerList]);

    const [isCustomerPostModalOpen, setIsCustomerPostModalOpen] = useState(false);
    const [isCustomerModifyModalOpen, setIsCustomerModifyModalOpen] = useState(false);

    const handleOpenPostModal = () => {
        setIsCustomerPostModalOpen(true);
    };

    const handleCloseCustomerPostModal = () => setIsCustomerPostModalOpen(false);

    const handleOpenModifyModal = () => {
        if (selectedCustomer) {
            setIsCustomerModifyModalOpen(true);
        } else {
            alert("수정할 판매업체를 선택하세요.");
        }
    };
    
    const handleCloseCustomerModifyModal = () => setIsCustomerModifyModalOpen(false);

    const handleSelectCustomer = (customer) => {
        if (selectedCustomer && selectedCustomer.customerCode === customer.customerCode) {
            // 이미 선택된 항목을 다시 클릭하면 선택을 취소
            setSelectedCustomer(null);
        } else {
            // 다른 항목을 클릭하면 해당 항목을 선택
            setSelectedCustomer(customer);
        }
    };

    const handleCustomerPostSuccess = (newCustomer) => {
        setCustomerList((prevList) => [...prevList, newCustomer]);
        setSearchResults((prevResults) => [...prevResults, newCustomer]);
        handleCloseCustomerPostModal();
        window.location.reload();
    };

    const handleCustomerModifySuccess = (updatedCustomer) => {
        const updatedList = customerList.map(customer => 
            customer.customerCode === updatedCustomer.customerCode ? updatedCustomer : customer
        );
        setCustomerList(updatedList);
        setSearchResults(updatedList);
        window.location.reload();
    };

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <CustomerDetailSearch title="판매업체 조회" list={customerList} onSearch={handleSearch}/>
            <CustomerSearchInfo 
                title="판매업체 정보" 
                headers={headers} 
                customers={searchResults} 
                onSelectCustomer={handleSelectCustomer}
                selectedCustomer={selectedCustomer}
                onOpenPostModal={handleOpenPostModal} 
                onOpenModifyModal={handleOpenModifyModal}
            />
            <CustomerPostModal 
                isOpen={isCustomerPostModalOpen}
                onClose={handleCloseCustomerPostModal} 
                onSubmit={handleCustomerPostSuccess}/>
            <CustomerModifyModal 
                isOpen={isCustomerModifyModalOpen}
                onClose={handleCloseCustomerModifyModal} 
                onSubmit={handleCustomerModifySuccess}
                customer={selectedCustomer}/>
        </div>
    );
};

export default CustomerPage;
