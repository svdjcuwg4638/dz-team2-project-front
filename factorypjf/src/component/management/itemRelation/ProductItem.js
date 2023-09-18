import React, { useState } from "react";
import api from "redux/api";

const ProductItem = ({ itemAll, setSelectId, selectId }) => {

  
  const [itemList , setItemList] = useState(itemAll.data)
  const [formData, setFormData] = useState({
    item_code: "",
    item_name: "",
  });

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
    };
    try {
      setItemList((await api.post("/item/search", submitData)).data.data);
    } catch (error) {
      console.log("error :", error);
    }
    setSelectId(null)
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
      <div className="productItem_search_wrap">
        <div>
          <div>
            <div>품목코드 : </div>
            <div>
              <input
                type="text"
                name="item_code"
                onChange={handleSearchChange}
              ></input>
            </div>
          </div>
          <div>
            <div>품목이름 : </div>
            <div>
              <input
                type="text"
                name="item_name"
                onChange={handleSearchChange}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <div>
            <button className="button" onClick={handleSearchSubmit}>
              조회
            </button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "150px" }}>관리코드</th>
            <th>관리코드명</th>
          </tr>
        </thead>
        <tbody>
          {itemList &&
            itemList.map((data) => (
              <tr onClick={() => setSelectId(data)}>
                <td
                  style={{
                    backgroundColor:
                      selectId?.item_code == data.item_code
                        ? "#dadada"
                        : "transparent",
                  }}
                >
                  {data.item_code}
                </td>
                <td
                  style={{
                    backgroundColor:
                      selectId?.item_code == data.item_code
                        ? "#dadada"
                        : "transparent",
                  }}
                >
                  {data.item_name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductItem;
