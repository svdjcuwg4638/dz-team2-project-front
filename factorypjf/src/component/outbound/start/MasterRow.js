import React, { useEffect, useState } from "react";
import api from "redux/api";
import SearchHelper from "component/storage/item/SearchHelper";


const MasterRow = ({ boundId,boundNo, key, setMaseterFocus, masterFlag,setSubFlag, setCheckedBoundIds,partnerAll }) => {
  const [formData, setFormData] = useState({
    bound_id: boundId != 0 && boundId != null ? boundId : 0,
    company_id: "1",
    emp_id: "1",
    bound_no: "",
    bound_category: "",
    partner_code: "",
    bound_date: "",
    bound_type: "outbound",
    bound_state: "end",
    isDelete: 0,
    frontDelete: 0,
  });

  const validateFormData = () => {
    const requiredFields = ["bound_category", "partner_code", "bound_date"];
    
    const fieldToDisplayName = {
        "bound_category": "출고 유형",
        "partner_code": "거래처",
        "bound_date": "출고일자"
    };

    for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === "") {
            alert(`${fieldToDisplayName[field]}은(는) 필수 항목입니다.`);
            return false;
        }
    }
    return true;
};

  
  const handleDateChange = (e) => {
    let { value } = e.target;
    
    // 숫자만 입력받도록 처리
    value = value.replace(/[^0-9]/g, "");

    // 년-월-일 형식에 맞춰서 하이픈 추가
    if (value.length <= 4) {
        value = value;
    } else if (value.length <= 6) {
        value = value.slice(0, 4) + '-' + value.slice(4);
    } else {
        value = value.slice(0, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6, 8);
    }

    // 최대 10자 (YYYY-MM-DD) 까지만 입력 가능하도록
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    setFormData(prev => ({...prev, bound_date: value}));
  }
  //#region Modal관련데이터
    const [HelperScreenState, sedivelperScreenState] = useState(false);
    const selectedPartnerFn = () => {
      sedivelperScreenState(false);
    };

    const item = {
      name: "거래처",
      guide: true,
      type_all: "partnerAll",
      code_column: "partner_code",
      name_column: "partner_name",
      dataAll: {partnerAll},
      trigger_type: "input",
      input_type: "partner",
    };
    
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

      if(!validateFormData()){
        return; // 검증 실패 시 함수 종료
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
          readOnly
        ></input>
      </td>
      <td>
        <select
          name="bound_category"
          value={formData.bound_category}
          onChange={handleInputChange}
      >
          <option value="">-- 선택 --</option>
          <option value="판매">판매</option>
          <option value="A/S">A/S</option>
       </select>
      </td>
      <td>
        <input
           type="text"
           value={formData.partner_code}
           name="partner_code"
           onChange={handleInputChange}
           onKeyDown={(e) => {
            if (e.key === "F2") {
              sedivelperScreenState(!HelperScreenState);
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          pattern="\d{4}-\d{2}-\d{2}" // YYYY-MM-DD 형식 강제
          placeholder="YYYY-MM-DD"
          name="bound_date"
          value={formData["bound_date"]}
          onChange={handleDateChange}
        ></input>
      </td>
    </tr>
    {HelperScreenState && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 10px rgba(0,0,0,0.8)",
                  zIndex: 10,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <SearchHelper
                  handleInputChange={handleInputChange}
                  menu={item}
                  searchPartner={selectedPartnerFn}
                />
              </div>
            )}
    </>
  );
  
};

export default MasterRow;
