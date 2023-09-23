import React, { useEffect, useState } from "react";
import api from "redux/api";

const MasterRow = ({ boundId, key, setMaseterFocus, masterFlag,setSubFlag, setCheckedBoundIds  }) => {
  const [formData, setFormData] = useState({
    bound_id: boundId != 0 && boundId != null ? boundId : 0,
    company_id: "1",
    bound_date: "",
    partner_code: "",
    bound_type: "outbound",
    isDelete: 0,
    bound_no: "",
    emp_id: "1",
    bound_state: "ongoing",
    bound_category: "",
  });

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckedBoundIds(prev => [...prev, formData.bound_id]);
    } else {
      setCheckedBoundIds(prev => prev.filter(id => id !== formData.bound_id));
    }
  };
  useEffect(()=>{
    if(masterFlag){ 
    console.log('마스터요청시작')
    async function insertMaster(){
      try{
        await api.post("/outbound/masterAdd",formData);
        console.log('요청됨');
        setSubFlag(true);
      } catch(error){
        console.log('Error = '+ error);
      }
    }
    insertMaster();
  }
  },[masterFlag]);

  useEffect(()=> {
    console.log(formData)
  },[formData])

  useEffect(() => {
    console.log("master의 boundId", formData["bound_id"]);
  }, [boundId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <tr onClick={() => setMaseterFocus(formData["bound_id"])}>
      <td>
        <input
          type="checkbox"
          name="check"
          onChange={handleCheckboxChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="bound_no"
          onChange={handleInputChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="bound_category"
          onChange={handleInputChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="partner_code"
          onChange={handleInputChange}
        ></input>
      </td>
      <td>
        <input
          type="date"
          name="bound_date"
          onChange={handleInputChange}
        ></input>
      </td>
    </tr>
  );
};

export default MasterRow;
