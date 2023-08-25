import React, { useState } from "react";

import tableStyle from "style/layout/dataTable/DataTable.module.css";
import addStyle from "style/layout/dataTable/AddTableData.module.css";

export default function AddTableData({ headerKey }) {
  //행 추가 state
  const [rowCount, setrowCount] = useState(1);
  const rowCountArr = Array.from({ length: rowCount });
  //행 추가 handler
  const addRowHandler = () => {
    setrowCount(rowCount + 1);
  };

  //focus된 행 state
  const [focusRow, setFocusRow] = useState();
  //row 색상 변경 handler
  const focusHandler = (idx) => {
    setFocusRow(idx);
  };

  return (
    <>
      {rowCountArr.map((key, idx) => (
        // 행 추가를 위해 rowCount만큼 tr 생성
        <tr
          key={idx}
          className={focusRow === idx ? tableStyle["focused-row"] : ""}
        >
          {headerKey.map((key) =>
            key === "select" ? (
              <td key={key + idx}>
                <input type="checkbox"></input>
              </td>
            ) : key === "index" ? (
              <td key={key + idx}>{idx + 1}</td>
            ) : (
              <td key={key + idx}>
                <input
                  onFocus={() => {
                    focusHandler(idx);
                  }}
                ></input>
              </td>
            )
          )}
        </tr>
      ))}
      <tr>
        <td colSpan={headerKey.length}>
          <button className="btn_add" onClick={addRowHandler}>
            +
          </button>
        </td>
      </tr>
    </>
  );
}
