import React, { useState } from "react";
import SearchHelper from "./SearchHelper";
const SearchSection = ({ menu }) => {
  const [HelperScreenState, setHelperScreenState] = useState(false);
  const [searchpartner, setSearchpartner] = useState("");

  const CodeHandler = () => {
    if (HelperScreenState === true) setHelperScreenState(false);
    else if (HelperScreenState === false) setHelperScreenState(true);
  };
  const selectedPartnerFn = (partnerInput) => {
    setSearchpartner(partnerInput);
    setHelperScreenState(false);
  };

  return (
    <div>
      <div
        style={{
          zIndex: "9",
          background: "rgba(0,0,0,0.3)",
          position: "fixed",
          display: HelperScreenState ? "block" : "none",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
        onClick={() => setHelperScreenState(false)}
      ></div>
      <div className="inputGuide" style={{ position: "relative" }}>
        {HelperScreenState && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              //   transform: "translate(-60%, +20%)",
              boxShadow: "0 0 10px rgba(0,0,0,0.8)",
              zIndex: 10, // 조절 가능한 레이어 순서
            }}
          >
            {/* HelperScreenState 내용 */}
            <SearchHelper menu={menu} searchPartner={selectedPartnerFn} />
          </div>
        )}
      </div>
      <div className="section">
        <div className="searchSection">
          <label>{menu.name} :</label>
          <input
            className="m-3"
            style={{ border: "1px solid black" }}
            type="text"
            value={searchpartner}
            onChange={(e) => setSearchpartner(e.target.value)}
          />
          {menu.guide && (
            <button onClick={CodeHandler} style={{ width: "30px" }}>
              ?
            </button>
          )}
        </div>
      </div>

      {/* <table className="inputTbl">
        <tr>
          <td>
            <input value={searchpartner} />
          </td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <td>
            <input />
          </td>
        </tr>
      </table> */}
    </div>
  );
};

export default SearchSection;
