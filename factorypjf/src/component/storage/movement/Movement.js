import React, { useEffect, useRef, useState } from "react";
import styles from "style/storage/movement.module.css";
import Table from "../../layout/Table/Table";
import AddTable from "component/layout/Table/AddTableData";
import SearchHelperModal from "component/common/helper/SearchHelperModal";
import axios from "axios";
import ModalContainer from "../resultModal/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { storageAction } from "redux/actions/management/storageAction";
import fastforward from "img/fast-forward.png";
import api from "redux/api";
import { ReactComponent as Arrow } from "img/rightArrow.svg";

const Movement = () => {
  const header = [
    { text: "순번", value: "index", width: "3%" },
    {
      text: "품목",
      value: "item",
      helper: true,
      width: "15%",
      required: true,
    },
    {
      text: "출고창고재고",
      value: "outboundStock",
      readonly: true,
      width: "9%",
    },
    {
      text: "입고창고재고",
      value: "inboundStock",
      readonly: true,
      width: "9%",
    },
    { text: "개수", value: "movement", width: "9%", required: true },
    { text: "비고", value: "description", width: "15%" },
  ];
  const outbound_header = [
    {
      text: "출고창고",
      value: "storage",
      helper: true,
    },
    { text: "출고장소", value: "location", helper: true },
  ];

  const inbound_header = [
    {
      text: "입고창고",
      value: "storage",
      helper: true,
    },
    { text: "입고장소", value: "location", helper: true },
  ];
  const emp_header = [
    {
      text: "담당자",
      value: "emp",
      helper: true,
    },
  ];
  const [selectedRow, setSelectedRow] = useState();
  // 하단 테이블 데이터
  const [tableItems, setTableItems] = useState([]);

  // 상단 창고장소
  const [outbound, setOutbound] = useState();
  const [inbound, setInbound] = useState();
  const [emp, setEmp] = useState();

  const [itemCodes, setItemCodes] = useState([]);
  const [date, setDate] = useState();
  const [errormessage, setErrormessage] = useState("입력된 항목이 없습니다");

  const [modalstate, setModalstate] = useState(false);

  const { locationAll } = useSelector((state) => state.storage);
  const errors = [];

  const dispatch = useDispatch();

  useEffect(() => {
    loadfn();
  }, []);

  const loadfn = () => {
    dispatch(storageAction.getstorageAll());
  };

  function checkLocationMatch(
    locationData,
    targetLocation,
    targetStorage,
    setErrorMessage,
    target
  ) {
    let foundMatch = false;

    locationData.length > 0 &&
      locationData.forEach((location) => {
        if (targetLocation === location["location_code"]) {
          if (targetStorage === location["storage_code"]) {
            foundMatch = true;
          } else {
            foundMatch = false;
          }
        }
      });

    if (!foundMatch) {
      if (target === "outbound")
        if (errors.length === 0)
          // 일치하는 것을 찾지 못한 경우 에러 메시지 설정
          errors.push("출고 창고 혹은 장소가 적절하지 않습니다.");
      if (target === "inbound")
        if (errors.length === 0)
          errors.push("입고 창고 혹은 장소가 적절하지 않습니다.");
    }
  }

  useEffect(() => {
    if (
      !outbound ||
      !outbound.storageCode ||
      !outbound.locationCode ||
      !inbound ||
      !inbound.storageCode ||
      !inbound.locationCode
    ) {
      if (errors.length === 0)
        errors.push("창고 및 장소는 필수 입력 항목입니다.");
    }

    if (!emp || !emp.empCode) {
      if (errors.length === 0) errors.push("담당자는 필수 입력 항목입니다.");
    }

    if (!date) {
      if (errors.length === 0) errors.push("날짜는 필수 입력 항목입니다.");
    }

    if (!tableItems || tableItems.length === 0) {
      if (errors.length === 0) errors.push("테이블에 입력된 항목이 없습니다.");
    }
    if (locationAll.data && locationAll.data.length > 0) {
      outbound &&
        checkLocationMatch(
          locationAll.data,
          outbound["locationCode"],
          outbound["storageCode"],
          errors,
          "outbound"
        );
      inbound &&
        checkLocationMatch(
          locationAll.data,
          inbound["locationCode"],
          inbound["storageCode"],
          errors,
          "inbound"
        );
    }

    if (errors.length === 0) {
      setErrormessage(""); // 모든 검증 조건을 통과하면 에러 메시지를 빈 문자열로 처리
    } else {
      setErrormessage(errors.join("\n")); // 에러 메시지가 있다면 개행 문자로 연결하여 설정
    }

    // 검증 조건이 변경될 때마다 실행
  }, [outbound, inbound, emp, date, tableItems]);

  useEffect(() => {
    if (
      !tableItems ||
      tableItems.length === 0 ||
      selectedRow === undefined ||
      selectedRow >= tableItems.length
    )
      return;

    // tableItems에서 item_code 열만 추출하여 새로운 배열을 생성
    const extractedItemCodes = tableItems.map((item) => item["itemCode"]);

    // 이전 상태값과 비교
    if (!arraysAreEqual(extractedItemCodes, itemCodes))
      setItemCodes(extractedItemCodes);
  }, [tableItems]);

  useEffect(() => {
    if (
      !tableItems ||
      tableItems.length === 0 ||
      selectedRow === undefined ||
      selectedRow >= tableItems.length
    )
      return;

    stockHandler(
      outbound,
      inbound,
      tableItems[selectedRow]["itemCode"],
      selectedRow
    );
  }, [itemCodes]);

  // 배열 비교 함수
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  // 상단 필수항목 검증
  useEffect(() => {
    if (
      !tableItems ||
      tableItems.length === 0 ||
      selectedRow === undefined ||
      selectedRow >= tableItems.length
    )
      return;

    if (
      outbound["storageCode"] === undefined ||
      outbound["storageCode"] === "" ||
      outbound["locationCode"] === undefined ||
      outbound["locationCode"] === "" ||
      inbound["storageCode"] === undefined ||
      inbound["storageCode"] === "" ||
      inbound["locationCode"] === undefined ||
      inbound["locationCode"] === ""
    )
      setErrormessage("창고 및 장소는 필수 입력 항목입니다");
    else if (emp["empCode"] === undefined || emp["empCode"] === "")
      setErrormessage("담당자는 필수 입력 항목입니다");
    else if (date === undefined || date === "")
      setErrormessage("날짜는 필수입력 항목입니다.");

    for (let i = 0; i < tableItems.length; i++)
      if (tableItems[i]["itemCode"] !== undefined) {
        console.log(
          "tableItems itemCode is not null",
          i,
          "행",
          tableItems[i]["itemCode"]
        );
        stockHandler(outbound, inbound, tableItems[i]["itemCode"], i);
      }
  }, [outbound, inbound, emp]);

  // insert
  const submitHandler = async (
    outbound,
    inbound,
    item,
    selectedRow,
    movementdate,
    emp
  ) => {
    console.log(outbound, inbound, item, selectedRow, movementdate);

    // 재고량 데이터 추출
    const movementData = item.map((_, index) => {
      const id = `grid01_${index}_movement`;
      const inputElement = document.getElementById(id);

      // input 요소에서 데이터 추출
      const data = inputElement ? inputElement.value : ""; // input 요소가 없을 경우 공백 문자열로 설정

      return data;
    });
    const descriptionData = item.map((_, index) => {
      const id = `grid01_${index}_description`;
      const inputElement = document.getElementById(id);

      // input 요소에서 데이터 추출
      const data = inputElement ? inputElement.value : ""; // input 요소가 없을 경우 공백 문자열로 설정

      return data;
    });

    const movementArray = [];
    var cnt = 0;
    for (let i = 0; i < item.length; i++) {
      if (
        +movementData[i] > +item[i]["outboundStock"] ||
        +movementData[i] < 0 ||
        isNaN(movementData[i])
      ) {
        cnt++;
      }

      movementArray[i] = {
        outbound_storage_code: outbound.storageCode,
        outbound_location_code: outbound.locationCode,
        inbound_storage_code: inbound.storageCode,
        inbound_location_code: inbound.locationCode,
        item_code: item[i]["itemCode"],
        company_id: 1,
        movement: movementData[i],
        movement_date: movementdate,
        description: descriptionData[i],
        emp_id: emp.empCode,
      };
    }
    if (cnt > 0) {
      setErrormessage("재고량을 확인해주세요 ");
      return;
    } else setErrormessage("");
    console.log("전체데이터", movementArray);

    try {
      const response = await api.post("/inventory/movement/add", movementArray);

      if (response.status === 200) setModalstate(true);
    } catch (error) {
      console.error("전송실패", error);
    }
  };
  const selectRowHandler = (idx, e) => {
    setSelectedRow(idx);
    //========필수항목일 경우 input 색상 변경=======
    if (e.target.type === "text") {
      let inputId = e.target.id;
      let inputHeader = inputId.match(/(?<=\w_)[a-zA-z_]+/g)[0];
      e.target.className = e.target.className.replace("input_red", "");
      e.target.className = e.target.className.replace("input_black", "");
      // e.target.className=e.target.className.replace('input_blue','')

      // e.target.className.replace(`${productionClasses["input_red"]}`,null)
      // e.target.className.replace(`${productionClasses["input_black"]}`,null)
      header.map((header) => {
        if (inputHeader === header.value) {
          //필수항목이고 빈칸이면
          if (header.required && e.target.value === "") {
            // e.target.className= e.target.className?e.target.className+`${productionClasses[" input_red"]}`:`${productionClasses["input_red"]}`
            e.target.className = e.target.className
              ? e.target.className + " input_red"
              : "input_red";
          } else {
            // e.target.className= e.target.className?e.target.className+`${productionClasses[" input_black"]}`:`${productionClasses["input_black"]}`
            e.target.className = e.target.className
              ? e.target.className + " input_black"
              : "input_black";
          }
        }
      });
    }
  };
  // 재고 가져오기
  const stockHandler = async (outbound, inbound, item, selectedRow) => {
    console.log(outbound, inbound, item, selectedRow);
    const copyTable = [...tableItems]; // 이전 배열을 복제합니다.
    const newTable = [...copyTable]; // 새로운 배열을 생성합니다.

    const movement = {
      outbound_storage_code: outbound.storageCode,
      outbound_location_code: outbound.locationCode,
      inbound_storage_code: inbound.storageCode,
      inbound_location_code: inbound.locationCode,
      item_code: item,
      company_id: 1,
    };

    console.log(movement);
    try {
      const response = await api.get("/inventory/movement", {
        params: movement,
      });
      console.log("응답데이터", response.data.data);

      // 새로운 배열에 업데이트된 값을 설정합니다.
      newTable[selectedRow]["outboundStock"] = response.data.data[0] ?? 0;
      newTable[selectedRow]["inboundStock"] = response.data.data[1] ?? 0;

      // 업데이트된 배열을 상태로 설정합니다.
      setTableItems(newTable);
    } catch (error) {
      console.error("전송실패", error);
    }
  };
  return (
    <>
      {modalstate && (
        <ModalContainer
          setModalstate={setModalstate}
          type="result"
          linkTo="../movementsList"
        />
      )}

      <div className={styles.SectionContainer}>
        <div>
          <div className={styles.arrange}>
            <div className={styles.topPart}>
              <div className={styles.inoutCon}>
                <div className={styles.left}>
                  <SearchHelperModal
                    headers={outbound_header}
                    formHandler={setOutbound}
                  />
                </div>
                <Arrow width="30px" height="138" />

                <div className={styles.right}>
                  <SearchHelperModal
                    headers={inbound_header}
                    formHandler={setInbound}
                  />
                </div>
              </div>
              <div className={styles.inoutCon}>
                <div className={styles.etcCon}>
                  <SearchHelperModal
                    headers={emp_header}
                    formHandler={setEmp}
                  />
                  <div className={styles.dateCon}>
                    <label>재고이동일</label>
                    <div>
                      <input
                        type="date"
                        min="1900-01-01"
                        max="9999-12-31"
                        defaultValue={date}
                        onChange={(e) => setDate(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottomPart}>
              <div className={styles.tableCon}>
                <Table className={styles.tableHeader} headers={header}>
                  <AddTable
                    selectRowHandler={selectRowHandler}
                    emitItem={setTableItems}
                    items={tableItems}
                    isBtn={true}
                  />
                </Table>
              </div>
              <div className={styles.btnBox}>
                {errormessage && (
                  <p className={styles.errorTrue}>{errormessage}</p>
                )}
                <button
                  className={errormessage ? "btn_disabled" : "btn_save"}
                  disabled={errormessage ? true : false}
                  onClick={(e) =>
                    submitHandler(
                      outbound,
                      inbound,
                      tableItems,
                      selectedRow,
                      date,
                      emp
                    )
                  }
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movement;
