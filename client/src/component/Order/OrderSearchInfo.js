import './OrderSearchInfo.css';
import OrderSearchInfoList from './OrderSearchInfoList';

const OrderSearchInfo = ({ title, headers, orders = [] }) => {
    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`);
    }

    const headerKey = headers.map(header => header.value);

    return (
        <div className="order-search-info-container">
            <div className="search-info-header">
                {title && <div className="search-info-title">{title}</div>}
            </div>
            <div className="order-search-info-section">
                <OrderSearchInfoList 
                    orders={orders.length > 0 ? orders : []}
                    headerKey={headerKey} 
                    headers={headers} 
                />
            </div>
        </div>
    );
};

export default OrderSearchInfo;