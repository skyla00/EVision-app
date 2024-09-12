const SalesPriceSearchInfoItem = ({ salesPrice, index, headerKey, onSelectSalesPrice, isSelected }) => {
    return (
        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }} // 선택된 행의 배경색 설정
            onClick={() => onSelectSalesPrice(salesPrice)} // 클릭 시 판매업체 선택
        >
            {console.log(`Row ${index}: isSelected =`, isSelected)}
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {salesPrice && salesPrice[key] !== undefined ? salesPrice[key] : '-'}
                </td>
            ))}
        </tr>
    );
};

export default SalesPriceSearchInfoItem;