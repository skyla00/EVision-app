import React, { useCallback, useState, useEffect } from 'react';
import './CustomerPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import CustomerDetailSearch from '../component/CustomerDetailSearch';
import CustomerSearchInfo from '../component/CustomerSearchInfo';
import CustomerPostModal from '../Modal/CustomerPostModal';
import CustomerModifyModal from '../Modal/CustomerModifyModal';
import axios from 'axios';

const CustomerPage = () => {
    const [customerList, setCustomerList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const headers = [
        { value: 'customerCode', label: '판매업체 코드' },
        { value: 'customerName', label: '판매업체명' },
        { value: 'manager', label: '담당자' },
        { value: 'customerAddress', label: '판매업체 주소' },
        { value: 'customerPhone', label: '판매업체 연락처' },
        { value: 'customerEmail', label: '판매업체 이메일' },
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
                console.log(response.data.data);
                setCustomerList(response.data.data);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCustomers();
    }, []);

    const handleSearch = useCallback(( customerCode, customerName, manager, customerAddress, customerPhone, customerEmail) => {
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
            alert("수정할 판매업체를 선택하세요.")
        }
    };
    
    const handleCloseCustomerModifyModal = () => setIsCustomerModifyModalOpen(false);

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleCustomerPostSuccess = (newCustomer) => {
        setCustomerList((prevList) => [...prevList, newCustomer]);
        setSearchResults((prevResults) => [...prevResults, newCustomer]);
        handleCloseCustomerPostModal();
        window.location.reload();
    }

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
    )
  };
  
  export default CustomerPage;