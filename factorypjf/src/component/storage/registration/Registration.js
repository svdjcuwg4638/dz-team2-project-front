import React, { useEffect, useState } from "react";
import styles from "style/storage/registration.module.css";
import { read, utils } from "xlsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { InventoryAction } from "redux/actions/storage/InventoryAction";
import { TempInventoryAction } from "redux/actions/storage/TempInventoryAction";
import Table from "../../layout/Table/Table";
import DataTable from "./DataTable";
import ModalContainer from "../resultModal/ModalContainer";
import api from "redux/api";
const Registration = () => {
  const dispatch = useDispatch();
  const [tableitems, setTableitems] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("데이터가 없습니다.");
  const { inventoryAll } = useSelector((state) => state.inventory);
  const [state, setState] = useState(true);

  const [filename, setFilename] = useState();
  const { tempinventoryAll } = useSelector((state) => state.tempinventory);
  const [tempstate, setTempState] = useState(true);
  const [sendmodalstate, setSendModalstate] = useState(false);
  let storageCodeArray = [];
  useEffect(() => {
    loadfn();
  }, []);
  const loadfn = () => {
    dispatch(InventoryAction.getInventoryAll());
    dispatch(TempInventoryAction.getTempInventoryAll());
  };

  useEffect(() => {
    if (inventoryAll && inventoryAll.data && inventoryAll.data.length > 0) {
      setState(false);
    } else {
      setState(true);
    }
  }, [inventoryAll]);

  useEffect(() => {
    if (
      tempinventoryAll &&
      tempinventoryAll.data &&
      tempinventoryAll.data.length > 0
    ) {
      setTempState(false);
    } else {
      setTempState(true);
    }
  }, [tempinventoryAll]);
  useEffect(() => {
    if (errorMessage === "오류가 0건 있습니다.") {
      console.log("이거라서 ㅇ벗음", errorMessage);
      setErrorMessage();
    } else if (
      tableitems.length === 0 ||
      tableitems.every((item) => Object.values(item).every((value) => !value))
    ) {
      setErrorMessage("데이터가 없습니다.");
    }
  }, [errorMessage]);

  useEffect(() => {
    console.log("올라온 형식:", tableitems);
  }, [tableitems]);

  const table_header = [
    { text: "창고코드", value: "storage", helper: true, width: "10%" },
    { text: "창고명", value: "storagename", readonly: true, width: "15%" },
    { text: "장소코드", value: "location", helper: true, width: "10%" },
    { text: "장소명", value: "locationname", readonly: true, width: "15%" },
    { text: "품목코드", value: "item", helper: true },
    { text: "품목명", value: "itemname", readonly: true },
    { text: "규격", value: "standard", readonly: true, width: "8%" },
    { text: "단위", value: "unit", readonly: true, width: "8%" },
    { text: "재고량", value: "total", width: "8%" },
  ];

  const fileUploadHandler = (event) => {
    const file = event.target.files[0];
    setFilename(file.name);

    if (!file) {
      setErrorMessage("XLSX 파일을 업로드 해주세요.");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonFromExcel = utils.sheet_to_json(worksheet, {
        header: ["storage", "location", "item", "total"],
      });
      const dataWithoutHeader = jsonFromExcel.slice(1);

      setExcelData(dataWithoutHeader);
    };
  };

  const fetchTemp = async () => {
    const storageCodeArray = tableitems.map((item) => ({
      storage_code: item.storage,
      location_code: item.location,
      item_code: item.item,
      total: item.total,
      company_id: 1,
    }));
    console.log("백으로 전송할 데이터", storageCodeArray);

    // 백으로 전송
    try {
      await api.post("/inventory/registration/temp/add", storageCodeArray);
      console.log("전송성공");
    } catch (error) {
      console.error("전송실패", error);
    }
  };
  const fetch = async () => {
    const storageCodeArray = tableitems.map((item) => ({
      storage_code: item.storage,
      location_code: item.location,
      item_code: item.item,
      total: item.total,
      company_id: 1,
    }));
    console.log("백으로 전송할 데이터", storageCodeArray);

    // 백으로 전송
    try {
      const response = await api.post(
        "/inventory/registration/add",
        storageCodeArray
      );
      console.log(response);
      if (response.status === 201) setSendModalstate(true);
      console.log("전송성공");
    } catch (error) {
      console.error("전송실패", error);
    }
  };
  const currentDate = new Date(); // 현재 날짜와 시간을 가져옴

  const year = currentDate.getFullYear(); // 년도 가져오기 (예: 2023)
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월 가져오기 (0부터 시작하므로 +1, 예: 08)
  const day = String(currentDate.getDate()).padStart(2, "0"); // 일 가져오기 (예: 16)

  const formattedDate = year + month + day; // 형식화된 날짜 생성 (예: 20230816)

  const downloadExcelFile = () => {
    const fileURL = "/excel_file.xlsx"; // 엑셀 파일의 경로

    // a 태그를 이용하여 파일 다운로드
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = "기초재고등록양식_" + formattedDate + ".xlsx"; // 다운로드될 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadtemptable = () => {
    if (tempinventoryAll && tempinventoryAll.data) {
      storageCodeArray = tempinventoryAll.data.map((item) => ({
        storage: item.storage_code,
        location: item.location_code,
        item: item.item_code,
        total: item.total,
      }));
      setExcelData(storageCodeArray);
    }
    setFilename("불러온 데이터");

    setTempState(true); // 상태 업데이트
  };

  return (
    <>
      {sendmodalstate && (
        <ModalContainer
          setModalstate={setSendModalstate}
          type="result"
          linkTo="../list"
        />
      )}

      <div className={styles.SectionContainer}>
        <div>
          <div>
            <div className={styles.btnSection}>
              <button
                className={`${
                  !tempstate ? styles.btn_disabled : styles.btn_save
                }`}
                disabled={!tempstate ? true : false}
                onClick={downloadExcelFile}
              >
                엑셀 양식 다운로드
              </button>
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  onChange={fileUploadHandler}
                  className={styles.inputFile}
                  disabled={!tempstate ? true : false}
                ></input>
                <button
                  className={`${
                    !tempstate ? styles.btn_disabled : styles.btn_save
                  }`}
                  disabled={!tempstate ? true : false}
                >
                  기초 재고 파일 업로드
                </button>
              </div>
            </div>
            <div>
              <div className={styles.resultContainer}>
                <div className={styles.resultHeader}>
                  ㆍ결과 미리보기 : '{filename}'
                </div>
                <div className={`${styles.result} `}>
                  {!state ? (
                    <div className={styles.script}>
                      이미 등록된 재고가 있습니다
                    </div>
                  ) : !tempstate ? (
                    <div className={styles.script}>
                      임시저장된 자료가 있습니다.
                      <p onClick={(e) => loadtemptable()}>불러오기</p>
                      <p onClick={(e) => setTempState(true)}>새로작성</p>
                    </div>
                  ) : (
                    <>
                      <div className={styles.modalcon}>
                        <Table headers={table_header}>
                          <DataTable
                            Eitems={excelData}
                            setItems={setTableitems}
                            items={tableitems}
                            setErrorCount={setErrorMessage}
                          />
                        </Table>
                      </div>
                      <div className={styles.btnSection}>
                        <div className={styles.error}>{errorMessage}</div>
                        <button
                          className={`${styles.btn_save} ${styles.submitBtn}`}
                          onClick={fetchTemp}
                        >
                          임시저장
                        </button>
                        <button
                          className={`${
                            errorMessage ? styles.btn_disabled : styles.btn_save
                          } ${styles.submitBtn}`}
                          disabled={errorMessage}
                          onClick={fetch}
                        >
                          저장
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Registration;
