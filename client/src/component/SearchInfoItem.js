const SearchInfoItem = ({ item, index, headerKey, onOpenModifyModal }) => {
    return (
        <tr className="search-info-tr" key={index} onClick={()=>{
            onOpenModifyModal(item);
        }}>
            {headerKey.map((key) => (
                (item[key] === undefined && key !== 'id') ? <></> : <td className="search-info-td" key={key + index}>{key === 'id' ? index + 1 : item[key]}</td>
            ))}
        </tr>
    );
};

export default SearchInfoItem;