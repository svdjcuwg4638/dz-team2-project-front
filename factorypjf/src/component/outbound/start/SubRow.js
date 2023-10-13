import React, { useEffect, useState } from "react";
import api from "redux/api";
import SearchHelper from "../start/SearchHelper";
import { useDispatch, useSelector } from "react-redux";
import { unitPriceAction } from "redux/actions/management/unitPriceAction";
import LocationSearchHelper from "./LocationSearchHelper";
import '../../../style/inbound/overlay.css'

const rowHoverStyle = {
  backgroundColor: "#f0f0f0", // 원하는 배경색으로 변경하세요.
};

const SubRow = ({ boundId,masterFocus,subFlag, handleRequestFail, handleRequestSuccess,checkedSubBoundIds,setCheckedSubBoundIds, index, itemAll, storageAll, locationAll}) => {
  const [hovered, setHovered] = useState(false); // 마우스 호버 상태를 저장하기 위한 상태 변수

  // 마우스가 행 위로 올라갔을 때 호출되는 이벤트 핸들러
  const handleMouseEnter = () => {
    setHovered(true);
  };

  // 마우스가 행 위에서 벗어났을 때 호출되는 이벤트 핸들러
  const handleMouseLeave = () => {
    setHovered(false);
  };

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
    storage_name: "",
    location_code: "",
    location_name: "",
    description: "",
    detail_state: "ongoing",
    detail_isDelete: 0,
    detail_type:"outbound",
    frontDelete: "",
  });

  const [currentDetailId, setCurrentDetailId] = useState(null);

  useEffect(()=>{
    console.log(formData);
  },[formData])

    //#region Modal관련데이터
    const [HelperScreenState, sedivelperScreenState] = useState(false);
    const selectedPartnerFn = () => {
      sedivelperScreenState(false);
    };

    const [AHelperScreenState, setAhelperScreenState] = useState(false);
    const AselectedPartnerFn = () => {
      setAhelperScreenState(false);
    };
    const handleButtonClick = (type, detailId) => {
      setAhelperScreenState(type);
      setCurrentDetailId(detailId);
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
    const item1 = {
      name: "창고",
      guide: true,
      type_all: "storageAll",
      code_column: "storage_code",
      name_column: "storage_name",
      dataAll: {storageAll},
      trigger_type: "input",
      input_type: "storage",
  };
  
  const item2 = {
      name: "세부장소",
      guide: true,
      type_all: "locationAll",
      code_column: "location_code",
      name_column: "location_name",
      dataAll: {locationAll},
      trigger_type: "input",
      input_type: "location",
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

  const validateFormData = () => {
    const requiredFields = ["item_code", "item_name", "unit_price", "stock", "amount", "tot_amount", "detail_date", "storage_code", "storage_name", "location_code", "location_name"];
    const fieldToDisplayName = {
      "item_code": "품목 코드",
      "item_name": "품목명",
      "unit_price": "단가",
      "stock": "재고",
      "amount": "수량",
      "tot_amount": "총 금액",
      "detail_date": "상세 날짜",
      "storage_code": "창고 코드",
      "storage_name": "창고명",
      "location_code": "위치 코드",
      "location_name": "위치명"
  };
    for (let field of requiredFields) {
      if (!formData[field] || (typeof formData[field] === "string" && formData[field].trim() === "")) {
        alert(`${fieldToDisplayName[field]}은(는) 필수 항목입니다.`);
        return false;
    }
    }
    return true;
};

  const handleAmountBlur = () => {
    
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

        if(!validateFormData()){
          return; // 검증 실패 시 함수 종료
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
  const handleInputChange = async (event) => {
    const { name, value } = event.target; 
    setFormData((prev) => ({...prev, [name] : value}));

    if (name === "location_code" && value && formData.item_code) {
        try {
            const response = await api.get("/outbound/getstock", {
                params: {
                  item_code: formData.item_code,
                  storage_code: formData.storage_code,
                  location_code: value
                }
            });
            console.log(response.data);
            
            if(response.data){
              setFormData(prev => ({ ...prev, stock: response.data}));
              if(response.data <= 0){
                alert("재고가 없습니다.");
              }
            }
            
        } catch (error) {
            setFormData(prev => ({ ...prev, stock: 0}));
            alert(formData.storage_name+'의 '+formData.location_name+' 내부에 '+formData.item_name+'이(가) 없습니다.');
            console.error("Error fetching stock:", error);
        }
    }
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
      <tr 
      style={{
          display: masterFocus === formData["bound_id"] ? "block" : "none",
          ...hovered ? rowHoverStyle : {},
          borderBottom: '1px solid #d9d9d9'
        }}
      onMouseEnter={handleMouseEnter} // 마우스 호버 이벤트 리스너 추가
      onMouseLeave={handleMouseLeave} // 마우스 이탈 이벤트 리스너 추가
      >
        <td style={{width: '8%'}}>
          <input
              type="checkbox"
              checked={checkedSubBoundIds.includes(index)}
              onChange={handleCheckboxChange}
          ></input>
        </td>
        <td style={{width: '8%'}}>
          <input
            className="input_red"
            type="text"
            name="item_code"
            value={formData["item_code"]}
            onChange={handleInputChange}
            readOnly
            onKeyDown={(e) => {
              if (e.key === "F2") {
                sedivelperScreenState(!HelperScreenState);
              }
              if (e.key === "F4") {
                setFormData(prev => ({ ...prev, item_code: "" }));
                setFormData(prev => ({ ...prev, item_name: "" }));
                setFormData(prev => ({ ...prev, unit_price: "" }));
            }
            }}
          ></input>
        </td>
        <td style={{width: '8%'}}>
          <input
            className="input_red"
            type="text"
            name="item_name"
            value={formData["item_name"]}
            onChange={handleInputChange}
            readOnly
          ></input>
        </td>
        <td style={{width: '8%'}}>
          <input
            className="input_red"
            type="text"
            name="unit_price"
            value={formData["unit_price"]}
            onChange={handleInputChange}
            readOnly
          ></input>
        </td>
        <td style={{width: '8%'}}>
          <input
            className="input_red"
            type="text"
            name="storage_code"
            value={formData["storage_name"]}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "F2") {
                handleButtonClick('storage');
              }
            }}
          ></input>
        </td>
        <td style={{width: '8%'}}>
          <input
            className="input_red"
            type="text"
            name="location_code"
            value={formData["location_name"]}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "F2") {
                handleButtonClick('location');
              }
            }}
          ></input>
        </td>
        <td style={{width: '8%'}}>
          <input
            className="input_red"
            type="text"
            name="stock"
            value={formData["stock"]}
            onChange={handleInputChange}
            readOnly
          ></input>
        </td>
        <td style={{width: '8%'}}>
          <input
            className="input_red"
            type="text"
            name="amount"
            value={formData["amount"]}
            onChange={handleInputChange}
            onBlur={handleAmountBlur}
            readOnly={parseInt(formData["stock"]) <= 0}
          ></input>
        </td>
        <td style={{width: '8%'}}>
          <input
            className="input_red"
            type="text"
            name="tot_amount"
            value={formData["tot_amount"]}
            onChange={handleInputChange}
            readOnly
          ></input>
        </td>
        <td style={{width: '12%'}}>
        <input
            className="input_red"
             type="date"
             min="1900-01-01"
             max="9999-12-31"
            name="detail_date"
            value={formData["detail_date"]}
            onChange={handleDateChange}
        />
        </td>
        <td style={{width: '16%'}}>
          <input
            type="text"
            name="description"
            value={formData["description"]}
            onChange={handleInputChange}
          ></input>
        </td>
      </tr>
      {HelperScreenState && (
      <div>
        <div className="subRowBk" onClick={()=>sedivelperScreenState(!HelperScreenState)}></div>
        <div
          style={{
            position: "fixed",
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
      </div>
      )}
      {AHelperScreenState && (
        <div>
        <div className="subRowBk" onClick={()=>setAhelperScreenState(!AHelperScreenState)}></div>
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 10px rgba(0,0,0,0.8)",
                    zIndex: 10,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <LocationSearchHelper
                    handleInputChange={handleInputChange}
                    menu={AHelperScreenState === 'storage' ? item1 : item2}
                    searchPartner={AselectedPartnerFn}
                    currentDetailId={currentDetailId}
                />
            </div>
          </div>
        )}
      </>
  );
};

export default SubRow;
