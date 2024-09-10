// import SearchInfoItem from "./SearchInfoItem";

// const SearchInfoList = ({ items = [], headerKey, headers, onOpenModifyModal }) => {
//     return (
//         <table className="search-info-table">
//             <thead className="search-info-thead">
//                 <tr className="search-info-tr">
//                     {headers.map((key) => (
//                         <th className="search-info-th" key={key.text}>{key.text}</th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {items.map((item, index) => (
//                     <SearchInfoItem item={item} headerKey={headerKey} index={index} onOpenModifyModal={onOpenModifyModal}/>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default SearchInfoList;


import React from 'react';
import './SearchInfoList.css';
import SearchInfoItem from './SearchInfoItem';

const SearchInfoList = ({ items, headerKey, headers, onOpenModifyModal, onSelectItem, selectedItem }) => {
    return (
        <table className="search-info-table">
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header.value}>{header.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* 필터링된 items 목록을 SearchInfoItem에 전달 */}
                {items.map((item, index) => (
                    <SearchInfoItem 
                    key={index} 
                    item={item} 
                    index={index} 
                    headerKey={headerKey} 
                    onSelectItem={onSelectItem} // 상품 선택 함수만 전달
                    isSelected={selectedItem?.itemCode === item.itemCode} // 선택된 상품인지 확인
                />
                ))}
            </tbody>
        </table>
    );
};

export default SearchInfoList;