import './SalesPriceSearchInfo.css';
import SalesPriceSearchInfoList from './SalesPriceSearchInfoList';

const SalesPriceSearchInfo = ({ title, headers, salesPrices = [], onOpenPostModal, onOpenModifyModal, onSelectSalesPrice, selectedSalesPrice }) => {
    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`);
    }

    //headers 배열에서 'value' 값 추출
    const headerKey = headers.map(header => header.value);

    // 수정 버튼을 클릭했을 때 선택된 판매가가 있는지 확인
    const handleModifyClick = () => {
        if (selectedSalesPrice) {
            onOpenModifyModal(selectedSalesPrice); // 선택된 판매가가 있을 때만 수정 모달 열기
        } else {
            alert('수정할 판매가를 선택하세요.'); // 선택된 판매가가 없을 때 경고
        }
    };

    return (
        <div className="search-info-container">
            <div className="search-info-header">
                {title && <div className="search-info-title">{title}</div>}
                <div className="button-container">
                    <button className="order-button" onClick={onOpenPostModal}> 등록 </button> 
                    <button className="modify-button" onClick={handleModifyClick}> 수정 </button> 
                </div>
            </div>
            <div className="search-info-section">
                <SalesPriceSearchInfoList 
                    salesPirces={salesPrices.length > 0 ? salesPrices : []}
                    headerKey={headerKey} 
                    headers={headers} 
                    onOpenModifyModal={onOpenModifyModal} 
                    onSelectSalesPrice={onSelectSalesPrice} 
                    selectedSalesPrice={selectedSalesPrice}
                />
            </div>
        </div>
    );
};

export default SalesPriceSearchInfo;