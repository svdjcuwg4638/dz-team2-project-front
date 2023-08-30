import React, { useState } from "react";
import PartnerHelper from "./PartnerHelper";

const SearchSection = ({ menu }) => {
  const [partnerHelper, setPartnerHelper] = useState(false);
  const [searchpartner, setSearchpartner] = useState("");

  const partnerCodeHandler = () => {
    if (partnerHelper === true) setPartnerHelper(false);
    else if (partnerHelper === false) setPartnerHelper(true);
  };
  const selectedPartnerFn = (partnerInput) => {
    setSearchpartner(partnerInput);
  };
  const handleRowClick = (partner) => {
    // PartnerHelper 내의 rowClickHandler가 발생할 때 호출되는 함수
    setPartnerHelper(false); // row 클릭 시 partnerHelper를 false로 변경
  };

  return (
    <div>
      <div className="partnerGuide" style={{ position: "relative" }}>
        {partnerHelper && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              //   transform: "translate(-60%, +20%)",
              boxShadow: "0 0 10px rgba(0,0,0,0.8)",
              zIndex: 1, // 조절 가능한 레이어 순서
            }}
          >
            {/* PartnerHelper 내용 */}
            <PartnerHelper
              menu={menu}
              searchPartner={selectedPartnerFn}
              partnerHelper={partnerHelper}
              handleRowClick={handleRowClick}
            />
          </div>
        )}
      </div>

      <div className="section">
        <div className="searchSection">
          <label>{menu.name} 코드: </label>
          <input
            className="m-3"
            style={{ border: "1px solid black" }}
            type="text"
            value={searchpartner}
            onChange={(e) => setSearchpartner(e.target.value)}
          />
          {menu.guide && (
            <button onClick={partnerCodeHandler} style={{ width: "30px" }}>
              ?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
