import React, { useEffect, useState } from "react";
import ItemACBox from "./ItemACBox";

const ProductInput = ({ itemAll, locationAll, storageAll, setSelectedItem, selectedItem }) => {

  return (
      <table>
        <thead>
          <tr>
            <th>생산품코드</th>
            <th>생산품이름</th>
            <th>창고코드</th>
            <th>세부장소</th>
            <th>회사명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ItemACBox
                filterBy="itemSKU"
                itemAll={itemAll}
                setSelectedItem={setSelectedItem}
                selectData={selectedItem?.itemSKU}
              />
            </td>
            <td>
              <ItemACBox
                filterBy="item_name"
                itemAll={itemAll}
                setSelectedItem={setSelectedItem}
                selectData={selectedItem?.item_name}
              />
            </td>
            <td>
              <input value={selectedItem?.storage_id || ""} readOnly />
            </td>
            <td>
              <input value={selectedItem?.location_id || ""} readOnly />
            </td>
            <td>
              <input value={selectedItem?.company_name || ""} readOnly />
            </td>
          </tr>
        </tbody>
      </table>

  );
};

export default ProductInput;
