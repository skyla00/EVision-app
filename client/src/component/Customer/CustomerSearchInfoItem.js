const CustomerSearchInfoItem = ({ customer, index, headerKey, onSelectCustomer, isSelected }) => {
    return (
        <tr
            style={{ backgroundColor: isSelected ? '#f0f0f0' : 'transparent' }} // 선택된 행의 배경색 설정
            onClick={() => onSelectCustomer(customer)} // 클릭 시 판매업체 선택
        >
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {customer && customer[key] !== undefined ? customer[key] : '-'}
                </td>
            ))}
        </tr>
    );
};

export default CustomerSearchInfoItem;