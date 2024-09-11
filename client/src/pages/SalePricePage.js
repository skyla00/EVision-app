import React, { useCallback, useState, useEffect } from 'react';
import './SalePricePage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import SalesPriceDetailSearch from '../component/SalesPriceDetailSearch';
import SalesPriceSearchInfo from '../component/SalesPriceSearchInfo';
import SalesPricePostModal from '../Modal/SalesPricePostModal';
import SalesPriceModifyModal from '../Modal/SalesPriceModifyModal';
import axios from 'axios';

const SalePricePage = () => {
    const [salePriceList, setSalesPriceList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSalesPrice, setSelectedSalesPrice] = useState(null);

    const headers = [
        { value: 'itemCode', label: '상품 코드' },
        { value: 'itemName', label: '상품명' },
        { value: 'customerCode', label: '판매업체 코드' },
        { value: 'customerName', label: '판매업체명' },
        { value: 'salesAmount', label: '판매가' },
        { value: 'startDate', label: '기준일자' },
        { value: 'endDate', label: '만료일자' },
    ];
    useEffect(() => {
        const fetchSalesPrice = async () => {
            try {
                let accessToken = window.localStorage.getItem('accessToken');
                const response = await axios.get(process.env.REACT_APP_API_URL + 'sales-prices', {
                    headers: {
                         Authorization: `${accessToken}`
                    }
                });
                console.log(response.data.data);
                setSalesPriceList(response.data.data);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSalesPrice();
    }, []);

    const handleSearch = useCallback(( itemCode, itemName, customerCode, customerName, salesAmount, startDate, endDate) => {
        let filteredResults = salePriceList;

        if (!itemCode && !customerCode && !salesAmount && !startDate && !endDate) {
            setSearchResults(salePriceList);
            return;
        }

        if (itemCode) {
            filteredResults = filteredResults.filter((salePrice) =>
                salePrice.itemCode.toLowerCase().includes(itemCode.toLowerCase())
            );
        }

        if (itemName) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.itemName.toLowerCase().includes(itemName.toLowerCase())
            );
        }

        if (customerCode) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.customerCode.toLowerCase().includes(customerCode.toLowerCase())
            );
        }

        if (customerName) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.customerName.toLowerCase().includes(customerName.toLowerCase())
            );
        }

        if (salesAmount) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.salesAmount.toLowerCase().includes(salesAmount.toLowerCase())
            );
        }

        if (startDate) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.startDate.toLowerCase().includes(startDate.toLowerCase())
            );
        }

        if (endDate) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.endDate.toLowerCase().includes(endDate.toLowerCase())
            );
        }
        setSearchResults(filteredResults);
     }, [salePriceList]);

    const [isSalesPricePostModalOpen, setIsSalesPricePostModalOpen] = useState(false);
    const [isSalesPriceModifyModalOpen, setIsSalesPriceModifyModalOpen] = useState(false);

    const handleOpenPostModal = () => {
        setIsSalesPricePostModalOpen(true);
    };

    const handleCloseSalesPricePostModal = () => setIsSalesPricePostModalOpen(false);

    const handleOpenModifyModal = () => {
        if (selectedSalesPrice) {
            setIsSalesPriceModifyModalOpen(true);
        } else {
            alert("수정할 판매가를 선택하세요.")
        }
    };
    
    const handleCloseSalesPriceModifyModal = () => setIsSalesPriceModifyModalOpen(false);

    const handleSelectSalesPrice = (salePrice) => {
        setSelectedSalesPrice(salePrice);
    };

    const handleCustomerPostSuccess = (newSalesPrice) => {
        setSalesPriceList((prevList) => [...prevList, newSalesPrice]);
        setSearchResults((prevResults) => [...prevResults, newSalesPrice]);
        handleCloseSalesPricePostModal();
        window.location.reload();
    }

    const handleCustomerModifySuccess = (updatedSalesPrice) => {
        const updatedList = salePriceList.map(salePrice => 
            salePrice.salesPriceId === updatedSalesPrice.customerCode ? updatedSalesPrice : salePrice
        );
        setSalesPriceList(updatedList);
        setSearchResults(updatedList);
        window.location.reload();
    };
    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <SalesPriceDetailSearch title="판매가 조회" list={salePriceList} onSearch={handleSearch}/>
            <SalesPriceSearchInfo 
                title="판매가 정보" 
                headers={headers} 
                salesPrices={searchResults} 
                onSelectSalesPrice={handleSelectSalesPrice}
                selectedSalesPrice={selectedSalesPrice}
                onOpenPostModal={handleOpenPostModal} 
                onOpenModifyModal={handleOpenModifyModal}
            />
            <SalesPricePostModal 
                isOpen={isSalesPricePostModalOpen}
                onClose={handleCloseSalesPricePostModal} 
                onSubmit={handleCustomerPostSuccess}/>
            <SalesPriceModifyModal 
                isOpen={isSalesPriceModifyModalOpen}
                onClose={handleCloseSalesPriceModifyModal} 
                onSubmit={handleCustomerModifySuccess}
                customer={selectedSalesPrice}/>
        </div>
    )
  };
  
  export default SalePricePage;