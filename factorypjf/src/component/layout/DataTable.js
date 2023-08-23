import React, { useState } from "react";

import style from "style/layout/DataTable.module.css";

export default function DataTable({ headers, items }) {

let inputType=''
const INPUT_TYPE=function(key){
    // if(key.includes('select'))return 'checkbox'
    // if(key.includes(''))
}

// header가 있어야만 table 출력
  if (!headers || !headers.length) {
    throw new Error("<DataTable/> header is required.");
  }
  const headerKey = headers.map((header) => header.value);

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
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header.text}</th>
            ))}
          </tr>
        </thead>

        {items ? (
          //   조회테이블일때
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                {headerKey.map((key) =>
                  key === "select" ? (
                    <td key={key + idx}>
                      <input type="checkbox"></input>
                    </td>
                  ) : key === "index" ? (
                    <td key={key + idx}>{idx + 1}</td>
                  ) : (
                    <td key={key + idx}>{item[key]}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        ) : (
          // 입력테이블일때
          <tbody>
            {rowCountArr.map((key, idx) => (
              <tr
                key={idx}
                className={focusRow === idx ? style["focused-row"] : ""}
              >
                {headerKey.map((key) =>
                  key === "select" ? (
                    <td key={key + idx}>
                      <input type="checkbox"></input>
                    </td>
                  ) : key === "index" ? (
                    <td key={key + idx}>{idx + 1}</td>
                  ) : (
                    <td key={key}>
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
          </tbody>
        )}
      </table>
    </>
  );
}
