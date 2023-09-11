import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import axios from "axios";

import HelperModal from "component/common/helper/HelperModal";
import { getAxios } from "function/axiosFuction";

import tableStyle from "style/layout/dataTable/Table.module.css";
import addStyle from "style/layout/dataTable/AddTableData.module.css";

//도움창 단축키 코드
const HELPER_KEY = 113;

export default function AddTableData({ headers, onGridTrigger }) {
  const DEFAULT_ROW = 3;

  // const initRowObj = useMemo(() => {
  //   //header에 맞는 빈 item 객체 만들기
  //   let obj = {};
  //   headers.forEach((header) => {
  //     obj[header.value] = "";
  //   });
  //   return obj;
  // }, [headers]);

  // const initTableItems = useMemo(() => {
  //   //default row 수만큼 테이블 row 만들어지도록 배열 생성
  //   let tempArr = [];
  //   for (let i = 0; i < DEFAULT_ROW; i++) {
  //     tempArr.push(JSON.parse(JSON.stringify(initRowObj)));
  //   }
  //   return tempArr;
  // }, [initRowObj]);

  //행 추가 handler

  const [tableItems, setTableItems] = useState(
    Array.from({ length: DEFAULT_ROW })
  );

  const addRowHandler = () => {
    setTableItems([...tableItems, {}]);
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
  const keyUpHandler = (e, colInfo, coordinate) => {
    if (e.which === HELPER_KEY && colInfo.helper) {
      console.log(e, colInfo);
      //도움창을 연 컬럼 좌표 저장
      setCurrentCol({ ...coordinate });
      //모달 켜기
      onModalHanlder(colInfo.value, colInfo.text);
    } else if (e.which === HELPER_KEY && !colInfo.helper) {
      console.log("도움창이 제공되지 않는 코드입니다.");
    }
  };

  //코드 선택
  const selectCodeHandler = (codeRow) => {
    console.log(codeRow);
    console.log(tableItems);
    console.log(currentCol);
    console.log(modalState.codeValue);

    let copyItems = JSON.parse(JSON.stringify(tableItems));

    for (let key in codeRow) {
      let itemKey = "";
      //코드데이터면 key가 ~~Code, 아니면 value 그대로
      //ex) teamCode, team
      if (!key.toLowerCase().includes("code")) {
        itemKey = modalState.codeValue;
      } else {
        itemKey = key;
      }

      if (copyItems[currentCol.row]) {
        copyItems[currentCol.row] = {
          ...copyItems[currentCol.row],
          [itemKey]: codeRow[key],
        };
      } else {
        copyItems[currentCol.row] = { [itemKey]: codeRow[key] };
      }
    }
    setTableItems(copyItems);
    console.log(tableItems)
  };

  //onBlurHandler
  const onBlurHandler = (e, header) => {
    onGridTrigger(e, header);
  };

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
      {tableItems.map((item, idx) => (
        // 행 추가를 위해 rowCount만큼 tr 생성
        <tr
          key={idx}
          // className={focusRow === idx ? tableStyle["focused-row"] : ""}
        >
          {headers.map((header, headerIdx) =>
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
                {header.helper ? (
                  <input
                    readOnly
                    onKeyUp={(e) => {
                      keyUpHandler(e, header, { row: idx, col: headerIdx });
                    }}
                    onBlur={(e) => {
                      {
                        /* grid02 trigger 여부에 따라 onBlur 핸들러 유무 결정 */
                      }
                      header.gridTrigger && onBlurHandler(e, header);
                    }}
                    value={item ? item[header.value] : ""}
                  ></input>
                ) : (
                  <input
                    onKeyUp={(e) => {
                      keyUpHandler(e, header);
                    }}
                    onBlur={(e) => {
                      {
                        /* grid02 trigger 여부에 따라 onBlur 핸들러 유무 결정 */
                      }
                      header.gridTrigger && onBlurHandler(e, header);
                    }}
                    value={item ? item[header.value] : ""}
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
