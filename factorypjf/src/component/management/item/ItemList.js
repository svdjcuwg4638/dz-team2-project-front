import React, { useState } from "react";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { itemAction } from "../../../redux/actions/management/itemAction";

const ItemList = ({ itemAll,locationAll,storageAll }) => {
  const [selectIds, setSelectIds] = useState([]);
  const dispatch = useDispatch()

  const handleCheckboxChange = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = async () => {
    await api.post("/item/delete", selectIds);
    dispatch(itemAction.getItemAll());
    setSelectIds([]);
  };

  return (
    <div>
      <table>
        <thead className="top_table_header">
          <tr>
            <th>
              <button onClick={handleDelete}>삭제</button>
            </th>
            <th>품목명</th>
            <th>창고코드</th>
            <th>세부장소</th>
            <th>모델명</th>
            <th>카테고리</th>
            <th>등록일</th>
          </tr>
        </thead>
        <div className="top_table_wrap">
          <tbody>
            {itemAll.data.length > 0 &&
              itemAll.data.map((data) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectIds.includes(data.item_id)}
                      onChange={() => handleCheckboxChange(data.item_id)}
                    />
                  </td>
                  <td>{data.item_name}</td>
                  <td>{storageAll.data.find((s)=>s.storage_id == data.storage_id).storage_name}</td>
                  <td>{locationAll.data.find((l)=>l.location_id == data.location_id).location_name}</td>
                  <td>{data.itemSKU}</td>
                  <td>{data.category}</td>
                  <td>{data.registDate.split("T")[0]}</td>
                </tr>
              ))}
          </tbody>
        </div>
      </table>
    </div>
  );
};

export default ItemList;
