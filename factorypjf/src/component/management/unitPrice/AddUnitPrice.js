import React, { useState } from "react";
import ItemACBox from "../product/ItemACBox";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { unitPriceAction } from "../../../redux/actions/management/unitPriceAction";
import Modal from "component/storage/item/Modal";

const AddUnitPrice = ({ itemAll }) => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    item_code: "",
    company_id: "1",
    partner_code: "",
    unit_price: "",
    start_date: "",
    type: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/unitPrice/add", formData);
      setFormData({
        item_code: "",
        company_id: "1",
        partner_code: "",
        unit_price: "",
        start_date: "",
        type: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    dispatch(unitPriceAction.getUnitPriceAll());
  };

  const item  ={
    name: "품목",
    guide: true,
    type_all: "itemAll",
    code_column: "item_code",
    name_column: "item_name",
    dataAll: { itemAll },
    trigger_type: "input",
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>품목코드</th>
            <th>품목이름</th>
            <th>단가</th>
            <th>시작일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" name="item_code" value={formData["item_code"]} >
              </input>
                <Modal menu={item} handleInputChange={handleInputChange} />
            </td>
            <td>
              <input type="text" name="item_name" value={formData["item_name"]}/>
            </td>
            <td>
              <input
                type="number"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={submitHandler}>등록</button>
      </div>
    </div>
  );
};

export default AddUnitPrice;
