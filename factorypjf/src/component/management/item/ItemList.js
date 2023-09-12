import React, { useState } from "react";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { itemAction } from "../../../redux/actions/management/itemAction";

const ItemList = ({ itemAll }) => {
  const [selectIds, setSelectIds] = useState([]);
  const dispatch = useDispatch();

  const handleCheckboxChange = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectIds((prev) => [...prev, id]);
    }
  };

  console.log(itemAll);

  const handleDelete = async () => {
    await api.post("/item/delete", selectIds);
    dispatch(itemAction.getItemAll());
    setSelectIds([]);
  };

  return (
    <div className="itemList_wrap">
      <table>
        <thead className="top_table_header">
          <tr>
            <th style={{ width: "5%" }}></th>
            <th style={{ width: "10%" }}>품목코드</th>
            <th style={{ width: "10%" }}>품목이름</th>
            <th style={{ width: "65%" }}>
              규격 w:폭 l:길이 h:높이 v:부피 we:중량
            </th>
            <th style={{ width: "10%" }}>
              수량
            </th>
          </tr>
        </thead>
        <tbody>
          {itemAll.data.length > 0 &&
            itemAll.data.map((data) => (
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={selectIds.includes(data.item_code)}
                    onChange={() => handleCheckboxChange(data.item_code)}
                  />
                </td>
                <td>{data.item_code}</td>
                <td>{data.item_name}</td>
                <td>
                  {data.width != "" ? "w: " + data.width+" " : ""}
                  {data.width != "" ? "l: " + data.length+" " : ""}
                  {data.width != "" ? "h: " + data.height+" " : ""}
                  {data.width != "" ? "v: " + data.volume+" " : ""}
                  {data.width != "" ? "we: " + data.weight+" " : ""}
                </td>
                <td>{data.unit}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
