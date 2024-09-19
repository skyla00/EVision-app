import React, { useEffect, useState } from 'react';
import './ProductModifyModal.css';
import axios from 'axios';

const ProductModifyModal = ({ isOpen, onClose, onSubmit, item }) => {
    console.log(isOpen);
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [unit, setUnit] = useState('');
    const [itemStatus, setItemStatus] = useState('');
    const [specs, setSpecs] = useState('');
    const [itemNameErrors, setItemNameErrors] = useState('');
    const [itemCodeErrors, setItemCodeErrors] = useState('');
    const [specsErrors, setSpecsErrors] = useState('');

    const validateItemName = (name) => {
        const regex = /^[A-Z0-9]+(\s[A-Z0-9]+){0,29}$/;
        if (!regex.test(name)) {
            return '대문자 영어, 숫자, 최대 30자, 띄어쓰기 가능';
        }
        return '';
    };
    const handleItemNameChange = (e) => {
        const value = e.target.value;
        setItemName(value);
        const error = validateItemName(value);
        setItemNameErrors(error);
    };

    const validateItemCode = (code) => {
        const regex = /^[A-Z0-9]{1,11}$/;
        if (!regex.test(code)) {
            return '대문자 영어, 숫자, 최대 11자, 띄어쓰기 불가능'
        }
    }

    const handleItemCodeChange = (e) => {
        const value = e.target.value;
        setItemCode(value);
        const error = validateItemCode(value);
        setItemCodeErrors(error);
    };

    const validateSpecs = (specs) => {
        const regex = /^.{0,255}$/;
        if (!regex.test(specs)) {
            return '최대 255자';
        }
    }

    const handleSpecsChange = (e) => {
        const value = e.target.value;
        setSpecs(value);
        const error = validateSpecs(value);
        setSpecsErrors(error);
    }

    // 모달이 열릴 때 선택된 아이템 정보를 입력 필드에 채움
    useEffect(() => {
        if (isOpen && item !== undefined) {
            setItemName(item.itemName);
            setItemCode(item.itemCode);
            setUnit(item.unit);
            setItemStatus(item.itemStatus);
            setSpecs(item.specs);
            setItemNameErrors('');
            setItemCodeErrors('');
            setItemNameErrors('');
            setSpecsErrors('');
        }
    }, [isOpen, item]);

    const handleSubmit = async () => {
        const nameError = validateItemName(itemName);
        const codeError = validateItemCode(itemCode);
        const specsError = validateSpecs(specs);

        if (nameError || codeError || specsError) {
            setItemNameErrors(nameError);
            setItemCodeErrors(codeError);
            setSpecsErrors(specsError);
            return;
        }

        try {
            let accessToken = window.localStorage.getItem('accessToken');
            console.log('Access Token:', accessToken);

            const updatedItem = {
                itemName,
                itemCode,
                unit,
                itemStatus,
                specs,
            };

            const response = await axios.patch(process.env.REACT_APP_API_URL + 'items' + '/' + updatedItem.itemCode,
                updatedItem, {
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
            onSubmit(response.data);
            setItemName('');
            setItemCode('');
            setUnit('');
            setItemStatus('');
            setSpecs('');
            onClose();
        } catch (error) {
            console.error('상품 등록 실패: ', error);
        }
    };
                    

    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
            <div className="pd-modal-header">
                <div className="pd-modal-title">상품 정보 수정</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>
            <div className="pm-modal-input-section">
                <div className="pm-input-first-line">
                    <label>상품명</label>
                    <input 
                        type="text" 
                        value={itemName} 
                        onChange={handleItemNameChange} 
                        placeholder="상품명" 
                    />
                    <label>상품코드</label>
                    <input 
                        type="text" 
                        value={itemCode} 
                        onChange={handleItemCodeChange} 
                        placeholder="상품코드" 
                        readOnly
                    />
                </div>
                <div className="pm-error-first-line">
                    <div className='item-name-error'>
                     {itemNameErrors && <p className="error-message">{itemNameErrors}</p>}
                    </div>
                    <div className='item-code-error'>
                     {itemCodeErrors && <p className="error-message">{itemCodeErrors}</p>}
                    </div>
                </div>
                <div className="pm-input-second-line">
                    <label>단위</label>
                    <select 
                        value={unit} 
                        onChange={(e) => setUnit(e.target.value)} >
                        <option value="EA">EA</option>
                        <option value="SET">SET</option>
                    </select>
                    <label>상태</label>
                    <select 
                        value={itemStatus} 
                        onChange={(e) => setItemStatus(e.target.value)}>
                        <option value="ON_SALE">판매중</option>
                        <option value="NOT_FOR_SALE">판매중지</option>
                    </select>
                </div>
                <div className="pm-input-third-line">
                <label>정보</label>
                    <input 
                        type="text" 
                        value={specs} 
                        onChange={handleSpecsChange} 
                        placeholder="정보" 
                    />
                </div>
                <div className='pp-error-second-line'>
                     {specsErrors && <p className="error-message">{specsErrors}</p>}
                </div>
            </div>
            <button className="pd-post-submit-button" onClick={handleSubmit}>수정</button>
        </div>
      </div>
    );
};

export default ProductModifyModal;