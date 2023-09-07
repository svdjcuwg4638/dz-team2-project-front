import React, { useState } from "react";

import tableStyle from "style/layout/dataTable/DataTable.module.css";
import listStyle from "style/layout/dataTable/ListTableData.module.css";

export default function ListTable({ headerKey, items }) {
  return (
    <>
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
              <td key={key + idx}>
                <input defaultValue={item[key]}></input>
              </td>
            )
          )}
        </tr>
      ))}
    </>
  );
}
