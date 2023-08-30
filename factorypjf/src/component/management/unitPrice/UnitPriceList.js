import React from "react";

const UnitPriceList = ({ unitPriceAll, itemAll }) => {
  console.log("unitpricealaaaa", unitPriceAll);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>품목코드</th>
            <th>품목이름</th>
            <th>단가</th>
            <th>입고/출고</th>
            <th>시작일</th>
            <th>종료일</th>
          </tr>
        </thead>
        {unitPriceAll.map((data) => (
          <tbody>
            <tr>
              <td>
                {itemAll.find((data) => data.item_id == data.item_id).itemSKU}
              </td>
              <td>
                {itemAll.find((data) => data.item_id == data.item_id).item_name}
              </td>
              <td>{data.item_price}</td>
              <td>{data.type}</td>
              <td>{data.start_date}</td>
              <td>{data.end_date}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default UnitPriceList;
