import SearchInfoItem from "./SearchInfoItem";

const SearchInfoList = ({ items = [], headerKey, headers, onOpenModifyModal }) => {
    return (
        <table className="search-info-table">
            <thead className="search-info-thead">
                <tr className="search-info-tr">
                    {headers.map((key) => (
                        <th className="search-info-th" key={key.text}>{key.text}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <SearchInfoItem item={item} headerKey={headerKey} index={index} onOpenModifyModal={onOpenModifyModal}/>
                ))}
            </tbody>
        </table>
    );
};

export default SearchInfoList;