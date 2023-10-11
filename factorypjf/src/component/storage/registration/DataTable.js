import axios from "axios";
import HelperModal from "component/common/helper/HelperModal";
import { useEffect, useReducer, useState } from "react";
import tableStyle from "style/layout/dataTable/table.module.css";
import styles from ".././../../style/storage/registration.module.css";
import api from "redux/api";

const DataTable = ({ headers, Eitems, items, setItems, setErrorCount }) => {
  const HELPER_KEY = 113;
  const CLEAN_KEY = 115;
  const [currentCol, setCurrentCol] = useState({ row: -1, col: -1 });

  const [tableItems, setTableItems] = useState([]);

  const [storageData, setStorageData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [itemData, setItemData] = useState([]);

  const [errorCell, setErrorCell] = useState([]);
  // 최초 데이터 로드
  useEffect(() => {
    // 데이터 로드 함수 정의
    const loadData = async () => {
      try {
        const storageDataResponse = await api.post("/common/help", {
          searchOption: "0",
          keyword: "",
          codeType: "storage",
        });

        const locationDataResponse = await api.get("/location/all");
        const itemDataResponse = await api.get("/item/all");

        // 데이터를 가져온 후에 다음 단계로 진행
        const storageData = storageDataResponse.data.data;
        const locationData = locationDataResponse.data.data;
        const itemData = itemDataResponse.data.data;

        // 데이터를 설정
        setStorageData(storageData);
        setLocationData(locationData);
        setItemData(itemData);

        console.log("최초 데이터 로드 완료");
      } catch (error) {
        console.error("전송실패", error);
      }
    };
    loadData();
    // 데이터 로드 함수 호출
  }, []); // 빈 배열을 두 번째 인자로 전달하여 이 `useEffect`가 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.
  // 데이터 로드

  // excel 로드
  // Excel 로드 useEffect
  useEffect(() => {
    var copyItemsWithItem = [];
    var copyItemsWithLocation = [];
    // 모든 데이터를 로드한 후에 setFieldNames를 호출
    console.log("eitem useEffect", storageData, locationData, itemData);
    const copyItems = setFieldNames(
      Eitems,
      "storage",
      "storagename",
      storageData
    );
    console.log(copyItems, copyItemsWithLocation, copyItemsWithItem);

    copyItemsWithLocation = setFieldNames(
      copyItems,
      "location",
      "locationname",
      locationData
    );
    console.log(copyItems, copyItemsWithLocation, copyItemsWithItem);

    copyItemsWithItem = setFieldNames(
      copyItemsWithLocation,
      "item",
      "itemname",
      itemData
    );

    console.log(copyItems, copyItemsWithLocation, copyItemsWithItem);
    setTableItems([...copyItemsWithItem]);
  }, [Eitems, storageData, locationData, itemData]);
  // 부모로 데이터 올리기, errorstate 계산
  useEffect(() => {
    setItems(tableItems);

    const updatedErrorCell = tableItems.map((item) => {
      const isRowEmpty = Object.values(item).every((value) => !value);
      return headers.map(() => !isRowEmpty); // 모든 필드가 비어있다면 모든 열을 false로 설정
    });
    setErrorCell(updatedErrorCell);

    confirmErrorState(tableItems, "storage", storageData);
    confirmErrorState(tableItems, "location", locationData);
    confirmErrorState(tableItems, "item", itemData);
    confirmErrorState(tableItems, "total");

    setErrorCount(
      "오류가 " +
        errorCell.flat().filter((cell) => cell === true).length +
        "건 있습니다."
    );
    console.log("222 Eitems", Eitems, "items", items, "tableItems", tableItems);
  }, [tableItems]);

  // row 추가
  const addRowHandler = async () => {
    setTableItems([...tableItems, {}]);
  };

  //도움창 모달 관련
  const modalInit = {
    showModal: false,
    codeValue: "", //
    codeName: "",
  };

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

  // 단축키 핸들링
  const keyUpHandler = (e, colInfo, coordinate, header) => {
    setCurrentCol({ ...coordinate });
    if (e.which === HELPER_KEY && colInfo.helper) {
      onModalHanlder(colInfo.value, colInfo.text);
    } else if (e.which === 8 || (e.which === CLEAN_KEY && colInfo.helper)) {
      e.preventDefault();
      let copyItems = JSON.parse(JSON.stringify(tableItems));

      if (header === "item") {
        copyItems[coordinate.row] = {
          ...copyItems[coordinate.row],
          [header]: "",
          [`${header}Name`]: "",
          [`${header}name`]: "",
          ["standard"]: "",
          ["unit"]: "",
        };
      } else {
        copyItems[coordinate.row] = {
          ...copyItems[coordinate.row],
          [header]: "",
          [`${header}name`]: "",
          [`${header}Name`]: "",
        };
      }

      setTableItems(copyItems);
    }
  };

  const [modalState, dispatch] = useReducer(modalReducer, modalInit);

  //코드 선택 handler
  const selectCodeHandler = (codeRow) => {
    //================선택한 코드 테이블에 출력===============
    let copyItems = JSON.parse(JSON.stringify(tableItems));

    for (let key in codeRow) {
      let itemKey = "";

      //코드데이터면 key가 ~~Code, 아니면 value 그대로 객체 생성

      if (!key.toLowerCase().includes("code")) {
        itemKey = key;
      } else {
        itemKey = modalState.codeValue;
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
    }
    copyItems = setFieldNames(copyItems, "storage", "storagename", storageData);

    copyItems = setFieldNames(
      copyItems,
      "location",
      "locationname",
      locationData
    );
    copyItems = setFieldNames(copyItems, "item", "itemname", itemData);

    setTableItems(copyItems);
  };

  // 사용자 직접입력
  const inputChangeHandler = (header, value, coordinate) => {
    let copyItems = JSON.parse(JSON.stringify(tableItems));

    if (copyItems[coordinate.row]) {
      copyItems[coordinate.row] = {
        ...copyItems[coordinate.row],
        [header]: value,
      }; // 해당 칸에 값을 설정
    } else {
      copyItems[coordinate.row] = { [header]: value };
    }

    // 필드 이름과 값을 설정
    copyItems = setFieldNames(copyItems, "storage", "storagename", storageData);
    copyItems = setFieldNames(
      copyItems,
      "location",
      "locationname",
      locationData
    );
    copyItems = setFieldNames(copyItems, "item", "itemname", itemData);
    setTableItems(copyItems);
  };

  // 데이터 찾아 넣어줌
  const setFieldNames = (items, fieldName, nameField, codeList) => {
    return items.map((item, idx) => {
      const copyItem = { ...item };

      if (item[fieldName]) {
        const matchingItem = codeList.find((codeItem) =>
          codeList === itemData
            ? codeItem["item_code"] === item[fieldName]
            : codeList === locationData
            ? codeItem["location_code"] === item[fieldName]
            : codeItem["code"] === item[fieldName]
        );

        if (matchingItem) {
          copyItem[nameField] =
            matchingItem[
              codeList === itemData
                ? "item_name"
                : codeList === locationData
                ? "location_name"
                : "code_name"
            ];
          if (codeList === itemData) {
            copyItem["standard"] = matchingItem["standard"];
            copyItem["unit"] = matchingItem["unit"];
          }
        }
      }

      return copyItem;
    });
  };

  // 불일치 셀 검증
  const confirmErrorState = (items, fieldName, codeList) => {
    return items.map((item, idx) => {
      const copyItem = { ...item };

      if (item[fieldName] && fieldName !== "total") {
        const matchingItem = codeList.find((codeItem) =>
          codeList === locationData
            ? codeItem["location_code"] === item[fieldName]
            : codeList === itemData
            ? codeItem["item_code"] === item[fieldName]
            : codeList === storageData
            ? codeItem["code"] === item[fieldName]
            : ""
        );

        // 장소 input에서 없는 장소 입력시 error 처리
        if (fieldName === "location") {
          if (matchingItem) {
            codeList.map((codeitem) => {
              if (
                copyItem["location"] === matchingItem["location_code"] &&
                copyItem["storage"] !== matchingItem["storage_code"]
              ) {
                setErrorCell((prevErrorCell) => {
                  const copyErrorCell = [...prevErrorCell];
                  copyErrorCell[idx][0] = true;
                  copyErrorCell[idx][1] = true;
                  copyErrorCell[idx][2] = true;
                  copyErrorCell[idx][3] = true;
                  return copyErrorCell;
                });
              } else if (
                copyItem["location"] === matchingItem["location_code"] &&
                copyItem["storage"] === matchingItem["storage_code"]
              ) {
                setErrorCell((prevErrorCell) => {
                  const copyErrorCell = [...prevErrorCell];

                  copyErrorCell[idx][0] = false;
                  copyErrorCell[idx][1] = false;
                  copyErrorCell[idx][2] = false;
                  copyErrorCell[idx][3] = false;

                  return copyErrorCell;
                });
              }
            });
          }
        }
        // 창고 input에서 없는 창고 입력시 error 처리
        else if (fieldName === "storage") {
          if (matchingItem) {
            codeList.map((copyItem) => {
              if (
                copyItem["storage"] !== matchingItem["code"] ||
                matchingItem !== undefined
              ) {
                setErrorCell((prevErrorCell) => {
                  const copyErrorCell = [...prevErrorCell];
                  copyErrorCell[idx][0] = false;
                  copyErrorCell[idx][1] = false;

                  return copyErrorCell;
                });
              }
            });
          }
        }
        // 품목 input에서, 없는 품목 입력시 error처리
        else if (fieldName === "item") {
          if (matchingItem !== undefined) {
            setErrorCell((prevErrorCell) => {
              const copyErrorCell = [...prevErrorCell];
              copyErrorCell[idx][4] = false;
              copyErrorCell[idx][5] = false;
              copyErrorCell[idx][6] = false;
              copyErrorCell[idx][7] = false;

              return copyErrorCell;
            });
          }
        }
      }

      if (fieldName === "total") {
        if (item[fieldName]) {
          setErrorCell((prevErrorCell) => {
            const copyErrorCell = [...prevErrorCell];
            copyErrorCell[idx][8] = false;
            return copyErrorCell;
          });
        }
      }

      return copyItem;
    });
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
      {items.map((item, idx) => (
        <tr key={idx}>
          {headers.map((header, headerIdx) => (
            <td key={headerIdx}>
              <input
                className={`${
                  header.readonly
                    ? styles.inputReadOnly
                    : item[header.value] === undefined ||
                      item[header.value] === "" ||
                      item[header.value] === null
                    ? styles.inputEmpty
                    : errorCell[idx][headerIdx]
                    ? styles.inputError
                    : styles.inputTrue
                }`}
                value={item[header.value] || ""}
                id={`${header.value}`}
                readOnly={header.readonly}
                onKeyUp={(e) => {
                  keyUpHandler(
                    e,
                    header,
                    { row: idx, col: headerIdx },
                    header.value
                  );
                }}
                onBlur={(e) =>
                  inputChangeHandler(header.value, e.target.value, {
                    row: idx,
                    col: headerIdx,
                  })
                }
                onChange={(e) => (item[header.value] = e.target.value)}
              ></input>
            </td>
          ))}
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
};

export default DataTable;
