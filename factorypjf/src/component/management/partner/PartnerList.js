import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
const PartnerList = ({
  partnerAll,
  setSelectParnter,
  selectPartner,
  selectCodes,
  setSelectCodes,
}) => {
  const dispatch = useDispatch();

  //#region 스크롤
  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
  };
  //#endregion

  const handleCheckboxChange = (cd) => {
    if (selectCodes.includes(cd)) {
      setSelectCodes((prev) => prev.filter((itemCd) => itemCd !== cd));
    } else {
      setSelectCodes((prev) => [...prev, cd]);
    }
    console.log(selectCodes);
  };

  return (
    <div>
      <table>
        <thead className="top_table_header">
          <tr>
            <th></th>
            <th>거래처코드</th>
            <th>거래처명</th>
            <th>대표자명</th>
            <th>연락처</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody className="partner-scrollable-table" onWheel={handleScroll}>
          {partnerAll &&
            partnerAll.length > 0 &&
            partnerAll.map((data) => (
              <tr
                onClick={() => setSelectParnter(data)}
                style={{
                  background:
                    selectPartner?.partner_code == data?.partner_code
                      ? "#dadada"
                      : "#fff",
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectCodes?.includes(data?.partner_code)}
                    onChange={() => handleCheckboxChange(data?.partner_code)}
                  />
                </td>
                <td>{data.partner_code}</td>
                <td>{data.partner_name}</td>
                <td>{data.representative}</td>
                <td>{data.ph_num}</td>
                <td>{data.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerList;
