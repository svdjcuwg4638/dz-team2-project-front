import React, { useEffect, useState } from "react";
import styles from ".././../../style/storage/registration.module.css";
import { read, utils } from "xlsx";
// import * as FileSaver from "file-saver";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { InventoryAction } from "redux/actions/storage/InventoryAction";
import ListTable from "component/layout/Table/ListTableData";
import Table from "../../layout/Table/Table";
import AddTableData from "component/layout/Table/AddTableData";
import DataTable from "./DataTable";

const Registration = () => {
  const dispatch = useDispatch();
  const [tableitems, setTableitems] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("데이터가 없습니다");
  const { inventoryAll, loading } = useSelector((state) => state.inventory);
  const [loadData, setLoadData] = useState(false);
  const [filename, setFilename] = useState();

  useEffect(() => {
    dispatch(InventoryAction.getInventoryAll());
  }, []);

  useEffect(() => {
    // setLoadData(true);
  }, [inventoryAll]);
  useEffect(() => {
    if (errorMessage === "에러가 0건 있습니다.") setErrorMessage("");
  }, [errorMessage]);

  const table_header = [
    { text: "창고", value: "storage", helper: true },
    { text: "창고명", value: "storagename", readonly: true },
    { text: "장소코드", value: "location", helper: true },
    { text: "장소명", value: "locationname", readonly: true },
    { text: "품목코드", value: "item", helper: true },
    { text: "품목명", value: "itemname", readonly: true },
    { text: "규격", value: "standard", readonly: true },
    { text: "단위", value: "unit", readonly: true },
    { text: "재고량", value: "total" },
  ];

  const fileUploadHandler = (event) => {
    const file = event.target.files[0];
    setFilename(file.name);

    if (!file) {
      setErrorMessage("Please select a valid XLSX file.");
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

  const fetch = async () => {
    // 백으로 전송
    try {
      await axios.post(
        "http://localhost:9091/inventory/registration",
        tableitems
      );
      console.log("전송성공");
    } catch (error) {
      console.error("전송실패", error);
    }
  };
  useEffect(() => {
    console.log("바뀐거반영: ", tableitems);
  }, [tableitems]);
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

  return (
    <div className={styles.SectionContainer}>
      <div>
        <div className={styles.headerSection}>
          <h4 className={styles.header}> 기초재고등록</h4>
        </div>
        <div>
          <div className={styles.btnSection}>
            <button
              className={`${loadData ? styles.btnFalse : styles.btnTrue}`}
              disabled={loadData}
              onClick={downloadExcelFile}
            >
              {console.log("test", loadData)} {/* 추가된 부분 */}
              엑셀 양식 다운로드
            </button>
            <div style={{ position: "relative" }}>
              <input
                type="file"
                onChange={fileUploadHandler}
                className={styles.inputFile}
                disabled={loadData}
              ></input>
              <button
                className={`${loadData ? styles.btnFalse : styles.btnTrue}`}
                disabled={loadData}
              >
                기초 재고 파일 업로드
              </button>
            </div>
            <button
              className={`${loadData ? styles.btnFalse : styles.btnTrue} ${
                styles.guideBtn
              }`}
              disabled={loadData}
            >
              ?
            </button>
          </div>
          <div>
            <div className={styles.resultContainer}>
              <div className={styles.resultHeader}>
                ㆍ결과 미리보기 : '{filename}'
              </div>
              <div className={`${styles.result} `}>
                {loadData ? (
                  <div className={styles.script}>
                    이미 등록된 재고가 있습니다
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
                        className={`${styles.btnTrue} ${styles.submitBtn}`}
                      >
                        임시저장
                      </button>
                      <button
                        className={`${
                          errorMessage ? styles.btnFalse : styles.btnTrue
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
  );
};
export default Registration;
