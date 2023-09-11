import React from "react";

import helperStyle from "style/common/helperModal.module.css";


export default function HelperTable({ headers, items, onSelectCode }) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable/> header is required.");
  }

  //header에 맞는 items를 출력하기 위해 header의 value만 뽑아낸다
  const headerValue = headers.map((header) => header.value);

  const onSelectHandler = (code) => {
    onSelectCode(code)
  };

  return (
    <>
      <table>
        <colgroup>
          {headers.map((header, idx) => {
            return <col key={idx} width={header.width}></col>;
          })}
        </colgroup>
        <thead>
          <tr>
            {headers.map((header, idx) => {
              return <td key={idx}>{header.text}</td>;
            })}
          </tr>
        </thead>
      </table>
      <table className={helperStyle["helper-table__data"]}>
        <colgroup>
          {headers.map((header, idx) => {
            return <col key={idx} width={header.width}></col>;
          })}
        </colgroup>
        <tbody>
          {items.map((item, idx) => (
            /*headerValue를 key로 가진 item 값을 출력 */
            //code 컬럼이면 click handler
            <tr key={idx}>
              {headers.map((header) =>
                // isCodeColumn(key) ? (
                  <td
                    className={header.selectable&&helperStyle['clickable-col']}
                    key={header.value + idx}
                    onClick={() => {
                      header.selectable&&onSelectHandler(item);
                    }}
                  >
                    {item[header.value]}
                  </td>
                // ) : (
                //   <td key={key + idx}>{item[key]}</td>
                // )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
