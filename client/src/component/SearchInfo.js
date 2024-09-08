import React, { useState, useEffect } from 'react';
import './SearchInfo.css';

const SearchInfo = ({ title, headers, items = [],  onOpenPostModal, onOpenModifyModal }) => {
    // const [items, setItems] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get('');
    //             setItems(response.data);
    //         } catch (err) {
    //             setError('데이터를 불러오는 데 실패했습니다.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (loading) return <div>로딩 중...</div>;
    // if (error) return <div>{error}</div>;

    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`)
    }

    const headerKey = headers.map((header) => header.value);


    return (
        <div className="search-info-container">
            <div className="search-info-header"> {}
            {title && <h2 className="search-info-title">{title}</h2>}
                <div className="button-container">
                    <button className="order-button" onClick={onOpenPostModal}> 등록 </button> 
                    <button className="modify-button" onClick={onOpenModifyModal}> 수정 </button> 
                </div>
            </div>
            <div className="search-info-section">
                <table className="search-info-table">
                    <thead className="search-info-thead">
                        <tr className="search-info-tr">
                            {headers.map((header) => (
                                <th className="search-info-th" key={header.text}>{header.text}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr className="search-info-tr" key={index}>
                                {headerKey.map((key) => (
                                    <td className="search-info-td" key={key + index}>{item[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default SearchInfo;