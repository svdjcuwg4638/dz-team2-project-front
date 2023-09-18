import React from "react";
import MasterRow from "./MasterRow";

const MasterTable = ({
  setMasterLength,
  masterLength,
  boundId,
  setMaseterFocus,
}) => {
  return (
    <div>
      <div className="table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>거래처</th>
            <th>입고/출고</th>
          </tr>
        </thead>
        <tbody>
          {boundId != 0 && boundId && 
            boundId && masterLength > 0 &&
            Array.from({ length: masterLength }).map((_, index) => (
              <MasterRow key={index} boundId={boundId + index} setMaseterFocus={setMaseterFocus} />
            ))}
          <tr>
            <td colSpan="3">
              <button onClick={() => setMasterLength(masterLength + 1)}>
                +
              </button>
            </td>
          </tr>
        </tbody>
      </div>
    </div>
  );
};

export default MasterTable;
