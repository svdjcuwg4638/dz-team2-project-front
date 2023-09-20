import React, { useEffect, useState } from "react";
import api from "../../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { codeAction } from "redux/actions/management/codeAction";

const ItemList = ({
  itemAll,
  setSelectItem,
  selectIds,
  setSelectIds,
  selectItem,
}) => {
  const dispatch = useDispatch();
  const [itemList, setItemList] = useState(itemAll.data);
  const { codeAll } = useSelector((state) => state.code);

  useEffect(() => {
    dispatch(codeAction.getCodeAll());
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectIds((prev) => [...prev, id]);
    }
    console.log(selectIds);
  };

  useEffect(() => {
    setItemList(itemAll.data);
  }, [itemAll]);

  const [formData, setFormData] = useState({
    item_name: "",
    item_code: "",
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
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(codeAll);
  };

  return (
    <div>
      <div className="item_search_wrap">
        <form>
          <div>
            <div style={{ marginRight: "20px" }}>
              품목코드 :
              <input
                type="text"
                name="item_code"
                onChange={handleSearchChange}
                style={{ marginRight: "20px" }}
              />
              품목이름 :
              <input
                type="text"
                name="item_name"
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="button"
              onClick={handleSearchSubmit}
            >
              조회
            </button>
          </div>
        </form>
      </div>
      <div className="itemList_wrap">
        <div className="table">
          <thead className="top_table_header">
            <tr>
              <th></th>
              <th>품목코드</th>
              <th>품목이름</th>
              <th>규격</th>
              <th>단위</th>
            </tr>
          </thead>
          <div className="tbody" style={{ height: "430px" }}>
            {itemList.length > 0 &&
              itemList.map((data) => (
                <tr
                  onClick={() => setSelectItem(data)}
                  style={{
                    backgroundColor:
                      selectItem?.item_code == data?.item_code ? "#dadada" : "",
                  }}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectIds.includes(data.item_code)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(data.item_code);
                      }}
                    />
                  </td>
                  <td>{data.item_code}</td>
                  <td>{data.item_name}</td>
                  <td>
                    {codeAll &&
                      codeAll?.data?.find(
                        (cdata) =>
                          cdata.management_code == "STANDARD" &&
                          cdata.common_code == data.standard
                      )?.common_name}
                  </td>
                  <td>{data.unit}</td>
                </tr>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
