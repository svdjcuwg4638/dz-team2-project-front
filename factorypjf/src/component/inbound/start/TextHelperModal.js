import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TextHelperModal({ handleModalSelect, handleModalclose, activeInput }) {
    
    const [ModalData, setModalData] = useState({
        title: "",
        table_name: "",
        type: 1,
    })

    const [inputValue, setInputValue] = useState(''); // 사용자 입력 값을 관리할 상태

    const handleSearch = async () => {
        const baseURL = "http://localhost:9093";
        try {
            const response = await axios.post(baseURL+'/bound/helper', {
                tableName: ModalData.table_name,
                inputValue: inputValue,
                type: ModalData.type
            });

            // 서버에서 받은 응답을 처리하는 코드 (예: 데이터를 상태에 저장)
            console.log(response.data);

        } catch (error) {
            console.error("There was an error!", error);
        }
    }

    const handleItemClick = (value) => {
        handleModalSelect(value);
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    };

    useEffect(()=>{
    if(activeInput=='partner_code'){
        setModalData({
            title: "거래처",
            table_name: "partner",
            type: "",
        })
    }
    if(activeInput=='item_code'){
        console.log('item_code Redux 실행할꼬야')
    }
},[])

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h1>{ModalData.title}도움창</h1>
                <select onChange={e => setModalData(prevData => ({ ...prevData, type: e.target.value }))}>
                    <option value="1">전체</option>
                    <option value="2">{ModalData.title}코드</option>
                    <option value="3">{ModalData.title}이름</option>
                </select>
                <input value={inputValue} onChange={e => setInputValue(e.target.value)}></input>
                <button onClick={handleSearch}>조회</button>
                <hr></hr>
    
                <button onClick={handleModalclose}>Close</button>
            </div>
        </div>
    );
    
}

export default TextHelperModal;