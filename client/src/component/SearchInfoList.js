const SearchInfoList = ({ items = [], headerKey, headers }) => {
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
                    <tr className="search-info-tr" key={index}>
                        {headerKey.map((key) => (
                            (item[key] === undefined && key !== 'id') ? <></> : <td className="search-info-td" key={key + index}>{key === 'id' ? index + 1 : item[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SearchInfoList;