import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { codeAction } from "redux/actions/management/codeAction";
import api from "redux/api";
import SearchBox from "./SearchBox";

const CommonCode = ({ selectId, codeAll }) => {
  const filteredData = codeAll?.filter(
    (data) => data.management_code_id === selectId
  );

  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
  };

  const dispatch = useDispatch();

  // #region 코드추가
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    management_code_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      management_code_id: selectId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/code/add", formData);
      dispatch(codeAction.getCodeAll());
    } catch (error) {
      console.log("error :", error);
    }
  };
  // #endregion

  //#region 관리코드검색
  const [formSearchData, setSearchFormData] = useState({
    management_name: "",
    management_code: "",
    url: "/managecode/codeSearch",
    searchName: ["코드", "코드명"],
  });
  //#endregion

  // #region 삭제 체크박스 함수
  const [selectCodes, setSelectCodes] = useState([]);

  const handleCheckboxChange = (cd) => {
    if (selectCodes.includes(cd)) {
      setSelectCodes((prev) => prev.filter((itemCd) => itemCd !== cd));
    } else {
      setSelectCodes((prev) => [...prev, cd]);
    }
  };
  // #endregion

  return (
    <div>
      <SearchBox
        formSearchData={formSearchData}
        setSearchFormData={setSearchFormData}
      />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>코드</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody className="code-scrollable-table" onWheel={handleScroll}>
          {codeAll &&
            filteredData.map((data) => (
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={selectCodes.includes(data.common_code_id)}
                    onChange={() => handleCheckboxChange(data.common_code_id)}
                  />
                </td>
                <td>{data.code}</td>
                <td>{data.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="input_wrap">
          <div>
            <div>코드</div>
            <div className="inputBox" style={{ marginRight: "10px" }}>
              <input
                required
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>이름</div>
            <div className="inputBox" style={{ marginRight: "10px" }}>
              <input
                readOnly
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="button_wrap">
          <button type="submit" className="button">
            추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommonCode;
