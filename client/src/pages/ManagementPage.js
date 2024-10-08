import React, { useCallback, useState, useEffect, useContext } from 'react';
import './ManagementPage.css';
import axios from 'axios';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import ManagementOrderDetailSearch from '../component/Management/ManagementOrderDetailSearch';
import ManagementSearchInfo from '../component/Management/ManagementSearchInfo';
import ManagementDetailModal from '../Modal/Management/ManagementDetailModal';
import ManagementHistoryModal from '../Modal/Management/ManagementHistoryModal'
import OrderModal from '../Modal/Order/OrderModal';
import { AuthContext } from '../auth/AuthContext';

const ManagementPage = () => {
    const { userInfo, setUserInfo } = useContext(AuthContext);  // AuthContext에서 userInfo와 setUserInfo 사용

    const [managementOrderList, setManagementOrderList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
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
        const selectedOrder = managementOrderList.find(order => order.orderHeaderId === orderHeaderId);
        if (selectedOrder) {
            setSelectedOrder(selectedOrder); // selectedOrder 업데이트
        }
        setIsHistoryModalOpen(true);
    };
    const handleColseHistoryModal = () => setIsHistoryModalOpen(false);

    const handleOpenOrderModal = () => {
        setIsOrderModalOpen(true);  // 주문 모달 열기
    };
    const handleCloseOrderModal = () => setIsOrderModalOpen(false);  // 주문 모달 닫기

    const handleOrderPostSuccess = (newOrder) => {
        // 필요한 필드들만 추출하여 상태 업데이트
        const expandedOrder = newOrder.orderItems.map(item => ({
            orderHeaderId: newOrder.orderHeaderId,
            memberName: newOrder.memberName,
            orderDate: newOrder.orderDate,
            orderHeaderStatus: newOrder.orderHeaderStatus,
            acceptDate: newOrder.acceptDate,
            customerCode: newOrder.customerCode,
            customerName: newOrder.customerName,
        }));
    
        // 상태 업데이트
        setManagementOrderList([...managementOrderList, ...expandedOrder]);
        setSearchResults([...searchResults, ...expandedOrder]);
    
        // 모달 닫기
        handleCloseOrderModal();
    };

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

                if (isFavorite) {
                    alert('즐겨찾기가 해제되었습니다.');
                } else {
                    alert('즐겨찾기가 등록되었습니다.');
                }
            }
        } catch (error) {
            // 에러 처리
            if (error.response) {
                const { status, message } = error.response.data;
    
                if (status === 409 && message === "Order Not Belong To Member") {
                    alert('자신의 주문만 즐겨 찾기로 등록할 수 있습니다.');
                } else if (status === 404 && message === "Favorite Exceeded") {
                    alert('즐겨찾기는 최대 3개까지 등록 가능합니다.');
                } else {
                    alert(`에러 발생: ${message}`);
                }
            } else {
                console.error("즐겨찾기 등록 중 오류 발생:", error);
            }
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
            alert('상세보기할 주문을 선택하세요.');
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
                onOpenOrderModal={handleOpenOrderModal}
                favorites={userInfo?.data?.favorites}  // userInfo에서 가져온 favorites 사용
                onToggleFavorite={handleAddToFavorites}
            />
            <OrderModal
                isOpen={isOrderModalOpen}
                onClose={handleCloseOrderModal}
                onSubmit={handleOrderPostSuccess}
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
                orderHeaderId={selectedOrder ? selectedOrder.orderHeaderId : null}
            />
        </div>
    );
};

export default ManagementPage;
