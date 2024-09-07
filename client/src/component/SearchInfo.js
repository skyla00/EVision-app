import './SearchInfo.css';
import React, { useState, useEffect } from 'react';

const SearchInfo = ({ title, headers, items = [] }) => {
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
            <button className="order-button"> 등록 </button>
            </div>
            <div className="search-info-section">
                {/* <div className="search-info-subject">
                    <div className="cell">번호</div>
                    <div className="cell">주문번호</div>
                    <div className="cell">주문상태</div>
                    <div className="cell">상품코드</div>
                    <div className="cell">상품명</div>
                    <div className="cell">단위</div>
                    <div className="cell">수량</div>
                    <div className="cell">원가</div>
                    <div className="cell">판매가</div>
                    <div className="cell">할인율</div>
                    <div className="cell">할인금액</div>
                    <div className="cell">최종판매가</div>
                    <div className="cell">마진률</div>
                    <div className="cell">판매사원</div>
                    <div className="cell">주문일자</div>
                    <div className="cell">납품요청일자</div>
                    <div className="cell">납품확정일자</div>
                </div>
                <div className="search-info-show">
                    <div className="cell">1</div>
                    <div className="cell">21124</div>
                    <div className="cell">숭인요청</div>
                    <div className="cell">5872182</div>
                    <div className="cell">하만카돈에이스</div>
                    <div className="cell">1</div>
                    <div className="cell">2,200</div>
                    <div className="cell">27,970 원</div>
                    <div className="cell">75,000 원</div>
                    <div className="cell">10%</div>
                    <div className="cell">7,500 원</div>
                    <div className="cell">67,500 원</div>
                    <div className="cell">24%</div>
                    <div className="cell">박원일</div>
                    <div className="cell">2024.04.05.</div>
                    <div className="cell">2024.07.05.</div>
                    <div className="cell">2024.06.05.</div>
                </div> */}

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