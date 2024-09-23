import React, { useContext, useState } from 'react';
import OrderStatus from '../OrderStatus';
import { AuthContext } from '../../auth/AuthContext';
import './ManagementOrderSearchInfoItem.css'

const ManagementOrderSearchInfoItem = ({ managementOrder, index, headerKey, onSelectOrder, isSelected, onToggleFavorite, favorites, onOpenHistoryModal }) => {
    // AuthContext에서 userInfo 가져오기
    const { userInfo } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false); // hover 상태 관리

    // const handleOrderIdClick = () => {
    //     // e.stopPropagation(); // Prevent row selection
    //     onOpenHistoryModal(managementOrder.orderHeaderId); // Trigger modal open
    // };

    // userInfo 또는 favorites 안에 있는 orderHeaderId와 비교하여 즐겨찾기 상태 확인
    const isFavorite = userInfo?.data?.favorites?.some(fav => fav?.orderHeaderId === managementOrder?.orderHeaderId)
        || favorites?.some(fav => fav?.orderHeaderId === managementOrder?.orderHeaderId);

    return (
        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }}
            onClick={() => onSelectOrder(managementOrder)}
        >
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index} >
                    {key === 'orderHeaderId' ? (
                        <span
                            onClick={(e) =>{
                                onOpenHistoryModal(managementOrder.orderHeaderId);
                                e.stopPropagation();
                            }} // orderHeaderId 클릭 시 핸들러 호출
                            className={isHovered ? 'underline-text' : ''} // hover 시 볼드체 적용
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setIsHovered(true)} // 마우스가 올라갔을 때
                            onMouseLeave={() => setIsHovered(false)} // 마우스가 벗어났을 때
                        >
                            {managementOrder[key] || '-'}
                        </span>
                    ) : key === 'orderHeaderStatus' ? (
                        <OrderStatus status={managementOrder[key]} />
                    ) : key === 'favorite' ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // 버튼 클릭 시 row 선택 방지
                                onToggleFavorite(managementOrder, isFavorite); // 즐겨찾기 추가/제거
                            }}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <img
                                src={isFavorite ? '/image/favorite.png' : '/image/favorite-grey.png'}
                                alt={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                                style={{ width: '30px', height: '30px', padding: 'none' }}
                            />
                        </button>
                    ) : (
                        managementOrder[key] || '-'
                    )}
                </td>
            ))}
        </tr>
    );
};

export default ManagementOrderSearchInfoItem;
