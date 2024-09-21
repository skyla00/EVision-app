import React, { useState, useEffect } from 'react';
import './CustomerPostModal.css';
import axios from 'axios';

const PostModal = ({ isOpen, onClose, onSubmit }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerCode, setCustomerCode] = useState('');
    const [manager, setManager] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerNameErrors, setCustomerNameErrors] = useState('');
    const [customerCodeErrors, setCustomerCodeErrors] = useState('');
    const [managerErrors, setManagerErrors] = useState('');
    const [customerPhoneErrors, setCustomerPhoneErrors] = useState('');
    const [customerEmailErrors, setCustomerEmailErrors] = useState('');
    const [customerAddressErrors, setCustomerAddressErrors] = useState('');
    const [customerAddressDetail, setCustomerAddressDetail] = useState('');
    const [postcode, setPostcode] = useState('');

    // 판매업체명 유효성 검증 
    const validateCustomerName = (name) => {
        const regex = /^[가-힣a-zA-Z]+(\s[가-힣a-zA-Z]+){0,29}$/;
        if (!regex.test(name)) {
            return '한글, 영어, 띄어쓰기 포함 최대 30자';
        }
        return '';
    }
    const handleCustomerNameChange = (e) => {
        const value = e.target.value;
        setCustomerName(value);
        const error = validateCustomerName(value);
        setCustomerNameErrors(error);
    }
    
    // 판매업체 코드 유효성 검증 
    const validateCustomerCode = (code) => {
        const regex = /^[A-Z]{2}$/;
        if(!regex.test(code)) {
            return '대문자 영어 2자'
        }
    }
    const handleCustomerCodeChange = (e) => {
        const value = e.target.value;
        setCustomerCode(value);
        const error = validateCustomerCode(value);
        setCustomerCodeErrors(error);
    }

    // 담당자 유효성 검증
    const validateManager = (manager) => {
        const regex = /^[가-힣]{1,10}$/;
        if(!regex.test(manager)) {
            return '한글 최대 10자, 띄어쓰기 불가능'
        }
    }
    const handleManagerChange = (e) => {
        const value = e.target.value;
        setManager(value);
        const error = validateManager(value);
        setManagerErrors(error);
    }

    // 판매업체 전화번호 검증
    const validateCustomerPhone = (phone) => {
        const regex = /^(010-\d{4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
        if(!regex.test(phone)) {
            return '전화번호 형식. 하이픈(-)포함'
        }
    }
    const handleCustomerPhoneChange = (e) => {
        const value = e.target.value;
        setCustomerPhone(value);
        const error = validateCustomerPhone(value);
        setCustomerPhoneErrors(error);
    }

    // 이메일 검증
    const validateCustomerEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regex.test(email)) {
            return 'example@example.com'
        }
    }
    const handleCustomerEmailChange = (e) => {
        const value = e.target.value;
        setCustomerEmail(value);
        const error = validateCustomerEmail(value);
        setCustomerEmailErrors(error);
    }

    // 주소 검증 
    const validateCustomerAddress = (address) => {
        const regex = /^[가-힣a-zA-Z0-9][가-힣a-zA-Z0-9\s-]{0,49}$/;
        if(!regex.test(address)) {
            return '한글, 영어, 숫자, 띄어쓰기 포함 50자'
        }
    }

    const handleCustomerAddressChange = (e) => {
        const value = e.target.value;
        setCustomerAddress(value);
        const error = validateCustomerAddress(value);
        setCustomerAddressErrors(error);
    }

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                // API에서 검색된 주소와 우편번호를 설정
                setPostcode(data.zonecode); // 우편번호
                setCustomerAddress(data.address); // 기본 주소
            }
        }).open();
    };


    useEffect(() => {
        if (!isOpen) {
            setCustomerName('');
            setCustomerCode('');
            setManager('');
            setCustomerPhone('');
            setCustomerEmail('');
            setCustomerAddress('');
            setPostcode('');
            setCustomerNameErrors('');
            setCustomerCodeErrors('');
            setManagerErrors('');
            setCustomerPhoneErrors('');
            setCustomerEmailErrors('');
            setCustomerAddressErrors('');
        }
    }, [isOpen]);

    // 항목 추가
    const handleSubmit = async () => {
        const nameError = validateCustomerName(customerName);
        const codeError = validateCustomerCode(customerCode);
        const managerError = validateManager(manager);
        const phoneError = validateCustomerPhone(customerPhone);
        const emailError = validateCustomerEmail(customerEmail);
        const addressError = validateCustomerAddress(customerAddress);

        if (!customerName || !manager || !customerPhone || !customerEmail || !customerAddress) {
            return alert('모든 입력 필드를 채워야 합니다');
        }

        if (nameError || codeError || managerError || phoneError || emailError || addressError) {
            setCustomerNameErrors(nameError);
            setCustomerCodeErrors(codeError);
            setManagerErrors(managerError);
            setCustomerPhoneErrors(phoneError);
            setCustomerEmailErrors(emailError);
            setCustomerAddressErrors(addressError);
            return alert('올바른 형식으로 입력해주세요');
        }

        try {
            let accessToken = window.localStorage.getItem('accessToken');


            const newCustomer = {
                customerCode,
                customerName,
                manager,
                customerPhone,
                customerEmail,
                customerAddress: `${customerAddress} ${customerAddressDetail}`,
                postcode,
            };

            const response = await axios.post(process.env.REACT_APP_API_URL + 'customers', newCustomer, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            onSubmit(response.data); // API 응답을 상위로 전달
            setCustomerName('');
            setCustomerCode('');
            setManager('');
            setCustomerPhone('');
            setCustomerEmail('');
            setCustomerAddress('');
            onClose();

        } catch (error) {
            const errorMessage = error.response.data.message;

            if (errorMessage === "Customer Exists") {
                alert("이미 해당 판매업체가 존재합니다. 판매업체명과 판매업체코드를 확인해주세요.");
              } else if (errorMessage === ""){
                alert(errorMessage); // Default alert for other errors
              }
        }
    };

    if (!isOpen) return null;


    return (
      <div className="modal">
        <div className="cp-modal-content">
            <div className="cp-modal-header">
                <div className="cp-modal-title">판매 업체 등록</div>
                <div className="modal-close" onClick={onClose}>&times;</div>
            </div>

            <div className="cp-modal-input-section">
                <div className="cp-input-first-line">
                    <label>판매업체명</label>
                    <input 
                        type="text" 
                        value={customerName} 
                        onChange={handleCustomerNameChange} 
                        placeholder="판매업체명" 
                    />
                    <label>판매업체 코드</label>
                    <input 
                        type="text" 
                        value={customerCode} 
                        onChange={handleCustomerCodeChange} 
                        placeholder="판매업체코드" 
                    />
                </div>
                <div className="cp-error-first-line">
                    <div className='customer-name-error'>
                     {customerNameErrors && <p className="error-message">{customerNameErrors}</p>}
                    </div>
                    <div className='customer-code-error'>
                     {customerCodeErrors && <p className="error-message">{customerCodeErrors}</p>}
                    </div>
                </div>
                <div className="cp-input-second-line">
                    <label>판매업체 담당자</label>
                    <input 
                        type="text" 
                        value={manager} 
                        onChange={handleManagerChange} 
                        placeholder="판매업체 담당자" 
                    />
                    <label>판매업체 연락처</label>
                    <input 
                        type="text" 
                        value={customerPhone} 
                        onChange={handleCustomerPhoneChange} 
                        placeholder="판매업체 연락처" 
                    />
                </div>
                <div className="cp-error-second-line">
                    <div className='manager-error'>
                     {managerErrors && <p className="error-message">{managerErrors}</p>}
                    </div>
                    <div className='customer-phone-error'>
                     {customerPhoneErrors && <p className="error-message">{customerPhoneErrors}</p>}
                    </div>
                </div>
                <div className="cp-input-third-line">
                    <label>판매업체 이메일</label>
                    <input 
                        type="email" 
                        value={customerEmail} 
                        onChange={handleCustomerEmailChange} 
                        placeholder="판매업체 이메일" 
                    />
                    <label>판매업체 주소</label>
                    <input 
                        type="text" 
                        value={customerAddress} 
                        readOnly
                        placeholder="판매업체 주소" 
                    />
                    <button className="address-button" onClick={handleAddressSearch}>주소 검색</button>
                </div>
                <div className="cp-error-third-line">
                    <div className='customer-email-error'>
                     {customerEmailErrors && <p className="error-message">{customerEmailErrors}</p>}
                    </div>
                </div>
                
                <div className="cp-input-fourth-line">
                    <label>우편번호</label>
                    <input type="text" value={postcode} placeholder="우편번호" readOnly/>
                    <label>상세주소</label>
                    <input 
                    type="text" value={customerAddressDetail} 
                    onChange={(e) => setCustomerAddressDetail(e.target.value)} 
                    placeholder="상세주소" />
                </div>
            </div>
            <button className="cp-post-submit-button" onClick={handleSubmit}>등록</button>
        </div>
      </div>
    );
};

export default PostModal;