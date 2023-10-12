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
  }, [selectId, codeAll]);


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
    });
  };

    //#region 미입력 input창 입력시 빨간색 테두리제거
    useEffect(() => {
      if (errorField == "common_code") {
        setErrorField(null);
      }
    }, [formData.common_code]);
    useEffect(() => {
      if (errorField == "common_name") {
        setErrorField(null);
      }
    }, [formData.common_name]);
    //#endregion

    const [errorField, setErrorField] = useState(null);

    const inputRefs = {
      common_code: useRef(),
      common_name: useRef(),
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(selectId == null){
      alert('관리코드를 선택해주세요')
      return
    }

    const fieldsToCheck = [
      "common_code",
      "common_name",
    ];

    const fieldNames = {
      common_code: "품목 코드",
      common_name: "품목 이름",
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
      const submitdata ={
        ...formData,
        management_code: selectId.management_code,
      }

      const response = await api.post("/code/add", submitdata);
      if(response.data.code == 1){
        alert(selectId.management_name +' 관리코드 '+ formData.common_name + ' 추가되었습니다.')
        const adData = response.data.data;
        setSearchData((state) => [...state, adData]);
        setCodeAllData((state) => [...state, adData]);
        setFormData({
          ...formData,
          common_code: "",
          common_name: "",
        });
      }else{
        alert('이미 '+selectId.management_name +'에 등록된 코드입니다.')
      }
    } catch (error) {
      console.log("error :", error);
    }

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
    alert('삭제되었습니다.')
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
        <div className="cbody">
          {searchData &&
            searchData?.map((data) => (
              <div className="ctr code_row_sub common_code_list_content ">
                <div>
                  <input
                  className="management_checkBox"
                    type="checkbox"
                    checked={selectCodes.includes(data)}
                    onChange={() => handleCheckboxChange(data)}
                  />
                </div>
                <div>{data.common_code}</div>
                <div>{data.common_name}</div>
              </div>
            ))}
        </div>
      </div>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="input_wrap management_inputBox">
          <div>
            <div>{selectId?.management_name}코드</div>
            <div  style={{ marginRight: "10px" }}>
              <input
              ref={inputRefs.common_code}
                type="text"
                name="common_code"
                value={formData.common_code}
                onChange={handleChange}
                style={{
                  border:
                    errorField === "common_code"
                      ? "3px solid red"
                      : "",
                }}
              />
            </div>
          </div>
          <div>
            <div>{selectId?.management_name}이름</div>
            <div  style={{ marginRight: "10px" }}>
              <input
                ref={inputRefs.common_name}
                type="text"
                name="common_name"
                value={formData.common_name}
                onChange={handleChange}
                style={{
                  border:
                    errorField === "common_name"
                      ? "3px solid red"
                      : "",
                }}
              />
            </div>
          </div>
        </div>
        <div className="button_wrap">
          <button type="submit" className="btn_save">
            추가
          </button>
          <button
            className="btn_delete"
            style={{ backgroundColor: selectCodes.length > 0 ? "#fff" :"rgb(245, 245, 245)", color:selectCodes.length > 0 ? "" : "#fff"  }}
            onClick={handleDelete}
            disabled={!selectCodes.length > 0}
          >
            삭제
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommonCode;
