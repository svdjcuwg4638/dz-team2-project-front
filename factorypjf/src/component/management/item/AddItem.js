import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../redux/api";
import { itemAction } from "../../../redux/actions/management/itemAction";
const AddItem = ({ storageAll, locationAll }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    item_name: "",
    storage_id: "",
    location_id: "",
    itemSKU: "",
    category: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const updatedFormData = {
      item_name: formData.item_name,
      itemSKU: formData.itemSKU,
      category: formData.category,
    };

    try {
      console.log(updatedFormData);
      const response = await api.post("/item/add", updatedFormData);
      setFormData({
        item_name: "",
        storage_id: "",
        location_id: "",
        itemSKU: "",
        category: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    dispatch(itemAction.getItemAll());
  };

  return (
    <form onSubmit={submitHandler} className="mt-5">
      <table>
        <thead>
          <tr>
            <th>품목명</th>
            <th>창고코드</th>
            <th>세부장소</th>
            <th>모델명</th>
            <th>카태고리</th>
          </tr>
        </thead>
        <tbody className="input_partner">
          <tr>
            <td>
              <input
                type="text"
                name="item_name"
                value={formData.item_name}
                onChange={handleInputChange}
              ></input>
            </td>
            <td></td>
            <td>
              <td></td>
            </td>
            <td>
              <input
                type="text"
                name="itemSKU"
                value={formData.itemSKU}
                onChange={handleInputChange}
              ></input>
            </td>
            <td>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              ></input>
            </td>
            <td>
              <input type="submit"></input>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AddItem;
