import React, { useEffect, useState } from "react";
import api from "redux/api";

const SubRow = ({ boundId,masterFocus,subFlag, handleRequestFail, handleRequestSuccess,checkedSubBoundIds,setCheckedSubBoundIds, index}) => {
  const [formData, setFormData] = useState({
    company_id: "1",
    bound_id: boundId != 0 && boundId != null ? boundId : 0,
    item_code: "",
    item_name: "",
    amount: "",
    unit_price_id: "",
    tot_amount: "",
    inventory_id: "",
    detail_state: "ongoing",
    detail_date: "",
    detail_isDelete: 0,
    description: "",
    storage_code: "",
    location_code: "",
  });

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setCheckedSubBoundIds((prev) => [...prev, index]);
    } else {
      setCheckedSubBoundIds((prev) => prev.filter(idx => idx !== index));
    }
  };

  useEffect(()=>{
    if(subFlag){
      console.log('디테일요청시작')
      async function insertDetail(){
        try{
          const response = await api.post("/outbound/detailAdd",formData);
          if (response.status !== 200) {
            handleRequestFail();
          } else {
            handleRequestSuccess();
          }
        } catch(error){
          handleRequestFail();
          console.log('Error = '+error);
        }
      }
      insertDetail();
    }
  },[subFlag]);

  useEffect(() => {
    console.log("boundId formdata의", formData["bound_id"]);
  }, [boundId]);

  useEffect(()=> {
    console.log(formData)
  },[formData])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  return (
      <tr style={{display:masterFocus == formData["bound_id"] ? "block":"none"}}>
        <td>
          <input
              type="checkbox"
              checked={checkedSubBoundIds.includes(index)}
              onChange={handleCheckboxChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="item_code"
            value={formData["item_code"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="item_name"
            value={formData["item_name"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="amount"
            value={formData["amount"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="unit_price_id"
            value={formData["unit_price_id"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="tot_amount"
            value={formData["tot_amount"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="inventory_id"
            value={formData["inventory_id"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="date"
            name="detail_date"
            value={formData["detail_date"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="description"
            value={formData["description"]}
            onChange={handleInputChange}
          ></input>
        </td>
      </tr>
  );
};

export default SubRow;
