import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import axios from "axios";
import HelperModal from "component/common/helper/HelperModal";
import { getAxios } from "function/axiosFuction";

import tableStyle from "style/layout/dataTable/table.module.css";
import addStyle from "style/layout/dataTable/addTableData.module.css";
import productionStyle from "style/production/production.module.css"

//도움창 단축키 코드
const HELPER_KEY = 113;
const CLEAN_KEY = 115;

//headers: 테이블 header, onGridTrigger: 부모 요소로 이벤트 발송할 수 있는 handler,
export default function AddTableData({
  isBtn,
  headers,
  items,
  onGridTrigger,
  selectRowHandler,
  emitItem,
  deleteItem,
  editHandler,
  addRowEmit
}) {
  //첫 렌더링시 테이블 행수
  const DEFAULT_ROW = 1;
  const DEFAULT_ARR = useMemo(() => {
    let row = {};
    headers.forEach((header) => {
      row[header.value] = "";
    });
    let tempArr = [];
    for (let i = 0; i < DEFAULT_ROW; i++) {
      let copyItems = JSON.parse(JSON.stringify(row));
      tempArr.push(copyItems);
    }
    return tempArr;
  }, [headers]);

  useEffect(() => {
    if (items) {
      setTableItems([...items]);
    } else {
      emitItem(DEFAULT_ARR);
    }
  }, [items]);

  useEffect(() => {
    if (deleteItem) {
      let copyItem = JSON.parse(JSON.stringify(tableItems));
      let unDelete = [];
      for (let i = 0; i < copyItem.length; i++) {
        if (!deleteItem.includes(i)) {
          unDelete.push(copyItem[i]);
        }
        // setTableItems([...unDelete]);
        emitItem([...unDelete]);
        setFocusRow(0);
      }
    }
  }, [deleteItem]);

  //행 추가 handler
  const [tableItems, setTableItems] = useState([...DEFAULT_ARR]);

  const addRowHandler = () => {
    // setTableItems([...tableItems, {}]);
    emitItem([...tableItems,{}])
    if(addRowEmit){
      addRowEmit()
    }
  };

  //focus된 행 state
  const [focusRow, setFocusRow] = useState();
  //focus된 col
  const [focusElement, setFocusElement] = useState();
  //mouseOver된 행 state
  const [overRow, setOverRow]=useState();

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

  //colInfo: 컬럼 header, coordinate{row,col} 클릭한 위치
  const keyUpHandler = (e, colInfo, coordinate) => {
    //도움창 단축키 handler
    if (e.which === HELPER_KEY && colInfo.helper) {
      //도움창을 연 컬럼 좌표 저장
      setCurrentCol({ ...coordinate });
      //모달 켜기
      onModalHanlder(colInfo.value, colInfo.text);
      if (editHandler) editHandler(e, "add", colInfo, coordinate);
    } else if (e.which === CLEAN_KEY && colInfo.helper) {
      e.preventDefault();
      setCurrentCol({ ...coordinate });
      let copyItems = [...tableItems];
      copyItems[coordinate.row] = {
        ...copyItems[coordinate.row],
        [colInfo.value]: "",
        [`${colInfo.value}Code`]: "",
      };
      setTableItems(copyItems);
      emitItem(copyItems);
    } else if (e.which === HELPER_KEY && !colInfo.helper) {
      console.log("도움창이 제공되지 않는 코드입니다.");
      //도움창 컬럼 지우기
    }else if(e.which === CLEAN_KEY && colInfo.helper){
      e.preventDefault();
      const copyItem=[...tableItems]
      copyItem[coordinate.row][colInfo.value]=''
      copyItem[coordinate.row][`${colInfo.value}Code`]=''
      setTableItems([...copyItem])
      console.log(tableItems)
    }else{
      if (editHandler) editHandler(e,'add',colInfo, coordinate);
    }
  };

  const mouseHandler=(e)=>{
    e.preventDefault();
    //이벤트가 tr>td>input에서 발생하기 때문에 부모의 부모 노드 선택
    let row = e.target.parentNode.parentNode;
    
    if(e.type==='mouseover'){
      // console.log(addStyle[" add-table-focus"])
      row.className += row.className?` ${addStyle["add-table-focus"]}`:`${addStyle["add-table-focus"]}`;
      setOverRow(row);
    }
    if(e.type==='mouseout'){
      overRow.className = overRow.className.replace(`${addStyle["add-table-focus"]}`,'');
    }
  }

  //코드 선택 handler
  const selectCodeHandler = (codeRow) => {
    //================선택한 코드 테이블에 출력===============
    let copyItems = JSON.parse(JSON.stringify(tableItems));

    for (let key in codeRow) {
      let itemKey = "";

      //코드데이터면 key가 ~~Code, 아니면 value 그대로 객체 생성
      //ex) teamCode, team
      if (!key.toLowerCase().includes("code")) {
        itemKey = modalState.codeValue;
      } else {
        itemKey = key;
      }

        copyItems[currentCol.row] = {
          ...copyItems[currentCol.row],
          [itemKey]: codeRow[key],
        };
    }
    // setTableItems(copyItems);
    emitItem([...copyItems]);

    //======================grid2 trigger========================
    headers.forEach((header) => {
      //현재 도움창을 띄운 column이 trigger 컬럼이면
      if (header.gridTrigger && header.value === modalState.codeValue) {
        //현재 컬럼의 header, 현재 row를 보냄
        onGridTrigger(header, copyItems, currentCol);
      }
    });
    // console.log(tableItems)
    focusElement.focus();
  };

  const selectRow = (e, idx) => {
    //클릭 이벤트가 tr>td>input에서 발생하기 때문에 부모의 부모 노드 선택
    let row = e.target.parentNode.parentNode;
    row.className += row.className?` ${addStyle["add-table-focus"]}`:`${addStyle["add-table-focus"]}`;
    if (focusRow && focusRow !== row) {
      focusRow.className = focusRow.className.replace(`${addStyle["add-table-focus"]}`,'');
    }
    setFocusRow(row);
    setFocusElement(e.target)
    selectRowHandler(idx, e);
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
          onClick={(e) => {
            selectRow(e, idx);
          }}
          onMouseOver={mouseHandler}
          onMouseOut={mouseHandler}
          // className={focusRow === idx ? tableStyle["focused-row"] : ""}
        >
          {headers.map((header, headerIdx) =>
            // selectBox 컬럼
            header.value === "select" ? (
              <td key={`${headerIdx}+${item[header.value]}`}>
                <input
                  id={`grid01_${idx}_${header.value}`}
                  type="checkbox"
                ></input>
              </td>
            ) : // 순번 컬럼
            header.value === "index" ? (
              <td key={`${headerIdx}+${item[header.value]}`}>
                <div>{idx + 1}</div>
              </td>
            ) : (
              <td key={`${headerIdx}+${item[header.value]}`}>
                {header.helper || header.readonly ? (
                  <input
                    //grid번호_행번호_컬럼명
                    id={`grid01_${idx}_${header.value}`}
                    readOnly
                    onKeyUp={(e) => {
                      keyUpHandler(e, header, { row: idx, col: headerIdx });
                    }}
                    defaultValue={item ? item[header.value] : ""}
                    type="text"
                    className={header.readonly&&`${productionStyle['input_read-only']}`}
                  ></input>
                ) : header.value === "date" ? (
                  <input
                    id={`grid01_${idx}_${header.value}`}
                    type="date"
                    placeholder="YYYY-MM-DD"
                    min="1900-01-01"
                    max="9999-12-31"
                    className={addStyle.input_date}
                    defaultValue={item ? item[header.value] : ""}
                    onKeyUp={(e) => {
                      keyUpHandler(e, header, { row: idx, col: headerIdx });
                    }}
                  ></input>
                ) : (
                  <input
                    id={`grid01_${idx}_${header.value}`}
                    onKeyUp={(e) => {
                      keyUpHandler(e, header, { row: idx, col: headerIdx });
                    }}
                    defaultValue={item ? item[header.value] : ""}
                    type="text"
                  ></input>
                )}
              </td>
            )
          )}
        </tr>
      ))}
      {isBtn && (
        <tr>
          <td colSpan={headers.length}>
            <button className={tableStyle.btn_add} onClick={addRowHandler}>
              +
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
