import React, { useEffect, useState } from "react";
import api from "redux/api";
import TextHelperModal from "./TextHelperModal";

const MasterRow = ({ boundId,boundNo, key, setMaseterFocus, masterFlag,setSubFlag, setCheckedBoundIds }) => {
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

  //#region Modal관련데이터
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 상태
  const [activeInput, setActiveInput] = useState(""); // F2 키를 누른 input의 name

  const handleKeyDown = (event) => {
    if (event.key === "F2") {
      setActiveInput(event.target.name); // 현재 포커스된 input의 name 설정
      setIsModalOpen(true); // 모달 열기
    }
  };

  const handleModalSelect = (selectedValue) => {
    setFormData((prevState) => ({ ...prevState, [activeInput]: selectedValue })); // formData 업데이트
    setIsModalOpen(false); // 모달 닫기
  };

  const handleModalclose = () =>{
    setIsModalOpen(false);
  }
  //#endregion
  

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

  useEffect(() => {
    setFormData(prev => ({ ...prev, bound_no: boundNo }));
  }, [boundNo]);
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
    <>
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
          value={boundNo}
          name="bound_no"
          onChange={handleInputChange}
        ></input>
      </td>
      <td>
        <select
          name="bound_category"
          value={formData.bound_category}
          onChange={handleInputChange}
      >
          <option value="">-- 선택 --</option>
          <option value="구매">구매</option>
          <option value="반품">반품</option>
          <option value="판매">판매</option>
       </select>
      </td>
      <td>
        <input
           type="text"
           value={formData.partner_code}
           name="partner_code"
           onChange={handleInputChange}
           onKeyDown={handleKeyDown}
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
          {isModalOpen && (
            <TextHelperModal 
              handleModalSelect={handleModalSelect} 
              handleModalclose={handleModalclose}
              activeInput={activeInput}
            />
          )}
    </>
  );
  
};

export default MasterRow;
