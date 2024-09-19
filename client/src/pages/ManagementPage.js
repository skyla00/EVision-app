import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import ManagementOrderDetailSearch from '../component/Management/ManagementOrderDetailSearch';
import ManagementSearchInfo from '../component/Management/ManagementSearchInfo';
import ManagementDetailModal from '../Modal/Management/ManagementDetailModal';

const ManagementPage = () => {
    const [managementOrderList, setManagementOrderList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isManagementDetailModalOpen, setIsManagementDetailModalOpen] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favoriteOrders');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const handleAddToFavorites = (managementOrder, isFavorite) => {
        if (!managementOrder || !managementOrder.orderHeaderId) {
            alert("즐겨찾기에 추가할 유효한 주문을 선택하세요.");
            return;
        }
    
        // 즐겨찾기에 이미 존재하는 경우 제거
        if (isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav?.orderHeaderId !== managementOrder.orderHeaderId);
            setFavorites(updatedFavorites);
            alert('즐겨찾기에서 제거되었습니다.');
        } else {
            // 최대 3개의 즐겨찾기 제한
            const filteredFavorites = favorites.filter(fav => fav !== null);
            if (filteredFavorites.length >= 3) {
                alert('즐겨찾기는 최대 3개까지만 추가할 수 있습니다.');
                return;
            }
    
            // 중복 추가 방지
            const isAlreadyFavorite = favorites.some(fav => fav?.orderHeaderId === managementOrder.orderHeaderId);
            if (!isAlreadyFavorite) {
                const newFavorites = [...favorites];
    
                // 빈 슬롯에 즐겨찾기를 추가
                for (let i = 0; i < newFavorites.length; i++) {
                    if (!newFavorites[i]) {
                        newFavorites[i] = {
                            ...managementOrder,
                            orderStatus: managementOrder.orderHeaderStatus // orderStatus 추가
                        };
                        setFavorites(newFavorites); // 상태 업데이트
                        alert('즐겨찾기에 추가되었습니다.');
                        return; // 중복 추가 방지 위해 return
                    }
                }
                
                // 배열에 새로운 즐겨찾기 추가 (슬롯이 남아있을 경우)
                if (newFavorites.length < 3) {
                    newFavorites.push({
                        ...managementOrder,
                        orderStatus: managementOrder.orderHeaderStatus // orderStatus 추가
                    });
                    setFavorites(newFavorites);
                    alert('즐겨찾기에 추가되었습니다.');
                }
            } else {
                alert('이미 즐겨찾기에 추가된 주문입니다.');
            }
        }
    };

    useEffect(() => {
        localStorage.setItem('favoriteOrders', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const fetchMyOrders = async () => {
            let accessToken = window.localStorage.getItem('accessToken');
            let storedData = JSON.parse(window.localStorage.getItem('userInfo'));
            let memberId = storedData.data.memberId; 
            try {
                const response = await axios.get(
                    process.env.REACT_APP_API_URL + `orders?member-id=${memberId}`, {
                        headers: {
                            Authorization: `${accessToken}`
                        }
                    }
                );
                
                setManagementOrderList(response.data.data);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMyOrders();
    }, []);

    const handleSearch = useCallback((orderHeaderId, orderHeaderStatus, customerName, customerCode, memberName, orderDate, acceptDate) => {
        let filteredResults = managementOrderList;

        if (!orderHeaderId && !orderHeaderStatus && !customerName && !customerCode && !memberName && !orderDate && !acceptDate) {
            setSearchResults(managementOrderList);
            return;
        }

        // Filter logic based on input fields
        if (orderHeaderId) {
            filteredResults = filteredResults.filter((order) =>
                order.orderHeaderId.toLowerCase().includes(orderHeaderId.toLowerCase())
            );
        }

        if (orderHeaderStatus) {
            filteredResults = filteredResults.filter((order) =>
                order.orderHeaderStatus.toLowerCase().includes(orderHeaderStatus.toLowerCase())
            );
        }

        if (customerName) {
            filteredResults = filteredResults.filter((order) =>
                order.customerName.toLowerCase().includes(customerName.toLowerCase())
            );
        }

        if (customerCode) {
            filteredResults = filteredResults.filter((order) =>
                order.customerCode.toLowerCase().includes(customerCode.toLowerCase())
            );
        }

        if (memberName) {
            filteredResults = filteredResults.filter((order) =>
                order.memberName.toLowerCase().includes(memberName.toLowerCase())
            );
        }

        if (orderDate) {
            filteredResults = filteredResults.filter((order) =>
                order.orderDate.toLowerCase().includes(orderDate.toLowerCase())
            );
        }

        if (acceptDate) {
            filteredResults = filteredResults.filter((order) => {
                const orderAcceptDate = order.acceptDate ? order.acceptDate.toLowerCase() : '';
                return orderAcceptDate.includes(acceptDate.toLowerCase());
            });
        }

        setSearchResults(filteredResults);
    }, [managementOrderList]);

    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleOpenDetailModal = () => {
        if (!selectedOrder) {
            alert('상세보기할 상품을 선택하세요.');
            return;
        }
        setIsManagementDetailModalOpen(true);
    };

    const handleCloseManagementDetailModal = () => setIsManagementDetailModalOpen(false);

    const handleManagementDetailSuccess = (updatedOrder) => {
        setManagementOrderList((prevList) => [...prevList, updatedOrder]);
        setSearchResults((prevResults) => [...prevResults, updatedOrder]);
        handleCloseManagementDetailModal();
        window.location.reload();
    };

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <ManagementOrderDetailSearch list={managementOrderList} onSearch={handleSearch} />
            <ManagementSearchInfo
                title="관리 정보"
                headers={[
                    { value: 'favorite', label: '즐겨찾기' },
                    { value: 'orderHeaderId', label: '주문번호' },
                    { value: 'memberName', label: '판매사원' },
                    { value: 'orderDate', label: '주문일자' },
                    { value: 'orderHeaderStatus', label: '주문상태' },
                    { value: 'acceptDate', label: '승인일자' },
                    { value: 'customerCode', label: '판매업체코드' },
                    { value: 'customerName', label: '판매업체명' }
                ]}
                managementOrders={searchResults}
                onSelectOrder={handleSelectOrder}
                selectedOrder={selectedOrder}
                onOpenDetailModal={handleOpenDetailModal}
                favorites={favorites}
                onToggleFavorite={handleAddToFavorites}
            />
            {isManagementDetailModalOpen && (
                <ManagementDetailModal
                    isOpen={isManagementDetailModalOpen}
                    onClose={handleCloseManagementDetailModal}
                    onSubmit={handleManagementDetailSuccess}
                    order={selectedOrder}
                />
            )}
        </div>
    );
};

export default ManagementPage;
