import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { codeAction } from "redux/actions/management/codeAction";
import api from "redux/api";
import SearchBox from "./SearchBox";

const ManageCode = ({ manageCodeAll, setSelectId, selectId }) => {
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState(manageCodeAll);

  const tableRef = useRef(null);

  
  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
  };
  
  // #region 삭제 
  const [selectCodes, setSelectCodes] = useState([]);
  const handleCheckboxChange = (cd) => {
    if (selectCodes.includes(cd)) {
      setSelectCodes((prev) => prev.filter((itemCd) => itemCd !== cd));
    } else {
      setSelectCodes((prev) => [...prev, cd]);
    }
    console.log(selectCodes);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await api.post("/managecode/delete", selectCodes);
    dispatch(codeAction.getCodeAll());
    setSelectCodes([]);
  };
  // #endregion

  //#region 관리코드 추가
  const [formData, setFormData] = useState({
    company_id:"1",
    management_name: "",
    management_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/managecode/add", formData);
      dispatch(codeAction.getCodeAll());
    } catch (error) {
      console.log("error :", error);
    }
  };
  //#endregion

  //#region 관리코드검색
  const [formSearchData, setSearchFormData] = useState({
    management_name: "",
    management_code: "",
    url: "/managecode/search",
    searchName: ["관리코드", "관리코드명"],
    keys:["management_code","management_name"],
  });
  //#endregion

  return (
    <div>
      <SearchBox
        formSearchData={formSearchData}
        setSearchFormData={setSearchFormData}
        setSearchData={setSearchData}
      />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>관리코드</th>
            <th>관리코드명</th>
          </tr>
        </thead>
        <tbody className="code-scrollable-table" onWheel={handleScroll}>
          {searchData &&
            searchData.map((data) => (
              <tr onClick={() => setSelectId(data.management_code)}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectCodes.includes(data.management_code)}
                    onChange={() =>
                      handleCheckboxChange(data.management_code)
                    }
                  />
                </td>
                <td
                  style={{
                    backgroundColor:
                      selectId == data.management_code
                        ? "#dadada"
                        : "transparent",
                  }}
                >
                  {data.management_code}
                </td>
                <td
                  style={{
                    backgroundColor:
                      selectId == data.management_code
                        ? "#dadada"
                        : "transparent",
                  }}
                >
                  {data.management_name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="input_wrap">
          <div>
            <div>관리코드</div>
            <div className="inputBox" style={{ marginRight: "10px" }}>
              <input
                required
                type="text"
                name="management_code"
                value={formData.management_code}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>관리코드명</div>
            <div className="inputBox" style={{ marginRight: "20px" }}>
              <input
                required
                type="text"
                name="management_name"
                value={formData.management_name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="button_wrap">
          <button type="submit" className="button">
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
      </form>
    </div>
  );
};

export default ManageCode;
