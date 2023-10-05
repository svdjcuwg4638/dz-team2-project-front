import React, { useEffect, useState } from "react";
import api from "redux/api";
import SearchHelper from "../start/SearchHelper";
import { useDispatch, useSelector } from "react-redux";
import { unitPriceAction } from "redux/actions/management/unitPriceAction";

const SubRow = ({ boundId,masterFocus,subFlag, handleRequestFail, handleRequestSuccess,checkedSubBoundIds,setCheckedSubBoundIds, index, itemAll}) => {
  const dispatch = useDispatch();
  const { unitPriceAll } = useSelector((state) => state.unitPrice);
  useEffect(() => {
  dispatch(unitPriceAction.getCurrentUnitPriceAll());
  }, []);

  useEffect(()=>{
    console.log('전체',unitPriceAll);
  },[unitPriceAll]);

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
    detail_type: "inbound",
    frontDelete: "",
  });

  useEffect(()=>{
    console.log(formData);
  },[formData])

    //#region Modal관련데이터
    const [HelperScreenState, sedivelperScreenState] = useState(false);
    const selectedPartnerFn = () => {
      sedivelperScreenState(false);
    };
    const item = {
      name: "품목",
      guide: true,
      type_all: "itemAll",
      code_column: "item_code",
      name_column: "item_name",
      dataAll: { itemAll },
      trigger_type: "input",
      input_type: "item",
    };
    
  //#endregion
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setCheckedSubBoundIds((prev) => [...prev, index]);
    } else {
      setCheckedSubBoundIds((prev) => prev.filter(idx => idx !== index));
    }
  };

  const handleAmountBlur = () => {
    // formData 내의 unit_price와 amount 값을 가져와서 곱합니다.
    const totalAmount = parseFloat(formData.unit_price || 0) * parseFloat(formData.amount || 0);
    
    // 결과를 tot_amount에 저장합니다.
    const formattedTotalAmount = new Intl.NumberFormat('ko-KR').format(totalAmount);

    setFormData(prev => ({
        ...prev,
        tot_amount: formattedTotalAmount
     }));
    };

  //서버요청
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

  //row데이터 확인
  useEffect(() => {
    console.log("boundId formdata의", formData["bound_id"]);
  }, [boundId]);

  //modal에 넘겨줄 handler (도움창)
  const handleInputChange = (event) => {
    const { name, value } = event.target; 
    setFormData((prev) => ({...prev, [name] : value}));
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

    setFormData(prev => ({...prev, detail_date: value}));
  }

  useEffect(() => {
    const matchedUnitPrice = unitPriceAll.data?.find(up => up.item_code === formData.item_code);

    if (matchedUnitPrice) {
        setFormData(prev => ({
            ...prev,
            unit_price: matchedUnitPrice.unit_price
        }));
    }
  }, [formData.item_code]);

  return (
    <>
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
            name="item_name"
            value={formData["item_name"]}
            onChange={handleInputChange}
            readOnly
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="unit_price"
            value={formData["unit_price"]}
            onChange={handleInputChange}
            readOnly
          ></input>
        </td>
        {/* <td>
          <input
            type="text"
            name="stock"
            value={formData["stock"]}
            onChange={handleInputChange}
          ></input>
        </td> */}
        <td>
          <input
            type="text"
            name="amount"
            value={formData["amount"]}
            onChange={handleInputChange}
            onBlur={handleAmountBlur}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="tot_amount"
            value={formData["tot_amount"]}
            onChange={handleInputChange}
            readOnly
          ></input>
        </td>
        <td>
        <input
            type="text" // 'date' 대신 'text'로 변경
            pattern="\d{4}-\d{2}-\d{2}" // YYYY-MM-DD 형식 강제
            placeholder="YYYY-MM-DD"
            name="detail_date"
            value={formData["detail_date"]}
            onChange={handleDateChange}
        />
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

export default SubRow;
