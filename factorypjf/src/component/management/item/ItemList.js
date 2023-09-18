import React, { useEffect, useState } from "react";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { itemAction } from "../../../redux/actions/management/itemAction";

const ItemList = ({
  itemAll,
  setSelectItem,
  selectIds,
  setSelectIds,
  selectItem,
}) => {
  const dispatch = useDispatch();
  const [itemList , setItemList] = useState(itemAll.data)
  const handleCheckboxChange = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectIds((prev) => [...prev, id]);
    }
  };

  useEffect(()=>{
    setItemList(itemAll.data)
  },[itemAll])

  const [formData, setFormData] = useState({
    item_name: "",
    item_code: "",
  });

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
    }

    try {
      setItemList(
        (await api.post("/item/search", submitData)).data.data
      );
    } catch (error) {
      console.log("error :", error);
    }

    console.log(itemList);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="item_search_wrap" style={{ marginBottom: "20px" }}>
        <form className="flex">
          <div style={{ marginRight: "20px" }}>
            품목코드 :
            <input
              type="text"
              name="item_code"
              onChange={handleSearchChange}
              style={{ marginRight: "20px" }}
            />
            품목이름 :
            <input type="text" name="item_name" onChange={handleSearchChange} />
          </div>
          <div style={{ lineHeight: "5px" }}>
            <button type="submit" className="button" onClick={handleSearchSubmit}>
              조회
            </button>
          </div>
        </form>
      </div>
      <div className="itemList_wrap">
        <div className="table" style={{height:"500px"}}>
          <thead className="top_table_header">
            <tr>
              <th ></th>
              <th >품목코드</th>
              <th >품목이름</th>
              <th >
                규격 w:폭 l:길이 h:높이 v:부피 we:중량
              </th>
              <th>수량</th>
            </tr>
          </thead>
          <div className="tbody" style={{height:"430px"}}>
            {itemList.length > 0 &&
              itemList.map((data) => (
                <tr onClick={() => setSelectItem(data)}>
                  <td
                    style={{
                      backgroundColor:
                        selectItem?.item_code == data?.item_code
                          ? "#dadada"
                          : "",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectIds.includes(data.item_code)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(data.item_code);
                      }}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        selectItem?.item_code == data?.item_code
                          ? "#dadada"
                          : "",
                    }}
                  >
                    {data.item_code}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        selectItem?.item_code == data?.item_code
                          ? "#dadada"
                          : "",
                    }}
                  >
                    {data.item_name}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        selectItem?.item_code == data?.item_code
                          ? "#dadada"
                          : "",
                    }}
                  >
                    {data.width != "" ? "w: " + data.width + " " : ""}
                    {data.width != "" ? "l: " + data.length + " " : ""}
                    {data.width != "" ? "h: " + data.height + " " : ""}
                    {data.width != "" ? "v: " + data.volume + " " : ""}
                    {data.width != "" ? "we: " + data.weight + " " : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        selectItem?.item_code == data?.item_code
                          ? "#dadada"
                          : "",
                    }}
                  >
                    {data.unit}
                  </td>
                </tr>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
