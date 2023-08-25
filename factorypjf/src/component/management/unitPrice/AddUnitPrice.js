import React, { useState } from "react";
import ItemACBox from "../product/ItemACBox";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { unitPriceAction } from "../../../redux/actions/management/unitPriceAction";

const AddUnitPrice = ({ itemAll }) => {

  console.log('itemAll',itemAll);

  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    item_id: "",
    partner_id: "",
    unit_price: "",
    start_date: "",
    end_date: "",
    type: "",
    company_id: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      formData.item_id = selectedItem.item_id
      const response = await api.post("/unitPrice/add", formData);
      setFormData({
        item_id: "",
        partner_id: "",
        unit_price: "",
        start_date: "",
        end_date: "",
        type: "",
        company_id: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    dispatch(unitPriceAction.getUnitPriceAll());
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>품목코드</th>
            <th>품목이름</th>
            <th>단가</th>
            <th>입고/출고</th>
            <th>거래처명</th>
            <th>시작일</th>
            <th>종료일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {itemAll.data &&(
              <ItemACBox
                filterBy="itemSKU"
                itemAll={itemAll}
                setSelectedItem={setSelectedItem}
                selectData={selectedItem?.itemSKU}
              />
              )}
              
            </td>
            <td>
              {itemAll.data && (
              <ItemACBox
                filterBy="item_name"
                itemAll={itemAll}
                setSelectedItem={setSelectedItem}
                selectData={selectedItem?.item_name}
              />
              )}
            </td>
            <td>
              <input type="number" name="unit_price" value={formData.unit_price} onChange={handleInputChange} />
            </td>
            <td>
              <input type="text" name="type" value={formData.type} onChange={handleInputChange}/>
            </td>
            <td>
              <input type="text" name="partner_id" value={formData.partner_id} onChange={handleInputChange}/>
            </td>
            <td>
              <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange}/>
            </td>
            <td>
              <input type="date" name="end_date"value={formData.end_date} onChange={handleInputChange}/>
            </td>
          </tr>
        </tbody>
      </table>
      <div><button onClick={submitHandler}>등록</button></div>
    </div>
  );
};

export default AddUnitPrice;
