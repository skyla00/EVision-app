import React, { useCallback, useState, useEffect } from 'react';
import './ProductPage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import ProductDetailSearch from '../component/Product/ProductDetailSearch';
import ProductSearchInfo from '../component/Product/ProductSearchInfo';
import ProductPostModal from '../Modal/Product/ProductPostModal';
import ProductModifyModal from '../Modal/Product/ProductModifyModal';
import axios from 'axios';

const ProductPage = () => {
    const [productList, setProductList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const headers = [
        { value: 'itemCode', label: '상품코드' },
        { value: 'itemName', label: '상품명' },
        { value: 'unit', label: '단위' },
        { value: 'specs', label: '정보'},
        { value: 'itemStatus', label: '상태' },
    ];

    // 컴포넌트가 처음 렌더링될 때 자동으로 검색을 실행하는 효과를 추가
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let accessToken = window.localStorage.getItem('accessToken'); // 로컬 스토리지에서 accessToken을 가져옵니다.
                const response = await axios.get(process.env.REACT_APP_API_URL + 'items', {
                    headers: {
                        Authorization: `${accessToken}` // 인증 토큰을 헤더에 포함시켜 요청
                    }
                });
                setProductList(response.data.data); // 받아온 데이터를 productList에 저장
                setSearchResults(response.data.data); // 페이지 로드 시 전체 상품을 searchResults에 저장
                console.log(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts(); // 컴포넌트가 마운트될 때 fetchProducts 함수가 실행됩니다.
    }, []);  // 빈 배열을 의존성으로 설정하여 한 번만 실행됨
   

    // 검색이 수행될 때 호출되는 함수
    const handleSearch = useCallback((itemName, itemCode, itemSpecs) => {
        let filteredResults = productList;

        if (!itemName && !itemCode && !itemSpecs) {
            setSearchResults(productList); // 검색 조건이 없으면 전체 상품 리스트를 보여줌
            return;
        }
    
        if (itemName) {
            filteredResults = filteredResults.filter((item) => 
                item.itemName && item.itemName.toLowerCase().includes(itemName.toLowerCase())
            );
        }
    
        if (itemCode) {
            filteredResults = filteredResults.filter((item) => 
                item.itemCode && item.itemCode.toLowerCase().includes(itemCode.toLowerCase())
            );
        }
    
        if (itemSpecs) {
            filteredResults = filteredResults.filter((item) => 
                item.specs && item.specs.toLowerCase().includes(itemSpecs.toLowerCase())
            );
        }
    
        setSearchResults(filteredResults); // 검색된 결과 저장
    }, [productList]);
    

    const [isProductPostModalOpen, setIsProductPostModalOpen] = useState(false);
    const [isProductModifyModalOpen, setIsProductModifyModalOpen] = useState(false);


    const handleOpenPostModal = () => {
        setIsProductPostModalOpen(true);
    };
    const handleCloseProductPostModal = () => setIsProductPostModalOpen(false);

    const handleOpenModifyModal = () => {
        if (selectedItem) {
            setIsProductModifyModalOpen(true); // 선택된 상품이 있을 때만 수정 모달 열기
        } else {
            alert("수정할 상품을 선택하세요.");
        }
    };
    const handleCloseProductModifyModal = () => setIsProductModifyModalOpen(false);

    // 상품을 클릭하여 선택 상태로 만듦
    const handleSelectItem = (item) => {
        setSelectedItem(item); // 선택된 상품을 저장
    };

    // 상품 등록 후 상태 업데이트 (새로고침 없이 최신화)
    const handleProductPostSuccess = (newItem) => {
        setProductList((prevList) => [...prevList, newItem]); // 상품 목록에 새로 등록된 상품 추가
        setSearchResults((prevResults) => [...prevResults, newItem]); // 검색 결과에도 반영
        handleCloseProductPostModal(); // 모달 닫기
        window.location.reload();
    };

    const handleProductModifySuccess = (updatedItem) => {
        const updatedList = productList.map(item => 
            item.itemCode === updatedItem.itemCode ? updatedItem : item
        );
        setProductList(updatedList);
        setSearchResults(updatedList);
        // 추가적으로 새로고침
        window.location.reload(); // 새로고침 추가
    };

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <ProductDetailSearch title="상품 조회" list={productList} onSearch={handleSearch} />
            <ProductSearchInfo
                title="상품 정보"
                headers={headers}
                items={searchResults}
                onSelectItem={handleSelectItem} // 상품을 클릭했을 때 선택
                selectedItem={selectedItem} // 현재 선택된 상품 전달
                onOpenPostModal={handleOpenPostModal} // 등록 모달 열기 함수 전달
                onOpenModifyModal={handleOpenModifyModal} // 수정 모달 열기 함수 전달
            />
            <ProductPostModal
                isOpen={isProductPostModalOpen}
                onClose={handleCloseProductPostModal}
                onSubmit={handleProductPostSuccess} // 상품 등록 후 상태 업데이트
            />
            <ProductModifyModal
                isOpen={isProductModifyModalOpen}
                onClose={handleCloseProductModifyModal}
                onSubmit={handleProductModifySuccess}
                item={selectedItem} // 선택된 상품 전달
            />
        </div>
    )
};

export default ProductPage; 