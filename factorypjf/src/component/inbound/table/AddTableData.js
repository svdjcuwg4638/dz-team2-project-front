import React, { useReducer, useRef, useState } from "react";
import axios from "axios";

import tableStyle from "style/layout/dataTable/table.module.css";
import HelperModal from "component/common/helper/HelperModal";

//도움창 단축키 코드
const HELPER_KEY = 113;

export default function AddTableData({ onUpdateData,headers,onGridTrigger }) {
  //입력된Data저장
  const [inputdata,setInputdata] = useState([]);

  //행 추가 state
  const [rowCount, setrowCount] = useState(10);
  const rowCountArr = Array.from({ length: rowCount });
  //행 추가 handler
  const addRowHandler = () => {
    setrowCount(rowCount + 1);
  };

  //focus된 행 state
  const [focusRow, setFocusRow] = useState();

  const modalInit = {
    showModal: false,
    codeValue: "", 
    codeName: "",
  };
  //모달 끄고 닫는 핸들러
  const onModalHanlder = (codeValue, codeName) => {
    // console.log('onmodalHandler',codeValue)
    dispatch({ type: "ON_MODAL", codeValue, codeName });
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
        //코드가 내부적으로 가지는 값 (ex: partner)
        codeValue: action.codeValue,
        //출력할 이름 (ex: 협력사)
        codeName: action.codeName,
      };
    }
    if (action.type === "OFF_MODAL") {
      return { showModal: false, codeValue: "", codeName: "" };
    }
  };
  const [modalState, dispatch] = useReducer(modalReducer, modalInit);

  const [currentCol, setCurrentCol] = useState();
  //도움창 단축키 handler
  const keyUpHandler = (e, colInfo) => {
    if (e.which === HELPER_KEY && colInfo.helper) {
      console.log(e, colInfo);
      //도움창을 연 컬럼 저장
      setCurrentCol(e.target);
      //모달 켜기
      onModalHanlder(colInfo.value, colInfo.text);
    } else if(!colInfo.helper){
      console.log("도움창이 제공되지 않는 코드입니다.");
    }
  };

  //코드 선택
  const selectCodeHandler = (codeRow) => {
    // const currentFocus = currentCol
    // let relatedCol;
    // console.log(currentCol)
    // //고른게 생산품코드였으면
    // if(modalState.codeName==='생산품코드'){
    //   //생산품 컬럼의 idx 찾아서
    //   relatedCol=headers.findIndex(header=>header.text==='생산품');
    //   //input<td<tr의 컬럼의 값 변경
    //   console.log(currentFocus.parentElement.parentElement.childNodes[relatedCol])
    //   currentFocus.parentElement.parentElement.childNodes[relatedCol].value=codeRow.name;
    // }else{
      //테이블에 선택한 값 넣기
      const target = currentCol;
      target.value = codeRow;
    // }

  };

  //onBlurHandler
  const onBlurHandler=(e,header)=>{
    onGridTrigger(e,header)
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

      {/* ----------------------------------------- */}

      
      {rowCountArr.map((key, idx) => (
        // 행 추가를 위해 rowCount만큼 tr 생성
        <tr
          key={idx}
          className={focusRow === idx ? tableStyle["focused-row"] : ""}
        >
          {headers.map((header,headerIdx) =>
            // selectBox 컬럼
            header.value === "select" ? (
              <td key={headerIdx}>
                <input type="checkbox"></input>
              </td>
            ) : // 순번 컬럼
            header.value === "index" ? (
              <td key={headerIdx}>{idx + 1}</td>
            ) : (
              <td key={headerIdx}>
                {/* grid02 trigger 여부에 따라 onBlur 핸들러 유무 결정 */}
                {header.gridTrigger ? (
                  <input
                    // onKeyUp={(e) => {
                    //   keyUpHandler(e, header );
                    // }}
                    // onBlur={(e)=>{
                    //   onBlurHandler(e,header)}}
                  ></input>
                ) : (
                  <input
                    onKeyUp={(e) => {
                      keyUpHandler(e, header);
                    }}
                  ></input>
                )}
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
