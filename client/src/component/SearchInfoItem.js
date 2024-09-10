// const SearchInfoItem = ({ item, index, headerKey, onOpenModifyModal }) => {
//     return (
//         <tr className="search-info-tr" key={index} onClick={() => onOpenModifyModal(item)}>
//             {headerKey.map((key) => (
//                 <td className="search-info-td" key={key + index}>
//                     {key === 'id' ? index + 1 : item[key]}
//                 </td>
//             ))}
//         </tr>
//     );
// };

// export default SearchInfoItem;

const SearchInfoItem = ({ item, index, headerKey, onSelectItem, isSelected }) => {
    return (
        // <tr className="search-info-tr" key={index} onClick={() => onOpenModifyModal(item)}>'
        // <tr 
        //     className={`search-info-tr ${isSelected ? 'selected' : ''}`} // 선택된 상품이면 'selected' 클래스 추가
        //     onClick={() => onSelectItem(item)} // 클릭 시 상품 선택
        // >

        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }} // 선택된 행의 배경색 설정
            onClick={() => onSelectItem(item)} // 클릭 시 상품 선택
        >
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {item[key] !== undefined ? item[key] : '-'}
                </td>
            ))}
        </tr>
    );
};

export default SearchInfoItem;