import SearchHelper from "component/storage/item/SearchHelper";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { relationAction } from "redux/actions/management/relationAction";
import api from "redux/api";

const RelationItem = ({ selectId, itemAll, codeAllData, setCodeAllData }) => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const filteredData = codeAllData?.filter(
      (data) => data.item_code === selectId?.item_code
    );
    setSearchData(filteredData);
    setSelectCodes([]);
    setFormData({
      company_id: "1",
      item_code: "",
      item_name: "",
      quantity: "",
      component_code: "",
    });
  }, [selectId, codeAllData]);

  // #region 스크롤
  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
  };
  // #endregion

  // #region 추가 코드
  const [formData, setFormData] = useState({
    company_id: "1",
    item_code: "",
    item_name: "",
    quantity: "",
    component_code: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [errorField, setErrorField] = useState(null);
  const inputRefs = {
    item_code: useRef(),
    item_name: useRef(),
    quantity: useRef(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToCheck = ["item_code", "item_name", "quantity"];

    const fieldNames = {
      item_code: "품목 코드",
      item_name: "품목 이름",
      quantity: "소모수량",
    };

    for (const field of fieldsToCheck) {
      if (!formData[field] || formData[field].trim() === "") {
        setErrorField(field);
        alert(fieldNames[field] + " 입력해주세요");
        inputRefs[field].current.focus();
        return;
      }
    }

    const submitdata = {
      ...formData,
      component_code: formData.item_code,
      item_code: selectId.item_code,
    };
    try {
      const response = await api.post("/relation/add", submitdata);
      if (response.data.code == 1) {
        const adData = response.data.data;
        setSearchData((state) => [...state, adData]);
        setCodeAllData((state) => [...state, adData]);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error :", error);
    }

    setFormData({
      ...formData,
      item_code: "",
      item_name: "",
      quantity: "",
      component_code: "",
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
    await api.post("/relation/delete", selectCodes);
    dispatch(relationAction.getRelationAll());
    setSelectCodes([]);
  };

  // #endregion

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

  return (
    <div style={{marginTop:"96px"}}>
      <div className="ctable">
        <div className="chead">
          <div className="ctr relation_row_sub">
            <div></div>
            <div>자재코드</div>
            <div>자재명</div>
            <div>필요수량</div>
          </div>
        </div>
      </div>

      <div className="ctable">
        <div className="cbody" style={{height:"40vh"}} onWheel={handleScroll}>
          {searchData &&
            searchData?.map((data) => (
              <div className="ctr relation_row_sub">
                <div>
                  <input
                    type="checkbox"
                    className="management_checkBox"
                    checked={selectCodes.includes(data)}
                    onChange={() => handleCheckboxChange(data)}
                  />
                </div>
                <div>{data.component_code}</div>
                <div>
                  {
                    itemAll.data.find(
                      (idata) => idata.item_code == data.component_code
                    ).item_name
                  }
                </div>
                <div>{data.quantity}</div>
              </div>
            ))}
        </div>
      </div>
      <form className="mt-3 management_inputBox" onSubmit={handleSubmit}>
        <div className="relation_input_wrap">
          <div>
            <div>
              자재코드
              <span class="wrap-search-icon">
                <i class="fa-solid fa-circle-info"></i>
              </span>
            </div>
            <div style={{ marginRight: "10px" }}>
              <input
                className="inputBox"
                ref={inputRefs.item_code}
                type="text"
                name="item_code"
                value={formData.item_code}
                onChange={(e) => {
                  handleInputChange(e);
                  setErrorField(null);
                }}
                style={{
                  border: errorField === "item_code" ? "3px solid red" : "",
                }}
                onKeyDown={(e) => {
                  if (e.key === "F2") {
                    sedivelperScreenState(!HelperScreenState);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <div>
              자재명
              <span class="wrap-search-icon">
                <i class="fa-solid fa-circle-info"></i>
              </span>
            </div>
            <div style={{ marginRight: "10px" }}>
              <input
                ref={inputRefs.item_name}
                type="text"
                name="item_name"
                value={formData.item_name}
                onChange={(e) => {
                  handleInputChange(e);
                  setErrorField(null);
                }}
                style={{
                  border: errorField === "item_code" ? "3px solid red" : "",
                }}
                onKeyDown={(e) => {
                  if (e.key === "F2") {
                    sedivelperScreenState(!HelperScreenState);
                  }
                }}
              />
            </div>
            {HelperScreenState && (
              <div>
                <div
                  className="relation_back_modal"
                  onClick={() => sedivelperScreenState(!HelperScreenState)}
                ></div>
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
          </div>
          <div>
            <div>필요수량</div>
            <div style={{ marginRight: "10px" }}>
              <input
                ref={inputRefs.quantity}
                type="text"
                name="quantity"
                style={{
                  border: errorField === "quantity" ? "3px solid red" : "",
                }}
                value={formData.quantity}
                onChange={(e) => {
                  handleInputChange(e);
                  setErrorField(null);
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
            type="button"
            disabled={!selectId}
            className="btn_delete"
            style={{
              backgroundColor: selectCodes.length > 0 ? "#fff" : "rgb(245, 245, 245)",
              color: selectCodes.length > 0 ? "" : "#fff",
            }}
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </form>
    </div>
  );
};

export default RelationItem;
