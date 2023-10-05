import React, { useReducer, useState } from "react";

import tableStyle from "style/layout/dataTable/table.module.css";
import listStyle from "style/layout/dataTable/listTableData.module.css";
import HelperModal from "component/common/helper/HelperModal";

const HELPER_KEY = 113;

export default function ListTable({ headers, items }) {
  const modalInit = {
    showModal: false,
    codeValue: "", //
    codeName: "",
  };
  //모달 끄고 닫는 핸들러
  const onModalHanlder = ( codeValue, codeName) => {
    // console.log('onmodalHandler',value)
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
        codeValue: action.codeValue,
        codeName: action.codeName,
      };
    }
    if (action.type === "OFF_MODAL") {
      return { showModal: false, codeValue: "", codeName: "" };
    }
  };
  const [modalState, dispatch] = useReducer(modalReducer, modalInit);

  const [currentCol, setCurrentCol] = useState();
  const keyUpHandler = (e, colInfo) => {
    if (e.which === HELPER_KEY && colInfo.helper) {
      console.log(e, colInfo);
      setCurrentCol(e.target);
      onModalHanlder(colInfo.value, colInfo.text);
    }
  };
  return (
    <>
      {modalState.showModal && (
        <HelperModal
          modalState={modalState}
          offModal={offModalHandler}
          // onSearchCode={searchHandler}
        />
      )}
      {items.map((item, idx) => (
        <tr key={idx}>
          {headers.map((header) =>
            //선택 컬럼
            header.value === "select" ? (
              <td key={header.value + idx}>
                <input type="checkbox"></input>
              </td>
            ) : //순번 컬럼
            header.value === "index" ? (
              <td key={header.value + idx}>{idx + 1}</td>
            ) : (
              <td key={header.value + idx}>
                {/* headerKey를 key로 가진 item 값을 출력 */}
                <input
                  defaultValue={item[header.value]}
                  onKeyUp={(e) => {
                    keyUpHandler(e,header);
                  }}
                ></input>
              </td>
            )
          )}
        </tr>
      ))}
    </>
  );
}
