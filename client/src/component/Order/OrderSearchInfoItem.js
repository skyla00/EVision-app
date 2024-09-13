import React from 'react';
import OrderStatus from '../OrderStatus';

const OrderSearchInfoItem = ({ order, index, headerKey }) => {
    return (
        <tr>
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {/* order가 존재하고 해당 키의 값이 정의되어 있으면 값을 출력, 그렇지 않으면 '-' 출력 */}
                    {order && order[key] !== undefined
                        ? key === 'orderHeaderStatus'
                            ? <OrderStatus status={order[key]} />
                            : order[key]
                        : '-'}
                </td>
            ))}
        </tr>
    );
};

export default OrderSearchInfoItem;