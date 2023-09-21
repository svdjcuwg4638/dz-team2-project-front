import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { codeAction } from "redux/actions/management/codeAction";
import api from "redux/api";

const CommonCode = ({ selectId, codeAll, setCodeAllData }) => {
  const [searchData, setSearchData] = useState(
    codeAll?.filter(
      (data) => data.management_code === selectId?.management_code
    )
  );

  useEffect(() => {
    const filteredData = codeAll?.filter(
      (data) => data.management_code === selectId?.management_code
    );
    setSearchData(filteredData);
  }, [selectId]);

  // #region 스크롤
  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
  };
  // #endregion

  const dispatch = useDispatch();

  // #region 코드추가
  const [formData, setFormData] = useState({
    company_id: "1",
    common_code: "",
    common_name: "",
    management_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      management_code: selectId.management_code,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/code/add", formData);
      const adData = response.data.data;
      setSearchData((state) => [...state, adData]);
      setCodeAllData((state) => [...state, adData]);
    } catch (error) {
      console.log("error :", error);
    }

    setFormData({
      ...formData,
      common_code: "",
      common_name: "",
    });
  };
  // #endregion

  // #region 삭제 체크박스 함수
  const [selectCodes, setSelectCodes] = useState([]);

  const handleCheckboxChange = (cd) => {
    if (selectCodes.includes(cd)) {
      setSelectCodes((prev) => prev.filter((itemCd) => itemCd !== cd));
    } else {
      setSelectCodes((prev) => [...prev, cd]);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await api.post("/code/delete", selectCodes);
    dispatch(codeAction.getCodeAll());
    setSelectCodes([]);
  };

  // #endregion

  return (
    <div>
      <div className="ctable">
        <div className="chead">
          <div className="ctr code_row_sub">
            <div></div>
            <div>{selectId?.management_name}코드</div>
            <div>{selectId?.management_name}이름</div>
          </div>
        </div>
      </div>

      <div className="ctable">
        <div className="cbody" onWheel={handleScroll}>
          {searchData &&
            searchData?.map((data) => (
              <div className="ctr code_row_sub">
                <div>
                  <input
                    type="checkbox"
                    checked={selectCodes.includes(data.common_code)}
                    onChange={() => handleCheckboxChange(data.common_code)}
                  />
                </div>
                <div>{data.common_code}</div>
                <div>{data.common_name}</div>
              </div>
            ))}
        </div>
      </div>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="input_wrap">
          <div>
            <div>코드</div>
            <div  style={{ marginRight: "10px" }}>
              <input
                required
                type="text"
                name="common_code"
                value={formData.common_code}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>이름</div>
            <div  style={{ marginRight: "10px" }}>
              <input
                required
                type="text"
                name="common_name"
                value={formData.common_name}
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

export default CommonCode;
