import React, { useEffect, useState } from "react";
import api from "redux/api";

const MasterRow = ({ boundId, key, setMaseterFocus, masterFlag,setSubFlag, setCheckedBoundIds  }) => {
  const [formData, setFormData] = useState({
    bound_id: boundId != 0 && boundId != null ? boundId : 0,
    company_id: "1",
    emp_id: "1",
    bound_no: "",
    bound_category: "",
    partner_code: "",
    bound_date: "",
    bound_type: "inbound",
    bound_state: "ongoing",
    isDelete: 0,
    frontDelete: 0,
  });

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckedBoundIds(prev => [...prev, formData.bound_id]);
      // 체크될 때 formData의 frontDelete 값을 1로 설정
      setFormData(prev => ({ ...prev, frontDelete: 1 }));
    } else {
      setCheckedBoundIds(prev => prev.filter(id => id !== formData.bound_id));
      // 체크 해제될 때 formData의 frontDelete 값을 0으로 설정
      setFormData(prev => ({ ...prev, frontDelete: 0 }));
    }
  };

  useEffect(()=>{
    if(masterFlag){ 
    console.log('마스터요청시작')
    async function insertMaster(){
      // formData.frontDelete 값이 1인 경우 함수 실행을 중단
      if(formData.frontDelete === 1) {
          console.log('frontDelete is 1, skipping master request');
          return;
      }

      try{
        await api.post("/inbound/masterAdd",formData);
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
