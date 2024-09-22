import React, { useContext } from 'react';
import axios from 'axios';
import SalesPriceSearchInfoList from './SalesPriceSearchInfoList';
import { AuthContext } from '../../auth/AuthContext'; // AuthContext import

const SalesPriceSearchInfo = ({ title, headers, salesPrices = [], onOpenPostModal, onOpenModifyModal, onSelectSalesPrice, selectedSalesPrice }) => {
    const { userInfo } = useContext(AuthContext); // AuthContext에서 userInfo 가져오기

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
    const handleDeleteClick = async () => {
        if (selectedSalesPrice) {
            let message = window.confirm('정말 삭제하시겠습니까?');
            if (message) {
                let accessToken = window.localStorage.getItem('accessToken');
                try {
                    const response = await axios.delete(
                        process.env.REACT_APP_API_URL + 'sales-prices' + '/' + selectedSalesPrice.salesPriceId,
                        {
                            headers: {
                                Authorization: `${accessToken}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    if (response.status === 204) {
                        window.location.reload();
                    }
                } catch (error) {
                    if (error.response) {
                        const { status, message } = error.response.data;
    
                        // 상태 코드와 메시지에 따라 다른 메시지 표시
                        if (status === 404 && message === 'Invalid Delete Request') {
                            alert('이 판매가는 삭제할 수 없습니다. 최근 판매가를 확인해주세요.');
                        } else {
                            alert(`에러 발생: ${message}`);
                        }
                    } else {
                        alert('판매가 삭제에 실패했습니다.');
                    }
                }
            }
        } else {
            alert('삭제할 판매가를 선택하세요.'); // 선택된 상품이 없을 때 경고
        }
    };

    return (
        <div className="search-info-container">
            <div className="search-info-header">
                {title && <div className="search-info-title">{title}</div>}
                <div className="button-container">
                    {userInfo?.data?.position === "팀장" && (
                        <>
                            <button className="order-button" onClick={onOpenPostModal}> 등록 </button>
                            <button className="modify-button" onClick={handleModifyClick}> 수정 </button>
                            <button className="modify-button" onClick={handleDeleteClick}> 삭제 </button>
                        </>
                    )}
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