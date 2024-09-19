import React from 'react';
import OrderStatus from '../OrderStatus';

const ManagementOrderSearchInfoItem = ({ managementOrder, index, headerKey, onSelectOrder, isSelected, onToggleFavorite, favorites }) => {
    if (!managementOrder || !managementOrder.orderHeaderId) {
        return null;
    }

    const isFavorite = favorites.some(fav => fav?.orderHeaderId === managementOrder?.orderHeaderId);

    return (
        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }}
            onClick={() => onSelectOrder(managementOrder)}
        >
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {key === 'orderHeaderStatus' ? (
                        <OrderStatus status={managementOrder[key]} />
                    ) : key === 'favorite' ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // 버튼 클릭 시 row 선택 방지
                                onToggleFavorite(managementOrder, isFavorite); // 선택 여부와 상관없이 즐겨찾기에 추가
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