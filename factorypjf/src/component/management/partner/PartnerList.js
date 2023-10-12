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
  };

  return (
    <div>
      <div className="ctable">
        <div className="chead">
          <div className="ctr partner_row">
            <div></div>
            <div>거래처코드</div>
            <div>거래처명</div>
            <div>대표자명</div>
            <div>연락처</div>
            <div>이메일</div>
          </div>
        </div>
      </div>

      <div className="ctable">
        <div className="cbody" onWheel={handleScroll}>
          {partnerAll &&
            partnerAll.length > 0 &&
            partnerAll.map((data) => (
              <div className="ctr partner_row"
                onClick={() => setSelectParnter(data)}
                style={{
                  background:
                    selectPartner?.partner_code == data?.partner_code
                      ? "rgb(245, 245, 245)"
                      : "",
                }}
              >
                <div>
                  <input
                    className="management_checkBox"
                    type="checkbox"
                    checked={selectCodes?.includes(data?.partner_code)}
                    onChange={() => handleCheckboxChange(data?.partner_code)}
                  />
                </div>
                <div>{data.partner_code}</div>
                <div>{data.partner_name}</div>
                <div>{data.representative}</div>
                <div>{data.ph_num}</div>
                <div>{data.email}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerList;
