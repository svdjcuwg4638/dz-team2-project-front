import React, { useEffect, useState } from "react";
import "./regiBtn.css";
import { read, utils } from "xlsx";
import { file } from "@babel/types";
import axios from "axios";
const DataTable = ({ columns, data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const Registration = () => {
  const [jsonData, setJsonData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const columns = [
    { Header: "창고", accessor: "storage_code" },
    { Header: "장소", accessor: "location_code" },
    { Header: "품목코드", accessor: "item_code" },
    { Header: "품목", accessor: "item_name" },
    { Header: "재고량", accessor: "total" },
  ];

  // const header = [
  //   { text: "", value: "select" },
  //   { text: "창고코드", value: "storage_code" },
  //   { text: "창고명", value: "storage_name" },
  // ];

  const fileUploadHandler = (event) => {
    const file = event.target.files[0];
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
        header: [
          "storage_code",
          "location_code",
          "item_code",
          "item_name",
          "total",
        ],
      });
      const dataWithoutHeader = jsonFromExcel.slice(1);

      setJsonData(dataWithoutHeader);
      setErrorMessage("");
      console.log("data json: ", jsonData);
      try {
        await axios.post(
          "http://localhost:8080/inventory/add",
          dataWithoutHeader
        );
        console.log("전송성공");
      } catch (error) {
        console.error("전송실패", error);
      }
    };
  };

  return (
    <div>
      <div
        className="btnSection mx-3"
        style={{
          display: "flex",
          justifyContent: "right",
          position: "relative",
          top: "50px",
        }}
      >
        <button className="btn mx-1">엑셀 양식 다운로드</button>
        <div style={{ position: "relative" }}>
          <input
            type="file"
            onChange={fileUploadHandler}
            style={{
              position: "absolute",
              opacity: "0",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              cursor: "pointer",
            }}
          ></input>
          <button className="btn mx-1">기초 재고 파일 업로드</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
        <button className="btn mx-1">?</button>
      </div>
      <div
        className="tblContainer"
        style={{
          display: "flex",
          position: "relative",
          top: "70px",
        }}
      >
        <div style={{ marginLeft: "70px" }}>
          <div style={{ textAlign: "left" }}>결과 미리보기</div>
          <div className="tblSection">
            {jsonData.length > 0 && (
              <DataTable columns={columns} data={jsonData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Registration;
