import React, { useState,useEffect } from 'react';
import './ProductPostModal.css';
import axios from 'axios';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
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
        const regex = /^[A-Z0-9]{1,20}$/;
        if (!regex.test(code)) {
            return '대문자 영어, 숫자, 최대 20자, 띄어쓰기 불가능'
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

    useEffect(() => {
        if(!isOpen) {
            setItemName('');
            setItemCode('');
            setSpecs('');
            setUnit('');
            setItemNameErrors('');
            setItemCodeErrors('');
            setItemCodeErrors('');
            setSpecsErrors('');
        }
    },[isOpen]);
    
    // 항목 추가
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

            const newItem = {
                itemName,
                itemCode,
                unit,
                itemStatus,
                specs,
            };

            const response = await axios.post(process.env.REACT_APP_API_URL + 'items', newItem, {
                headers: {
                    Authorization: `${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            onSubmit(response.data); // API 응답을 부모로 전달
            setItemName('');
            setItemCode('');
            setUnit('');
            setItemStatus('');
            setSpecs('');
            onClose(); // 등록 후 모달을 닫음

        } catch (error) {
            const errorMessage = error.response.data.message;

            if (errorMessage === "Item Exists") {
                alert("이미 해당 상품이 존재합니다. 상품명과 상품코드를 확인해주세요.");
              } else if (errorMessage === ""){
                alert(errorMessage); // Default alert for other errors
              }

        }
    };

    if (!isOpen) return null;


    return (
      <div className="modal">
        <div className="modal-content">
            <div className="pp-modal-header">
                <div className="pp-modal-title">상품 등록</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="pp-modal-input-section">
                <div className="pp-input-first-line">
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
                    />
                </div>
                <div className="pp-error-first-line">
                    <div className='item-name-error'>
                     {itemNameErrors && <p className="error-message">{itemNameErrors}</p>}
                    </div>
                    <div className='item-code-error'>
                     {itemCodeErrors && <p className="error-message">{itemCodeErrors}</p>}
                    </div>
                </div>
                <div className="pp-input-second-line">
                    <label>단위</label>
                    <select 
                        value={unit} 
                        onChange={(e) => setUnit(e.target.value)} >
                        <option value="" disabled hidden>단위</option>
                        <option value="EA">EA</option>
                        <option value="SET">SET</option>
                    </select>
                    <label>상태</label>
                    <select 
                        value={itemStatus} 
                        disabled
                        onChange={(e) => setItemStatus(e.target.value)}>
                        <option value="ON_SALE">판매중</option>
                        <option value="NOT_FOR_SALE">판매중지</option>
                    </select>
                </div>
                <div className="pp-input-third-line">
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
            <button className="pp-post-submit-button" onClick={handleSubmit}>등록</button>
        </div>
      </div>
    );
};

export default PostModal;