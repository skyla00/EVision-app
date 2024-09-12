import React from 'react';

const ManagementOrderSearchInfoItem = ({ managementOrder, index, headerKey }) => {
    console.log(managementOrder);
    console.log('headerKey:', headerKey, 'index:', index, 'value:', managementOrder[index]);
    return (
        <tr>
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {/* order가 존재하고 해당 키의 값이 정의되어 있으면 값을 출력, 그렇지 않으면 '-' 출력 */}
                    {managementOrder && managementOrder[key] !== undefined ? managementOrder[key] : '-'}
                </td>
            ))}
        </tr>
    );
};

export default ManagementOrderSearchInfoItem;