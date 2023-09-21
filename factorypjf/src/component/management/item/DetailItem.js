import Modal from "component/storage/item/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "redux/actions/management/itemAction";
import api from "redux/api";
import StorageHelp from "../storage/StorageHelp";
import { codeAction } from "redux/actions/management/codeAction";
import { storageAction } from "redux/actions/management/storageAction";

const DetailItem = ({ selectItem, setSelectItem }) => {
  const dispatch = useDispatch();

  const { locationAll, storageAll } = useSelector((state) => state.storage);
  const { codeAll } = useSelector((state) => state.code);
  const [formMod, setFormMod] = useState("");

  useEffect(() => {
    dispatch(codeAction.getCodeAll());
    dispatch(storageAction.getstorageAll());
  }, []);

  // #form 기본정보
  const [formData, setFormData] = useState({
    company_id: "1",
    item_code: "",
    item_name: "",
    location_code: "",
    storage_code: "",
    width: "",
    length: "",
    height: "",
    volume: "",
    weight: "",
    unit: "",
    description: "",
    category: "",
    category_name: "",
    standard: "",
    standard_name: "",
  });

  // #region 규격에 단위없애주는 코드
  const removeNonNumeric = (str) => {
    return str?.replace(/\D/g, "");
  };

  const toggleReadOnly = () => {
    setReadOnly(!readOnly);

    if (formMod == "modify") {
      if (readOnly) {
        setFormData((prevState) => ({
          ...prevState,
          width: removeNonNumeric(prevState.width),
          length: removeNonNumeric(prevState.length),
          height: removeNonNumeric(prevState.height),
          volume: removeNonNumeric(prevState.volume),
          weight: removeNonNumeric(prevState.weight),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          width: selectItem?.width,
          length: selectItem?.length,
          height: selectItem?.height,
          volume: selectItem?.volume,
          weight: selectItem?.weight,
        }));
      }
    }
  };
  // #endregion

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      standard_name: codeAll?.data?.find(
        (data) => data.common_code === formData?.standard
      )?.common_name,
      category_name: codeAll?.data?.find(
        (data) => data.common_code === formData?.category
      )?.common_name,
    }));
  }, [formData["category"], formData["standard"]]);

  // #region 선택된 아이탬 변경시 값을 바꿔줌
  useEffect(() => {
    if (selectItem != null) {
      setReadOnly(true);
      setFormMod("");
      setFormData(null);
      setFormData({
        company_id: "1",
        item_code: selectItem?.item_code,
        item_name: selectItem?.item_name,
        location_code: locationAll?.data?.find(
          (data) => data?.location_code == selectItem?.location_code
        )?.location_name,
        storage_code: storageAll?.data?.find(
          (data) => data?.storage_code == selectItem?.storage_code
        )?.storage_name,
        width: selectItem?.width == null ? "" : selectItem?.width,
        length: selectItem?.length == null ? "" : selectItem?.length,
        height: selectItem?.height == null ? "" : selectItem?.height,
        volume: selectItem?.volume == null ? "" : selectItem?.volume,
        weight: selectItem?.weight == null ? "" : selectItem?.weight,
        description:
          selectItem?.description == null ? "" : selectItem?.description,
        category: selectItem?.category == null ? "" : selectItem?.category,
        standard: selectItem?.standard == null ? "" : selectItem?.standard,
        unit: selectItem?.unit == null ? "" : selectItem.unit,
        category_name: "",
        standard_name: "",
      });
    }
  }, [selectItem]);
  // #endregion

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleInputChangeForUnit = (event) => {
    const { name, value } = event.target;
    setUnitData((prevState) => ({ ...prevState, [name]: value }));
  };

  //
  const submitHandler = async (event) => {
    event.preventDefault();

    var locationData = locationAll?.data?.find(
      (data) =>
        data.storage_code ==
          storageAll.data.filter(
            (data) => data.storage_name == formData["storage_code"]
          )[0].storage_code && data.location_name == formData["location_code"]
    );

    var submitData = {
      company_id: "1",
      item_code: formData["item_code"],
      item_name: formData["item_name"],
      location_code: locationData.location_code,
      storage_code: locationData.storage_code,
      width: formData["width"] + unitData["width"],
      length: formData["length"] + unitData["length"],
      height: formData["height"] + unitData["height"],
      volume: formData["volume"] + unitData["volume"],
      weight: formData["weight"] + unitData["weight"],
      description: formData["description"],
      category: formData["category"],
      standard: formData["standard"],
      unit: formData["unit"],
    };

    try {
      if (formMod == "modify") {
        const response = await api.post("/item/modify", submitData);
        alert('수정완료')
        window.location.reload()
      }
      if (formMod == "add") {
        const response = await api.post("/item/add", submitData);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    dispatch(itemAction.getItemAll());
  };

  const [readOnly, setReadOnly] = useState(true);
  function buttonHandler(e) {
    toggleReadOnly();
    const { name } = e.target;

    if (name === "add") {
      setFormData({
        company_id: "1",
        item_code: "",
        item_name: "",
        location_code: "",
        storage_code: "",
        width: "",
        length: "",
        height: "",
        volume: "",
        weight: "",
        unit: "",
        description: "",
        category: "",
        category_name: "",
        standard: "",
        standard_name: "",
      });

      if (!readOnly) {
        setFormMod("");
      } else {
        setFormMod("add");
      }

      setSelectItem(null);
    } else if (name === "modify") {
      if (formMod === "modify") {
        setFormData("");
      }
      if (!readOnly) {
        setFormMod("");
      } else {
        setFormMod("modify");
      }
    }
  }

  //#region 도움창 props
  const [showFlag, setShowFlag] = useState(false);

  const [unitData, setUnitData] = useState({
    width: "m",
    length: "m",
    height: "m",
    volume: "L",
    weight: "Kg",
    unit: "EA",
  });

  const unitCode = {
    name: "공통코드",
    guide: true,
    type_all: "codeAll",
    code_column: "common_code",
    name_column: "common_name",
    dataAll: { codeAll },
    common_code_type: "UNIT",
    trigger_type: "search",
  };
  const numberUnitCode = {
    name: "공통코드",
    guide: true,
    type_all: "codeAll",
    code_column: "common_code",
    name_column: "common_name",
    dataAll: { codeAll },
    common_code_type: "NUMBERUNIT",
    trigger_type: "search",
  };

  const categoryCode = {
    name: "공통코드",
    guide: true,
    type_all: "codeAll",
    code_column: "common_code",
    name_column: "common_name",
    dataAll: { codeAll },
    common_code_type: "CATEGORY",
    trigger_type: "search",
  };

  const standardCode = {
    name: "공통코드",
    guide: true,
    type_all: "codeAll",
    code_column: "common_code",
    name_column: "common_name",
    dataAll: { codeAll },
    common_code_type: "STANDARD",
    trigger_type: "search",
  };
  // #endregion

  return (
    <div className="detail_wrap" style={{ width: "100%" }}>
      <form onSubmit={submitHandler} className="detail_wrap_sub">
        <div className="detail_content_wrap">
          <div>
            <div>
              <div>품목코드</div>
              <div>
                <input
                  readOnly={formMod == "add" ? false : true}
                  style={{ backgroundColor: formMod == "add" ? "" : "#dadada" }}
                  value={formData["item_code"]}
                  type="text"
                  name="item_code"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>품목이름</div>
              <div>
                <input
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  readOnly={readOnly}
                  value={formData["item_name"]}
                  type="text"
                  name="item_name"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>카태고리</div>
              <div className="flex">
                <input
                  readOnly
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["category_name"]}
                  type="text"
                  name="category_name"
                  onChange={handleInputChange}
                />
                {!readOnly && (
                  <Modal
                    code_type={"category"}
                    menu={categoryCode}
                    handleInputChange={handleInputChange}
                  />
                )}
              </div>
            </div>
            <div>
              <div>규격</div>
              <div className="flex">
                <input
                  readOnly
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["standard_name"]}
                  type="text"
                  name="standard_name"
                  onChange={handleInputChange}
                />
                {!readOnly && (
                  <Modal
                    code_type={"standard"}
                    menu={standardCode}
                    handleInputChange={handleInputChange}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>창고</div>
              <div>
                <input
                  readOnly
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["storage_code"]}
                  type="text"
                  name="storage_code"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>세부장소</div>
              <div className="flex">
                <div>
                  <input
                    readOnly
                    style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                    value={formData["location_code"]}
                    type="text"
                    name="location_code"
                    onChange={handleInputChange}
                  />
                </div>
                {!readOnly && (
                  <button
                    className="btn"
                    type="button"
                    style={{
                      padding: "0px",
                      width: "30px",
                      height: "30px",
                      textAlign: "center",
                      marginRight: "10px",
                      marginLeft: "5px",
                    }}
                    onClick={() => setShowFlag(true)}
                  >
                    ?
                  </button>
                )}
              </div>
            </div>
            {showFlag && (
              <StorageHelp
                handleInputChange={handleInputChange}
                setShowFlag={setShowFlag}
              />
            )}
          </div>

          <div>
            <div>
              <div>폭</div>
              <div className="flex">
                <input
                  type="text"
                  name="width"
                  readOnly={readOnly}
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["width"]}
                  onChange={handleInputChange}
                />
                {!readOnly && (
                  <div className="flex">
                    <div style={{ width: "25px" }}>{unitData["width"]}</div>
                    <Modal
                      menu={unitCode}
                      code_type={"width"}
                      handleInputChange={handleInputChangeForUnit}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div>길이</div>
              <div className="flex">
                <input
                  type="text"
                  name="length"
                  readOnly={readOnly}
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["length"]}
                  onChange={handleInputChange}
                />
                {!readOnly && (
                  <div className="flex">
                    <div style={{ width: "25px" }}>{unitData["length"]}</div>
                    <Modal
                      menu={unitCode}
                      code_type={"length"}
                      handleInputChange={handleInputChangeForUnit}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>높이</div>
              <div className="flex">
                <input
                  type="text"
                  name="height"
                  readOnly={readOnly}
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["height"]}
                  onChange={handleInputChange}
                />
                {!readOnly && (
                  <div className="flex">
                    <div style={{ width: "25px" }}>{unitData["height"]}</div>
                    <Modal
                      menu={unitCode}
                      code_type={"height"}
                      handleInputChange={handleInputChangeForUnit}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div>부피</div>
              <div className="flex">
                <input
                  type="text"
                  name="volume"
                  readOnly={readOnly}
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["volume"]}
                  onChange={handleInputChange}
                />
                {!readOnly && (
                  <div className="flex">
                    <div style={{ width: "25px" }}>{unitData["volume"]}</div>
                    <Modal
                      menu={unitCode}
                      code_type={"volume"}
                      handleInputChange={handleInputChangeForUnit}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>중량</div>
              <div className="flex">
                <input
                  type="text"
                  name="weight"
                  readOnly={readOnly}
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["weight"]}
                  onChange={handleInputChange}
                />
                {!readOnly && (
                  <div className="flex">
                    <div style={{ width: "25px" }}>{unitData["weight"]}</div>
                    <Modal
                      menu={unitCode}
                      code_type={"weight"}
                      handleInputChange={handleInputChangeForUnit}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div>단위</div>
              <div className="flex">
                <input
                  type="text"
                  name="unit"
                  readOnly
                  style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                  value={formData["unit"]}
                  onChange={handleInputChange}
                />
                {!readOnly && (
                  <div className="flex">
                    <Modal
                      menu={numberUnitCode}
                      code_type={"unit"}
                      handleInputChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div style={{ width: "100%" }}>
              <div>비고</div>
              <div>
                <textarea
                  readOnly={readOnly}
                  name="description"
                  value={formData["description"]}
                  style={{
                    width: "100%",
                    height: "9vh",
                    backgroundColor: readOnly ? "#dadada" : "",
                    border: "1px solid #000",
                    borderRadius: "5px",
                  }}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="item_detail_button_wrap" style={{ display: "flex", justifyContent: "flex-end" , width:"100%", marginRight:"80px"}}>
          <button
            type="button"
            className="button"
            name="add"
            onClick={buttonHandler}
            style={{ display: formMod == "modify" ? "none" : "" }}
          >
            {readOnly ? "추가" : "취소"}
          </button>
          <button
            type="button"
            className="button"
            name="modify"
            onClick={buttonHandler}
            disabled={!selectItem}
            style={{
              backgroundColor: selectItem ? "" : "#dadada",
              display: formMod == "add" ? "none" : "",
            }}
          >
            {readOnly ? "수정" : "취소"}
          </button>

          <button
            type="submit"
            className="button"
            style={{ display: readOnly ? "none" : "" }}
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailItem;
