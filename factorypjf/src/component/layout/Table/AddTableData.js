import React, { useReducer, useRef, useState } from "react";

import tableStyle from "style/layout/dataTable/Table.module.css";
import addStyle from "style/layout/dataTable/AddTableData.module.css";
import HelperModal from "component/common/helper/HelperModal";

const HELPER_KEY=113

export default function AddTableData({ headers }) {
  //행 추가 state
  const [rowCount, setrowCount] = useState(3);
  const rowCountArr = Array.from({ length: rowCount });
  //행 추가 handler
  const addRowHandler = () => {
    setrowCount(rowCount + 1);
  };

  //focus된 행 state
  const [focusRow, setFocusRow] = useState();


  const modalInit = {
    showModal: false,
    codeValue: "", //
    codeName: "",
  };
  //모달 끄고 닫는 핸들러
  const onModalHanlder = (codeValue, codeName ) => {
    // console.log('onmodalHandler',codeValue)
    dispatch({ type: "ON_MODAL", codeValue:codeValue, codeName:codeName });
  };
  const offModalHandler = () => {
    dispatch({ type: "OFF_MODAL" });
  }; 
  //모달 reducer (on/off, 코드 타입)
   const modalReducer = (state, action) => {
    if (action.type === "ON_MODAL") {
      console.log(action);
      return {
        showModal: true,
        codeValue: action.codeValue,
        codeName: action.codeName,
      };
    }
    if (action.type === "OFF_MODAL") {
      return { showModal: false, codeValue: "", codeName: "" };
    }
  };
  const [modalState, dispatch] = useReducer(modalReducer, modalInit);

  const [currentCol,setCurrentCol]=useState();
  //도움창 단축키 handler
  const keyUpHandler=(e,colInfo)=>{
    
    if(e.which===HELPER_KEY&&colInfo.helper){
      console.log(e,colInfo)
      setCurrentCol(e.target)
      onModalHanlder(colInfo.value,colInfo.text)
    }
  }

  //코드 선택
  const selectCodeHandler = (code)=>{
    const target=currentCol;
    target.value=code;
  }

  return (
    <>
    
    {modalState.showModal && (
          <HelperModal
            modalState={modalState}
            offModal={offModalHandler}
            // onSearchCode={searchHandler}
            onSelectCode={selectCodeHandler}
          />
        )}
      {rowCountArr.map((key, idx) => (
        // 행 추가를 위해 rowCount만큼 tr 생성
        <tr
          key={idx}
          className={focusRow === idx ? tableStyle["focused-row"] : ""}
        >
          {headers.map((header) =>
            // selectBox 컬럼
            header.value === "select" ? (
              <td key={header.value + idx}>
                <input type="checkbox"></input>
              </td>
            // 순번 컬럼
            ) : header.value === "index" ? (
              <td key={header.value + idx}>{idx + 1}</td>
            ) : (
              <td key={header.value + idx}>
                <input
                  // onFocus={(e) => {
                  //   focusHandler(idx);
                  // }}
                  onKeyUp={(e)=>{keyUpHandler(e,header)}}
                ></input>
              </td>
            )
          )}
        </tr>
      ))}
      <tr>
        <td colSpan={headers.length}>
          <button className={tableStyle.btn_add} onClick={addRowHandler}>
            +
          </button>
        </td>
      </tr>
    </>
  );
}
