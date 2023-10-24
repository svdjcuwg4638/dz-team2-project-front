import React, { cloneElement, isValidElement, useState } from "react";

import tableStyle from "style/layout/dataTable/table.module.css";
import addStyle from "style/layout/dataTable/addTableData.module.css";
import { BsSearch } from "react-icons/bs";

export default function DataTable({ headers, onModal, children }) {
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

  // const childrenWithProps = cloneElement(children, { headers });

  return (
    <>
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
                {header.text}
                {header.helper && (
                  <span class="wrap-search-icon">
                    <i class="fa-solid fa-circle-info helper_icon"></i>
                  </span>
                )}

                {/* {header.helper && (
                  <img
                    // onClick={()=>{onModal({value:header.value, text:header.text})}}
                    className={tableStyle["search-symbol"]}
                    src={searchSymbol}
                  />
                )} */}
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
          {/* <tbody>{childrenWithProps}</tbody> */}
        </table>
      </div>
    </>
  );
}
