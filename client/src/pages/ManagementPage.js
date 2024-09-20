import React, { useCallback, useState, useEffect, useContext } from 'react';
import './ManagementPage.css';
import axios from 'axios';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import ManagementOrderDetailSearch from '../component/Management/ManagementOrderDetailSearch';
import ManagementSearchInfo from '../component/Management/ManagementSearchInfo';
import ManagementDetailModal from '../Modal/Management/ManagementDetailModal';
import { AuthContext } from '../auth/AuthContext';
import ManagementHistoryModal from '../Modal/Management/ManagementHistoryModal'

const ManagementPage = () => {
    const { userInfo, setUserInfo } = useContext(AuthContext);  // AuthContext에서 userInfo와 setUserInfo 사용

    const [managementOrderList, setManagementOrderList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isManagementDetailModalOpen, setIsManagementDetailModalOpen] = useState(false);

    useEffect(() => {
        const fetchMyOrders = async () => {
            let accessToken = window.localStorage.getItem('accessToken');
            let memberId = userInfo?.data?.memberId; 
            if (!memberId) return;

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}orders?member-id=${memberId}`,
                    {
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
    }, [userInfo]);

    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const handleOpenHistoryModal = (orderHeaderId) => {
        if (!orderHeaderId) {
            alert('히스토리를 조회할 주문을 선택하세요.');
            return;
        }
        setIsHistoryModalOpen(true);
    };
    const handleColseHistoryModal = () => setIsHistoryModalOpen(false);
    // 즐겨찾기 추가/삭제 함수
    const handleAddToFavorites = async (order, isFavorite) => {
        try {
            let accessToken = window.localStorage.getItem('accessToken');
    
            // 서버로 즐겨찾기 추가/삭제 요청
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}orders/favorite?order-header-id=${order.orderHeaderId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
    
            if (response.status === 200) {
                // 즐겨찾기 추가/삭제 후 상태 즉시 업데이트
                const updatedFavorites = isFavorite
                    ? userInfo?.data?.favorites.filter(fav => fav.orderHeaderId !== order.orderHeaderId)  // 즐겨찾기 해제
                    : [...(userInfo?.data?.favorites || []), order];  // 즐겨찾기 추가, 전체 order 객체 추가
    
                // userInfo 업데이트 및 로컬스토리지 저장
                const updatedUserInfo = { ...userInfo, data: { ...userInfo.data, favorites: updatedFavorites } };
                setUserInfo(updatedUserInfo);
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            }
        } catch (error) {
            console.error("즐겨찾기 상태를 업데이트하는 중 오류가 발생했습니다:", error);
        }
    };

    const handleSearch = useCallback((orderHeaderId, orderHeaderStatus, customerName, customerCode, memberName, orderDate, acceptDate) => {
        let filteredResults = managementOrderList;

        if (!orderHeaderId && !orderHeaderStatus && !customerName && !customerCode && !memberName && !orderDate && !acceptDate) {
            setSearchResults(managementOrderList);
            return;
        }

        if (orderHeaderId) {
            filteredResults = filteredResults.filter(order => 
                order.orderHeaderId.toLowerCase().includes(orderHeaderId.toLowerCase())
            );
        }

        if (orderHeaderStatus) {
            filteredResults = filteredResults.filter(order => 
                order.orderHeaderStatus.toLowerCase().includes(orderHeaderStatus.toLowerCase())
            );
        }

        if (customerName) {
            filteredResults = filteredResults.filter(order => 
                order.customerName.toLowerCase().includes(customerName.toLowerCase())
            );
        }

        if (customerCode) {
            filteredResults = filteredResults.filter(order => 
                order.customerCode.toLowerCase().includes(customerCode.toLowerCase())
            );
        }

        if (memberName) {
            filteredResults = filteredResults.filter(order => 
                order.memberName.toLowerCase().includes(memberName.toLowerCase())
            );
        }

        if (orderDate) {
            filteredResults = filteredResults.filter(order => 
                order.orderDate.toLowerCase().includes(orderDate.toLowerCase())
            );
        }

        if (acceptDate) {
            filteredResults = filteredResults.filter(order => {
                const orderAcceptDate = order.acceptDate ? order.acceptDate.toLowerCase() : '';
                return orderAcceptDate.includes(acceptDate.toLowerCase());
            });
        }

        setSearchResults(filteredResults);
    }, [managementOrderList]);

    const handleSelectOrder = (order) => {
        if (selectedOrder && selectedOrder.orderHeaderId === order.orderHeaderId) {
            setSelectedOrder(null);
        } else {
            setSelectedOrder(order);
        }
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
        const updatedList = managementOrderList.map(order =>
            order.orderHeaderId === updatedOrder.orderHeaderId ? updatedOrder : order
        );
        setManagementOrderList(updatedList);
        setSearchResults(updatedList);
        setIsManagementDetailModalOpen(false);
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
                onOpenHistoryModal={handleOpenHistoryModal}
                favorites={userInfo?.data?.favorites}  // userInfo에서 가져온 favorites 사용
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
            <ManagementHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={handleColseHistoryModal}
                orderHeaderId={selectedOrder?.orderHeaderId}
            />
        </div>
    );
};

export default ManagementPage;
