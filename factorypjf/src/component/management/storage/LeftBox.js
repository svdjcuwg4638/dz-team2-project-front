import { useRef, useState } from "react";
import api from "../../../redux/api";
import StorageTable from "./StorageTable";
import { useDispatch } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";

function LeftBox({ storageAll, selectId, setSelectId }) {
  const dispatch = useDispatch();
  const [selectCodes, setSelectCodes] = useState([]);

  const handleDelete = async () => {
    const result = await api.post("/storage/delete", selectCodes);
    if(result.data.code != 1){
      alert('삭제 불가\n'+result.data.data.map((data)=>data) + '\n재고가 남아있는 창고입니다.') 
      return 
    }else{
      dispatch(storageAction.getstorageAll());
      alert("선택한 창고가 삭제되었습니다.");
      setSelectCodes([]);
    }
  };

  // #region 창고 추가코드
  const [formData, setFormData] = useState({
    storage_name: "",
    storage_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      company_id: 1,
    });
  };

  const [errorField, setErrorField] = useState(null);
  const inputRefs = {
    storage_code: useRef(),
    storage_name: useRef(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToCheck = ["storage_code", "storage_name"];

    const fieldNames = {
      storage_code: "창고 코드",
      storage_name: "창고 이름",
    };

    for (const field of fieldsToCheck) {
      if (!formData[field] || formData[field].trim() === "") {
        setErrorField(field);
        alert(fieldNames[field] + " 입력해주세요");
        inputRefs[field].current.focus();
        return;
      }
    }

    try {
      const response = await api.post("/storage/add", formData);
      if(response.data.code == 1){
        alert(formData.storage_name +'추가 되었습니다.')
        window.location.reload()
      }else{
        alert('이미 존재하는 창고코드 입니다.')
      }
    } catch (error) {
      console.log("error :", error);
    }
  };
  // #endregion

  return (
    <div>
      {storageAll && (
        <StorageTable
          data={storageAll}
          selectCodes={selectCodes}
          setSelectCodes={setSelectCodes}
          selectId={selectId}
          setSelectId={setSelectId}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="storage_bottom">
          <div className="input_wrap">
            <div style={{ marginRight: "10px" }}>
              <div style={{ marginRight: "10px" }}>창고코드</div>
              <div>
                <input
                  ref={inputRefs.storage_code}
                  className="inputBox"
                  type="text"
                  name="storage_code"
                  onChange={(e) => {
                    handleChange(e);
                    setErrorField(null);
                  }}
                  style={{
                    border:
                      errorField === "storage_code" ? "3px solid red" : "",
                  }}
                />
              </div>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>창고명</div>
              <div>
                <input
                  ref={inputRefs.storage_name}
                  className="inputBox"
                  type="text"
                  name="storage_name"
                  onChange={(e) => {
                    handleChange(e);
                    setErrorField(null);
                  }}
                  style={{
                    border:
                      errorField === "storage_name" ? "3px solid red" : "",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="button_wrap">
            <button className="btn_save" type="submit">
              추가
            </button>
            <button
              disabled={!selectCodes.length > 0}
              className="btn_delete"
              type="button"
              style={{ backgroundColor: selectCodes.length > 0 ? "#fff" :"rgb(245, 245, 245)", color:selectCodes.length > 0 ? "" : "#fff"  }}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LeftBox;
