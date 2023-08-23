import React, { cloneElement, isValidElement, useState } from "react";

import tableStyle from "style/layout/dataTable/DataTable.module.css";
import addStyle from "style/layout/dataTable/AddTableData.module.css";

export default function DataTable({ headers, items, children }) {
  // let inputType=''
  // const INPUT_TYPE=function(key){
  //     // if(key.includes('select'))return 'checkbox'
  //     // if(key.includes(''))
  // }

  // header가 있어야만 table 출력
  if (!headers || !headers.length) {
    throw new Error("<DataTable/> header is required.");
  }
  const headerKey = headers.map((header) => header.value);

  //children에 props 넘기기위해 children clone
  // const childrenWithProps = children.map((child) => {
  //   if (isValidElement(child)) {
  //     return cloneElement(child, { headerKey });
  //   }
  // });

  const childrenWithProps = cloneElement(children, { headerKey });
    
 


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
        <tbody>{childrenWithProps}</tbody>
        {/* {items ? (
          // 조회테이블일때
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
                    <td key={key + idx}><input defaultValue={item[key]}
                    onFocus={() => {
                      focusHandler(idx);
                    }}
                  ></input></td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        ) : (
          // 입력테이블일때
          <tbody>
            {rowCountArr.map((key, idx) => (
              // 행 추가를 위해 rowCount만큼 tr 생성
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
                    <td key={key+idx}>
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
        )} */}
      </table>
    </>
  );
}
