import HelperModal from "component/common/helper/HelperModal";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import styles from "../../../style/storage/inquiry.module.css";

const HELPER_KEY = 113;

const SearchSection = ({ headers, formHandler }) => {
  const DEFAULT_ROW = 1;

  const modalInit = {
    showModal: false,
    codeValue: "", //
    codeName: "",
  };

  //행 추가 handler
  const [tableItems, setTableItems] = useState([]);
  useEffect(() => {
    formHandler(tableItems);
  }, [tableItems]);
  //모달 끄고 닫는 핸들러
  const onModalHanlder = (codeValue, codeName) => {
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

  // 도움창 단축키 handler
  const keyUpHandler = (e, colInfo, coordinate) => {
    if (e.which === HELPER_KEY && colInfo.helper) {
      setCurrentCol({ ...coordinate });
      onModalHanlder(colInfo.value, colInfo.text);
    }
  };

  // 도움창 버튼 handler
  const buttonPressHandler = (e, colInfo, coordinate) => {
    if (colInfo.helper) {
      setCurrentCol({ ...coordinate });
      onModalHanlder(colInfo.value, colInfo.text);
    }
  };

  //코드 선택 handler
  const selectCodeHandler = (codeRow) => {
    //================선택한 코드 테이블에 출력===============
    let copyItems = JSON.parse(JSON.stringify(tableItems));
    for (let key in codeRow) {
      let itemKey = "";

      //   //코드데이터면 key가 ~~Code, 아니면 value 그대로 객체 생성
      //   //ex) teamCode, team
      if (!key.toLowerCase().includes("code")) {
        itemKey = modalState.codeValue;
      } else {
        itemKey = key;
      }

      //같은 행에 이미 데이터가 들어있으면
      if (copyItems[currentCol.row]) {
        copyItems[currentCol.row] = {
          ...copyItems[currentCol.row],
          [itemKey]: codeRow[key],
        };
        //비어있는 행이면
      } else {
        copyItems[currentCol.row] = { [itemKey]: codeRow[key] };
      }
      setTableItems(copyItems);
    }
  };

  return (
    <>
      {modalState.showModal && (
        <HelperModal
          modalState={modalState}
          offModal={offModalHandler}
          onSelectCode={selectCodeHandler}
        />
      )}

      {tableItems &&
        tableItems.map((item, idx) => (
          <tr key={idx}>
            {headers.map(
              (
                header,
                headerIdx //선택 컬럼
              ) => (
                <td key={header.headerIdx}>
                  {header.helper ? (
                    <div className={styles.searchCom}>
                      <label> {header.text}</label>
                      <input
                        value={item ? item[header.value] : ""}
                        onKeyUp={(e) => {
                          keyUpHandler(e, header, { row: idx, col: headerIdx });
                        }}
                      ></input>
                      <button
                        className={styles.helperBtn}
                        onClick={(e) =>
                          buttonPressHandler(e, header, {
                            row: idx,
                            col: headerIdx,
                          })
                        }
                      >
                        ?
                      </button>
                    </div>
                  ) : (
                    <div className={styles.searchCom}>
                      <label> {header.text}</label>
                      <input
                        value={item ? item[header.value] : ""}
                        onKeyUp={(e) => {
                          keyUpHandler(e, header);
                        }}
                      ></input>
                    </div>
                  )}
                </td>
              )
            )}
          </tr>
        ))}
    </>
  );
};

export default SearchSection;
