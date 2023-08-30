import { useState } from "react";
import api from "../../../redux/api";
import StorageTable from "./StorageTable";
import { useDispatch } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";

function LeftBox({ storageAll }) {
  const dispatch = useDispatch();
  const [selectCodes, setSelectCodes] = useState([]);

  const handleDelete = async () => {
    await api.post("/storage/delete", selectCodes);
    dispatch(storageAction.getstorageAll());
    setSelectCodes([]);
  };

  // #region 창고 추가코드
  const [formData, setFormData] = useState({
    storage_name:"",
    storage_code:"",
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
      const response = await api.post("/storage/add", formData);
      dispatch(storageAction.getstorageAll());
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
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="bottom">
          <div className="input_wrap">
            <div style={{marginRight:'10px'}}>
              <div style={{ marginRight: "10px" }}>창고코드</div>
              <div>
                <input
                  className="inputBox"
                  type="text"
                  name="storage_code"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>창고이름</div>
              <div>
                <input
                  className="inputBox"
                  type="text"
                  name="storage_name"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="button_wrap">
            <button className="button" type="submit">
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
}

export default LeftBox;
