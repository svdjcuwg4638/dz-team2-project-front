import React from "react";
import LocationTable from "./LocationTable";
import api from "../../../redux/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";

const RightBox = ({  locationAll }) => {
  const dispatch = useDispatch();

  const [selectIds, setSelectIds] = useState([]);

  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const handleDelete = async () => {
    await api.post("/location/delete", selectIds);
    dispatch(storageAction.getstorageAll());
    setSelectIds([]);
  };


  // #region 세부장소 추가코드
  const [formData, setFormData] = useState({
    storage_code:"",
    location_name:"",
    location_code:"",
    company_id : "1",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      company_id : 1,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/storage/locationAdd", formData);
      dispatch(storageAction.getstorageAll());
      setShouldScrollToBottom(true);
    } catch (error) {
      console.log("error :", error);
    }
  };
  // #endregion


  return (
    <div>
      {locationAll && (
        <LocationTable
          data={locationAll}
          selectIds={selectIds}
          setSelectIds={setSelectIds}
          shouldScrollToBottom={shouldScrollToBottom}
          setShouldScrollToBottom={setShouldScrollToBottom}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="bottom">
          <div className="input_wrap">
            <div style={{ marginRight: "10px" }}>
              <div style={{ marginRight: "10px" }}>창고코드</div>
              <input
                className="inputBox"
                type="text"
                name="storage_code"
                onChange={handleChange}
              />
            </div>
            <div style={{ marginRight: "10px" }}>
              <div style={{ marginRight: "10px" }}>세부장소코드</div>
              <input
                className="inputBox"
                type="text"
                name="location_code"
                onChange={handleChange}
              />
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>세부장소이름</div>
              <input
                className="inputBox"
                type="text"
                name="location_name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button_wrap">
            <button className="button" type="submit"  >
              추가
            </button>
            <button
              className="button"
              style={{ backgroundColor: "red" }}
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
