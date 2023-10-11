import React, { useEffect, useRef } from "react";
import LocationTable from "./LocationTable";
import api from "../../../redux/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";

const RightBox = ({ locationAll, selectId }) => {
  const dispatch = useDispatch();

  const [selectIds, setSelectIds] = useState([]);

  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const handleDelete = async () => {
    const result = await api.post("/location/delete", selectIds);
    if(result.data.code != 1){
      alert('삭제 불가\n'+result.data.data.map((data)=>data) + '\n재고가 남아있는 창고입니다.')
      return
    }else{
      alert("선택한 세부장소가 삭제되었습니다.");
      dispatch(storageAction.getstorageAll());
      setSelectIds([]);
    }
  };

  // #region 세부장소 추가코드
  const [formData, setFormData] = useState({
    storage_code: "",
    location_name: "",
    location_code: "",
    company_id: "1",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errorField, setErrorField] = useState(null);
  const inputRefs = {
    location_code: useRef(),
    location_name: useRef(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectId){
      alert('창고를 선택해주세요.')
      return
    }

    const fieldsToCheck = ["location_code", "location_name"];

    const fieldNames = {
      location_code: "세부장소 코드",
      location_name: "세부장소 이름",
    };

    for (const field of fieldsToCheck) {
      if (!formData[field] || formData[field].trim() === "") {
        setErrorField(field);
        alert(fieldNames[field] + " 입력해주세요");
        inputRefs[field].current.focus();
        return;
      }
    }

    const submitData = {
      ...formData,
      storage_code: selectId.storage_code,
    };

    try {
      const response = await api.post("/storage/locationAdd", submitData);
      if (response.data.code == 1) {
        alert(submitData.location_name + " 추가되었습니다.");
        dispatch(storageAction.getstorageAll());
      } else {
        alert("이미 존재하는 세부장소 코드입니다.");
      }
      setShouldScrollToBottom(true);
    } catch (error) {
      console.log("error :", error);
    }
    setFormData({
      storage_code: selectId.storage_code,
      location_name: "",
      location_code: "",
      company_id: "1",
    });
  };
  // #endregion

  //#region 미입력 인풋 입력시 테두리제거
  useEffect(() => {
    if (errorField == "location_code") {
      setErrorField(null);
    }
  }, [formData.location_code]);
  useEffect(() => {
    if (errorField == "location_name") {
      setErrorField(null);
    }
  }, [formData.location_name]);

  return (
    <div>
      {locationAll && (
        <LocationTable
          data={locationAll}
          selectIds={selectIds}
          selectId={selectId}
          setSelectIds={setSelectIds}
          shouldScrollToBottom={shouldScrollToBottom}
          setShouldScrollToBottom={setShouldScrollToBottom}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="storage_bottom">
          <div className="input_wrap">
            <div style={{ marginRight: "10px" }}>
              <div style={{ marginRight: "10px" }}>세부장소코드</div>
              <input
                ref={inputRefs.location_code}
                className="inputBox"
                type="text"
                name="location_code"
                value={formData.location_code}
                onChange={handleChange}
                style={{
                  border: errorField === "location_code" ? "3px solid red" : "",
                }}
              />
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>세부장소명</div>
              <input
                ref={inputRefs.location_name}
                style={{
                  border: errorField === "location_name" ? "3px solid red" : "",
                }}
                className="inputBox"
                type="text"
                name="location_name"
                value={formData.location_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button_wrap">
            <button className="btn_save" type="submit"
            >
              추가
            </button>
            <button
              type="button"
              disabled={!selectIds.length > 0}
              className="btn_delete"
              style={{ backgroundColor: selectIds.length > 0 ? "#fff" :"rgb(245, 245, 245)", color:selectIds.length > 0 ? "" : "#fff"  }}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RightBox;
