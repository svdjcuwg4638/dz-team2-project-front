import React, { cloneElement, isValidElement, useState } from "react";

import tableStyle from "style/layout/dataTable/table.module.css";
import addStyle from "style/layout/dataTable/addTableData.module.css";
// import { BsSearch } from "react-icons/bs";

export default function DataTable({ headers, onModal, children }) {
  // header가 있어야만 table 출력
  if (!headers || !headers.length) {
    throw new Error("<DataTable/> header is required.");
  }

  const childrenWithProps = cloneElement(children, { headers });

  return (
    <div className={tableStyle.tbl_container}>
      <table className={tableStyle.tbl_header}>
        <colgroup>
          {headers.map((header, idx) => {
            return <col key={idx} width={header.width}></col>;
          })}
        </colgroup>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>
                <label title="도움창 팝업 (F2)">
                {header.text}
                {header.helper && (
                  <span class="wrap-search-icon" >
                      <i class="fa-solid fa-circle-info helper_icon"></i>
                  </span>
                )}
                </label>
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <div className={tableStyle.tbl_body_wrap}>
        <table className={tableStyle.tbl_body}>
          <colgroup>
            {headers.map((header, idx) => {
              return <col key={idx} width={header.width}></col>;
            })}
          </colgroup>
          <tbody className={tableStyle['tbl_body_data']}>{childrenWithProps}</tbody>
        </table>
      </div>
    </div>
  );
}
