const OrderSearchInfoItem = ({ order, index, headerKey}) => {
    return (
        <tr>
            {headerKey.map((key) => (
                <td className={`search-info-td ${key}`} key={key + index}>
                    {order && order[key] !== undefined ? order[key] : '-'}
                </td>
            ))}
        </tr>
    );
};

export default OrderSearchInfoItem;