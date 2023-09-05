import React, { useRef, useState } from "react";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
const PartnerList = ({ partnerAll, setSelectParnter, selectPartner,selectCodes,setSelectCodes }) => {
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
          {selectPartner && partnerAll && partnerAll.length > 0 && partnerAll.map((data) => (
            <tr onClick={() => setSelectParnter(data)}>
              <td
                style={{
                  background:
                    selectPartner.partner_code == data.partner_code ? "#dadada" : "#fff",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectCodes?.includes(data?.partner_code)}
                  onChange={() => handleCheckboxChange(data?.partner_code)}
                />
              </td>
              <td
                style={{
                  background:
                    selectPartner.partner_code == data.partner_code ? "#dadada" : "#fff",
                }}
              >
                {data.partner_code}
              </td>
              <td
                style={{
                  background:
                    selectPartner.partner_code == data.partner_code ? "#dadada" : "#fff",
                }}
              >
                {data.partner_name}
              </td>
              <td
                style={{
                  background:
                    selectPartner.partner_code == data.partner_code ? "#dadada" : "#fff",
                }}
              >
                {data.representative}
              </td>
              <td
                style={{
                  background:
                    selectPartner.partner_code == data.partner_code ? "#dadada" : "#fff",
                }}
              >
                {data.ph_num}
              </td>
              <td
                style={{
                  background:
                    selectPartner.partner_code == data.partner_code ? "#dadada" : "#fff",
                }}
              >
                {data.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerList;
