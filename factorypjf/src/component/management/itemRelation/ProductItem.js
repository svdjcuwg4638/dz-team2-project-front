import React, { useState } from "react";
import api from "redux/api";

const ProductItem = ({ itemAll, setSelectId, selectId }) => {
  const [itemList, setItemList] = useState(itemAll.data);
  const [formData, setFormData] = useState({
    item_code: "",
    item_name: "",
  });

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const submidivata = {
      ...formData,
    };
    try {
      setItemList((await api.post("/item/search", submidivata)).data.data);
    } catch (error) {
      console.log("error :", error);
    }
    setSelectId(null);
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
      <form className="management_search_wrap">
        <div className="management_search_content">
          <div>
            <div>
              <div>품목코드</div>
              <div>
                <input
                  type="text"
                  name="item_code"
                  onChange={handleSearchChange}
                ></input>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>품목명</div>
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
            <button className="btn_save" onClick={handleSearchSubmit}>
              조회
            </button>
          </div>
        </div>
      </form>
      <div className="ctable">
        <div className="chead">
          <div className="ctr relation_row">
            <div style={{ widdiv: "150px" }}>품목코드</div>
            <div>품목명</div>
          </div>
        </div>
      </div>

      <div className="ctable">
        <div className="cbody">
          {itemList &&
            itemList.map((data) => (
              <div
                className="ctr relation_row"
                onClick={() => setSelectId(data)}
                style={{
                  backgroundColor:
                    selectId?.item_code == data.item_code
                      ? "rgb(245, 245, 245)"
                      : "transparent",
                }}
              >
                <div>{data.item_code}</div>
                <div>{data.item_name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
