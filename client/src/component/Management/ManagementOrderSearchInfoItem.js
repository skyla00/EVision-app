import React from 'react';
import OrderStatus from '../OrderStatus'; // Import the OrderStatus component

const ManagementOrderSearchInfoItem = ({ managementOrder, index, headerKey, onSelectOrder, isSelected }) => {
    return (
        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }} // 선택된 행의 배경색 설정
            onClick={() => onSelectOrder(managementOrder)} >
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {/* If key is 'orderHeaderStatus', render the OrderStatus component */}
                    {managementOrder && managementOrder[key] !== undefined
                        ? key === 'orderHeaderStatus'
                            ? <OrderStatus status={managementOrder[key]} />
                            : managementOrder[key]
                        : '-'}
                </td>
            ))}
        </tr>
    );
};

export default ManagementOrderSearchInfoItem;