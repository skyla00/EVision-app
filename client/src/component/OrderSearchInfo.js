import './OrderSearchInfo.css';
import OrderSearchInfoList from './OrderSearchInfoList';

const OrderSearchInfo = ({ title, headers, orders = [], onOpenOrderModal }) => {
    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`);
    }

    const headerKey = headers.map(header => header.value);

    return (
        <div className="search-info-container">
            <div className="search-info-header">
                {title && <div className="search-info-title">{title}</div>}
                <div className="button-container">
                    <button className="order-button" onClick={onOpenOrderModal}> 등록 </button> 
                </div>
            </div>
            <div className="search-info-section">
                <OrderSearchInfoList 
                    customers={orders.length > 0 ? orders : []}
                    headerKey={headerKey} 
                    headers={headers} 
                />
            </div>
        </div>
    );
};

export default OrderSearchInfo;