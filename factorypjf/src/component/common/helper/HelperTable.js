import React from "react";

import helperStyle from "style/common/HelperModal.module.css";


export default function HelperTable({ headers, items, onSelectCode }) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable/> header is required.");
  }

  //header에 맞는 items를 출력하기 위해 header의 value만 뽑아낸다
  const headerValue = headers.map((header) => header.value);

  const onSelectHandler = (code) => {
    onSelectCode(code)
  };
  
  function isCodeColumn(key) {
    //코드(elec0101)인지, 코드에 대한 이름(전자팀)인지 확인
    if (key.toLowerCase().includes('code')) return true;
  }

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
              {headerValue.map((key) =>
                isCodeColumn(key) ? (
                  <td
                    className={helperStyle['clickable-col']}
                    key={key + idx}
                    onClick={() => {
                      onSelectHandler(item[key]);
                    }}
                  >
                    {item[key]}
                  </td>
                ) : (
                  <td key={key + idx}>{item[key]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
