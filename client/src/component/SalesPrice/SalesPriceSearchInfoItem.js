const SalesPriceSearchInfoItem = ({ salesPrice, index, headerKey, onSelectSalesPrice, isSelected }) => {
    return (
        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }} // 선택된 행의 배경색 설정
            onClick={() => onSelectSalesPrice(salesPrice)} // 클릭 시 판매가 선택
        >
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {salesPrice && salesPrice[key] !== undefined ? (key === 'salesAmount' ? salesPrice[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : salesPrice[key]) : '-'}
                </td>
            ))}
        </tr>
    );
};

export default SalesPriceSearchInfoItem;