import React, { useEffect, useState } from "react";
import api from "redux/api";

const SubRow = ({ boundId,masterFocus,subFlag, handleRequestFail, handleRequestSuccess,checkedSubBoundIds,setCheckedSubBoundIds, index}) => {
  const [formData, setFormData] = useState({
    bound_id: boundId != 0 && boundId != null ? boundId : 0,
    item_code: "",
    item_name: "",
    unit_price: "",
    stock: "",
    amount: "",
    tot_amount: "",
    detail_date: "",
    storage_code: "",
    location_code: "",
    description: "",
    detail_state: "ongoing",
    detail_isDelete: 0,
    frontDelete: "",
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
        // subFlag가 true이며, frontDelete 값이 1이 아닐 경우에만 요청을 진행
        if(formData.frontDelete === 1) {
            console.log('frontDelete is 1, skipping request');
            return;
        }

        try{
          const response = await api.post("/inbound/detailAdd",formData);
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
            name="unit_price"
            value={formData["unit_price"]}
            onChange={handleInputChange}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="stock"
            value={formData["stock"]}
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
            name="tot_amount"
            value={formData["tot_amount"]}
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
