import React, { useContext } from 'react';
import './ProductSearchInfo.css';
import axios from 'axios';
import ProductSearchInfoList from './ProductSearchInfoList';
import { AuthContext } from '../../auth/AuthContext'; // AuthContext import

const ProductSearchInfo = ({ title, headers, items = [], onOpenPostModal, onOpenModifyModal, onSelectItem, selectedItem }) => {
    const { userInfo } = useContext(AuthContext); // AuthContext에서 userInfo 가져오기

    if (!headers || !headers.length) {
        throw new Error(`<SearchInfo /> headers is required.`);
    }

    // headers 배열에서 'value' 값 추출
    const headerKey = headers.map(header => header.value);

    // 수정 버튼을 클릭했을 때 선택된 상품이 있는지 확인
    const handleModifyClick = () => {
        if (selectedItem) {
            onOpenModifyModal(selectedItem); // 선택된 상품이 있을 때만 수정 모달 열기
        } else {
            alert('수정할 상품을 선택하세요.'); // 선택된 상품이 없을 때 경고
        }
    };
    const handleDeleteClick = async () => {
        if (selectedItem) {
            let message = window.confirm('정말 삭제하시겠습니까?')
            if(message) {
                let accessToken = window.localStorage.getItem('accessToken');
                try {
                    const response = await axios.delete(process.env.REACT_APP_API_URL + 'items' + '/' + selectedItem.itemCode,
                        {   headers: {
                                Authorization: `${accessToken}`,
                                'Content-Type': 'application/json',
                            }
                        });
                        if (response.status === 204) {
                            window.location.reload();
                        }
                } catch (error) { 
                    console.error(error.response.data.message);
                }

            }
        } else {
            alert('삭제할 상품을 선택하세요.'); // 선택된 상품이 없을 때 경고
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
                <ProductSearchInfoList 
                    items={items} 
                    headerKey={headerKey} 
                    headers={headers} 
                    onOpenModifyModal={onOpenModifyModal} 
                    onSelectItem={onSelectItem} 
                    selectedItem={selectedItem} // 선택된 상품 전달
                />
            </div>
        </div>
    );
};

export default ProductSearchInfo;
