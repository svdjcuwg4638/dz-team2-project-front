import HelperModal from "component/common/helper/HelperModal";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import styles from "style/common/SearchHelperModal.module.css";
// import searchStyle from "style/common/searchStyle.module.css";
const HELPER_KEY = 113;
const CLEAN_KEY = 115;
const ENTER_KEY = 13;

const SearchHelperModal = ({ headers, formHandler, enterHandler }) => {
  const modalInit = {
    showModal: false,
    codeValue: "", //
    codeName: "",
  };

  // useEffect(() => {
  //   if (items !== undefined) {
  //     setTableItems(items);
  //   }
  // }, [items]);

  //행 추가 handler
  const [tableItems, setTableItems] = useState({});
  //검색 필터 내용 바뀔때마다 formHandler 호출
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
      // console.log(action);
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

  // 도움창 단축키 handler
  const keyUpHandler = (e, colInfo) => {
    if (e.which === HELPER_KEY && colInfo.helper) {
      onModalHanlder(colInfo.value, colInfo.text);
    } else if (e.which === CLEAN_KEY && colInfo.helper) {
      e.preventDefault();
      let copyItems = { ...tableItems };
      copyItems = {
        ...copyItems,
        [colInfo.value]: "",
        [`${colInfo.value}Code`]: "",
      };

      setTableItems(copyItems);
      console.log(tableItems);
    } else if (e.which === 13) {
      if (enterHandler) enterHandler();
    }
  };

  // 도움창 버튼 handler
  const buttonPressHandler = (e, colInfo) => {
    if (colInfo.helper) {
      onModalHanlder(colInfo.value, colInfo.text);
    }
  };

  //코드 선택 handler
  const selectCodeHandler = (codeRow) => {
    let copyItems = { ...tableItems };

    for (let key in codeRow) {
      let itemKey = "";

      if (!key.toLowerCase().includes("code")) {
        itemKey = modalState.codeValue;
      } else {
        itemKey = key;
      }

      copyItems = {
        ...copyItems,
        [itemKey]: codeRow[key],
      };
    }

    setTableItems(copyItems);
  };
  const inputChangeHandler = (header, value) => {
    let copyItems = { ...tableItems };
    copyItems = {
      ...copyItems,
      [header]: value,
    };
    setTableItems(copyItems);
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

      {/* 도움창이 필요한 항목은 readonly, 도움창으로만 입력 가능 */}
      {headers.map((header, headerIdx) => (
        <td key={header.headerIdx}>
          <div className={styles.searchCom}>
            <div
              className={header.helper ? "search_label_helper" : "search_label"}
              onClick={(e) => buttonPressHandler(e, header)}
            >
             
                <label style={{color:'var(--font-color)'}} title="클릭시 도움창 팝업"> {header.text}</label>
                {header.helper && (
                  <i class="fa-solid fa-circle-info helper_icon"></i>
                )}
              
            </div>

            {header.helper ? (
              <>
                <input
                  value={tableItems[header.value] || ""}
                  onKeyUp={(e) => {
                    keyUpHandler(e, header);
                  }}
                ></input>
                {/* <button
                  className={styles.helperBtn}
                  onClick={(e) =>
                    buttonPressHandler(e, header, {
                      row: 0,
                      col: headerIdx,
                    })
                  }
                >
                  ?
                </button> */}
              </>
            ) : (
              <>
                {header.value === "date" ? (
                  <input
                    onChange={(e) =>
                      inputChangeHandler(header.value, e.target.value)
                    }
                    value={tableItems[header.value] || ""}
                    type="date"
                    min="1900-01-01"
                    max="9999-12-31"
                  ></input>
                ) : (
                  <input
                    onChange={(e) =>
                      inputChangeHandler(header.value, e.target.value)
                    }
                    value={tableItems[header.value] || ""}
                    onKeyUp={(e) => {
                      keyUpHandler(e, header);
                    }}
                  ></input>
                )}
              </>
            )}
          </div>
        </td>
      ))}
    </>
  );
};

export default SearchHelperModal;
