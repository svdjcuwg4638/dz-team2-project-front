import React, { useEffect, useState } from "react";
import SearchHelper from "./SearchHelper";
const Modal = ({ menu, handleInputChange,code_type }) => {
  const [HelperScreenState, setHelperScreenState] = useState(false);
  const [searchpartner, setSearchpartner] = useState("");

  const selectedPartnerFn = (partnerInput) => {
    setSearchpartner(partnerInput);
    setHelperScreenState(false);
  };

  return (
    <div style={{ position: "relative" }}>
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
          textAlign:"center"
        }}
        onClick={() => setHelperScreenState(false)}
      >
        {HelperScreenState && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 10px rgba(0,0,0,0.8)",
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchHelper
            handleInputChange={handleInputChange}
              menu={menu}
              searchPartner={selectedPartnerFn}
              code_type={code_type}
            />
          </div>
        )}
      </div>

      <div className="section">
        <div className="searchSection">
          {menu.trigger_type === "search" ? (
            <>
              {menu.guide && (
                <button
                  type="button"
                  className="btn"
                  onClick={(event) => {
                    event.preventDefault();
                    setHelperScreenState(!HelperScreenState);
                  }}
                  style={{
                    padding: "0",
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    backgroundColor: "#5390f0",
                    color: "#fff",
                    margin: "0 10px",
                    borderRadius:"25px"
                  }}
                >
                  ?
                </button>
              )}
            </>
          ) : (
            <>
              {menu.guide ? (
                <input
                  className="m-3"
                  type="text"
                  value={searchpartner}
                  onChange={(e) => setSearchpartner(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "F2") {
                      setHelperScreenState(!HelperScreenState);
                    }
                  }}
                />
              ) : (
                <input
                  className="m-3"
                  type="text"
                  value={searchpartner}
                  onChange={(e) => setSearchpartner(e.target.value)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
