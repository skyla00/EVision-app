import React, { useCallback, useState, useEffect } from 'react';
import './SalesPricePage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import SalesPriceDetailSearch from '../component/SalesPrice/SalesPriceDetailSearch';
import SalesPriceSearchInfo from '../component/SalesPrice/SalesPriceSearchInfo';
import SalesPricePostModal from '../Modal/SalesPrice/SalesPricePostModal';
import SalesPriceModifyModal from '../Modal/SalesPrice/SalesPriceModifyModal';
import axios from 'axios';

const SalePricePage = () => {
    const [salePriceList, setSalesPriceList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSalesPrice, setSelectedSalesPrice] = useState(null);

    const headers = [
        { value: 'itemCode', label: '상품코드' },
        { value: 'itemName', label: '상품명' },
        { value: 'customerCode', label: '판매업체코드' },
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
                setSalesPriceList(response.data.data);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSalesPrice();
    }, []);

    const handleSearch = useCallback((itemCode, itemName, customerCode, customerName, salesAmount, startDate, endDate) => {
        let filteredResults = salePriceList;

        if (!itemCode && !itemName && !customerCode && !customerName && !salesAmount && !startDate && !endDate) {
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
                salePrice.itemName.toLowerCase().includes(itemName.trim().toLowerCase())
            );
        }

        if (customerCode) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.customerCode.toLowerCase().includes(customerCode.toLowerCase())
            );
        }

        if (customerName) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.customerName.toLowerCase().includes(customerName.trim().toLowerCase())
            );
        }

        if (salesAmount && !isNaN(parseInt(salesAmount))) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.salesAmount.toString().includes(salesAmount)
            );
        }
        
        if (startDate) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.startDate ? salePrice.startDate.includes(startDate) : false
            );
        }
    
        if (endDate) {
            filteredResults = filteredResults.filter((salePrice) => 
                salePrice.endDate ? salePrice.endDate.includes(endDate) : false
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

    const handleSelectSalesPrice = (salesPrice) => {
        if (selectedSalesPrice && selectedSalesPrice.salesPriceId === salesPrice.salesPriceId) {
            // 이미 선택된 항목을 다시 클릭하면 선택을 취소
            setSelectedSalesPrice(null);
        } else {
            // 다른 항목을 클릭하면 해당 항목을 선택
            setSelectedSalesPrice(salesPrice);
        }
    };

    const handleSalesPricePostSuccess = (newSalesPrice) => {
        setSalesPriceList((prevList) => [...prevList, newSalesPrice]);
        setSearchResults((prevResults) => [...prevResults, newSalesPrice]);
        handleCloseSalesPricePostModal();
        window.location.reload();
    }

    const handleSalesPriceModifySuccess = (updatedSalesPrice) => {
        const updatedList = salePriceList.map(salePrice => 
            salePrice.salesPriceId === updatedSalesPrice.salesPriceId ? updatedSalesPrice : salePrice
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
                onSubmit={handleSalesPricePostSuccess}/>
            <SalesPriceModifyModal 
                isOpen={isSalesPriceModifyModalOpen}
                onClose={handleCloseSalesPriceModifyModal} 
                onSubmit={handleSalesPriceModifySuccess}
                salesPrice={selectedSalesPrice}/>
        </div>
    );
};
  
export default SalePricePage;
