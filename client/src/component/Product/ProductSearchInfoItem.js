import React from 'react';
import ItemStatus from '../ItemStatus'

const SearchInfoItem = ({ item, index, headerKey, onSelectItem, isSelected }) => {
    return (
        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }} // 선택된 행의 배경색 설정
            onClick={() => onSelectItem(item)} // 클릭 시 상품 선택
        >
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {item && item[key] !== undefined
                        ? key === 'itemStatus'
                            ? <ItemStatus status={item[key]} />
                            : item[key]
                        : '-'}
                </td>
            ))}
        </tr>
    );
};

export default SearchInfoItem;