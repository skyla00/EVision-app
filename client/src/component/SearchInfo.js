import './SearchInfo.css';
import SearchInfoList from './SearchInfoList';

const SearchInfo = ({ title, headers, items = [], onOpenPostModal, onOpenModifyModal, onSelectItem, selectedItem }) => {
    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`);
    }

    //headers 배열에서 'value' 값 추출
    const headerKey = headers.map(header => header.value);

    // 수정 버튼을 클릭했을 때 선택된 상품이 있는지 확인
    const handleModifyClick = () => {
        if (selectedItem) {
            onOpenModifyModal(selectedItem); // 선택된 상품이 있을 때만 수정 모달 열기
        } else {
            alert('수정할 상품을 선택하세요.'); // 선택된 상품이 없을 때 경고
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
                <SearchInfoList 
                    items={items} headerKey={headerKey} headers={headers} 
                    onOpenModifyModal={onOpenModifyModal} 
                    onSelectItem={onSelectItem} 
                    selectedItem={selectedItem} // 선택된 상품 전달
                />
            </div>
        </div>
    );
};

export default SearchInfo;