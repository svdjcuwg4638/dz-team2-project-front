import React, { useEffect, useState } from "react";
import SubRow from "./SubRow";

const SubTable = ({ boundId, masterLength, masterFocus }) => {
  const [subRowArray, setSubRowArray] = useState([]);

  useEffect(() => {
    if (boundId !== null && masterLength !== null) {
      setSubRowArray(Array.from({ length: masterLength }).map((_, index) => boundId + index));
    }
  }, [boundId, masterLength]);

  const addSubArray = (masterFocus) => {
    setSubRowArray((prevArray) => [...prevArray, masterFocus]);
  };
  return (
    <div>
      <div className="table">
        <thead>
          <tr>
            <th>품목코드</th>
            <th>품목이름</th>
            <th>단가</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {boundId && masterLength &&
            subRowArray.map((boundId, index) => (
              <SubRow key={index} boundId={boundId} masterFocus={masterFocus} />
            ))}
          <tr>
            <td colSpan="4" onClick={() => addSubArray(masterFocus)}>
              <button>+</button>
            </td>
          </tr>
        </tbody>
      </div>
    </div>
  );
};

export default SubTable;
