import React from 'react';
import OrderStatus from '../OrderStatus';

const ManagementOrderSearchInfoItem = ({ managementOrder, index, headerKey, onSelectOrder, isSelected, onToggleFavorite, favorites, onOpenModal }) => {
    if (!managementOrder || !managementOrder.orderHeaderId) {
        return null;
    }

    const isFavorite = favorites.some(fav => fav?.orderHeaderId === managementOrder?.orderHeaderId);
    // 회색 즐겨찾기 버튼을 클릭했을 때 성공을 하면 즐겨찾기에 등록되었습니다. 하고 노란색 버튼으로 바뀌고. 
    // favorite?order-header-id=managementOrder.orderHeaderId 
    // 노란색 상태에서 한번 더 클릭을 했을 때에는 즐겨찾기가 해제되었습니다. 하고 회색 버튼으로 바뀜. 

    return (
        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }}
            onClick={() => onSelectOrder(managementOrder)}
        >
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}
                        onClick={key === 'orderHeaderId' ? (e) => {
                        e.stopPropagation(); // prevent row selection
                        onOpenModal(managementOrder.orderHeaderId); // trigger modal open
                    } : undefined}
                >
                    {key === 'orderHeaderStatus' ? (
                        <OrderStatus status={managementOrder[key]} />
                    ) : key === 'favorite' ? (
                            <img
                                src={isFavorite ? '/image/favorite.png' : '/image/favorite-grey.png'}
                                alt={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                                style={{ width: '30px', height: '30px', padding: 'none' }}
                                onClick={(e) => {
                                    e.stopPropagation(); // 버튼 클릭 시 row 선택 방지
                                    onToggleFavorite(managementOrder, isFavorite); // 선택 여부와 상관없이 즐겨찾기에 추가
                                }}
                            />
                    ) : (
                        managementOrder[key] || '-'
                    )}
                </td>
            ))}
        </tr>
    );
};

export default ManagementOrderSearchInfoItem;