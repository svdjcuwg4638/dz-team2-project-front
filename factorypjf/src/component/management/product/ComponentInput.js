import React, { useState } from "react";
import ItemACBox from "./ItemACBox";

const ComponentInput = ({
  itemAll,
  selComponentList,
  setSelComponentList,
  locationAll,
  storageAll,
  partnerAll,
}) => {
  const [slotSize, setSlotSize] = useState(4);

  const handleSetItem = (item, index) => {
    const newSelComponentList = [...selComponentList];
    newSelComponentList[index] = item;
    setSelComponentList(newSelComponentList);
  };

  const handleSetQuantity = (index, quantity) => {
    const updatedList = [...selComponentList];

    if (updatedList[index]) {
      updatedList[index].quantity = quantity;
    } else {
      updatedList[index] = { quantity };
    }
    setSelComponentList(updatedList);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>부품코드</th>
          <th>부품이름</th>
          <th>갯수</th>
          <th>회사명</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: slotSize }).map((_, index) => (
          <tr key={index}>
            <td>
              <ItemACBox
                filterBy="itemSKU"
                itemAll={itemAll}
                setSelectedItem={handleSetItem}
                selectData={selComponentList[index]?.itemSKU}
                itemIndex={index}
              />
            </td>
            <td>
              <ItemACBox
                filterBy="item_name"
                itemAll={itemAll}
                setSelectedItem={handleSetItem}
                selectData={selComponentList[index]?.item_name}
                itemIndex={index}
              />
            </td>
            <td>
              <input
                type="number"
                onChange={(e) => handleSetQuantity(index, e.target.value)}
                value={selComponentList[index]?.quantity || ""}
              />
            </td>
            <td>
              <input
                type="text"
                readOnly
                value={selComponentList[index]?.partner_id}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ComponentInput;
