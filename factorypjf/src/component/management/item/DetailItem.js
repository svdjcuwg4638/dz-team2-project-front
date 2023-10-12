import Modal from "component/storage/item/Modal";
import React, { useEffect, useRef, useState } from "react";
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

  // #readOnly 값변경 modify라면 단위제거
  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
  };
  // #endregion

  // 카테고리,규격 이름 넣어주기
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
    setReadOnly(true);
    setFormMod("");
  }, [selectItem]);
  // #endregion

  //#region 미입력 input창 입력시 빨간색 테두리제거
  useEffect(() => {
    if (errorField == "item_name") {
      setErrorField(null);
    }
  }, [formData.item_name]);
  useEffect(() => {
    if (errorField == "item_code") {
      setErrorField(null);
    }
  }, [formData.item_code]);
  useEffect(() => {
    if (errorField == "storage_code") {
      setErrorField(null);
    }
  }, [formData.storage_code]);
  //#endregion

  //#region 입력헨들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleInputChangeForUnit = (event) => {
    const { name, value } = event.target;
    setUnitData((prevState) => ({ ...prevState, [name]: value }));
  };
  //#endregion

  // submit

  const [errorField, setErrorField] = useState(null);

  const inputRefs = {
    item_code: useRef(),
    item_name: useRef(),
    storage_code: useRef(),
    location_code: useRef(),
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const fieldsToCheck = [
      "item_code",
      "item_name",
      "storage_code",
      "location_code",
    ];

    const fieldNames = {
      item_code: "품목 코드",
      item_name: "품목 이름",
      storage_code: "창고",
      location_code: "세부장소",
    };

    for (const field of fieldsToCheck) {
      if (!formData[field] || formData[field].trim() === "") {
        setErrorField(field);
        alert(fieldNames[field] + " 입력해주세요");
        inputRefs[field].current.focus();
        return;
      }
    }

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
      width: formData["width"] == "" ? "" : formData["width"] + unitData["width"],
      length: formData["length"] == "" ? "" : formData["length"] + unitData["length"],
      height: formData["height"] == "" ? "" : formData["height"] + unitData["height"],
      volume: formData["volume"] == "" ? "" : formData["volume"] + unitData["volume"],
      weight: formData["weight"] == "" ? "" : formData["weight"] + unitData["weight"],
      description: formData["description"],
      category: formData["category"],
      standard: formData["standard"],
      unit: formData["unit"],
    };

    try {
      if (formMod == "modify") {
        const response = await api.post("/item/modify", submitData);
        alert(submitData.item_name + " 수정 되었습니다.");
        window.location.reload();
      }
      if (formMod == "add") {
        const response = await api.post("/item/add", submitData);
        if (response.data.code == 0) {
          alert(response.data.message);
          setErrorField("item_code");
        } else {
          alert(response.data.data.item_name + " 추가되었습니다.");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    dispatch(itemAction.getItemAll());
  };

  // #region 추가 수정 취소 버튼핸들러
  const [readOnly, setReadOnly] = useState(true);

  function buttonHandler(e) {
    setErrorField(null);
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
    }
    if (name === "modify") {
      if (formMod === "modify") {
        setFormData("");
      }
      if (!readOnly) {
        setFormMod("");
        setFormData((prevState) => ({
          ...prevState,
          width: selectItem.width,
          length: selectItem.length,
          height: selectItem.height,
          volume: selectItem.volume,
          weight: selectItem.weight,
        }));
      } else {
        setFormMod("modify");
        setFormData((prevState) => ({
          ...prevState,
          width: removeNonNumeric(prevState.width),
          length: removeNonNumeric(prevState.length),
          height: removeNonNumeric(prevState.height),
          volume: removeNonNumeric(prevState.volume),
          weight: removeNonNumeric(prevState.weight),
        }));
      }
    }

    toggleReadOnly();
  }
  //#endregion

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

  useEffect(() => {
    console.log(showFlag);
  }, [showFlag]);

  return (
    <div className="detail_wrap" style={{ width: "100%" }}>
      <form onSubmit={submitHandler} className="detail_wrap_sub">
        <div className="detail_content_wrap">
          <div>
            <div>
              <div>품목코드</div>
              <div>
                <input
                  className={!readOnly && "input_red"}
                  ref={inputRefs.item_code}
                  readOnly={formMod == "add" ? false : true}
                  style={{
                    backgroundColor: formMod == "add" ? "" : "#F5F5F5",
                    border:
                      !readOnly && errorField === "item_code"
                        ? "3px solid red"
                        : "",
                  }}
                  value={formData["item_code"]}
                  type="text"
                  name="item_code"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>품목명</div>
              <div>
                <input
                  ref={inputRefs.item_name}
                  className={!readOnly && "input_red"}
                  style={{
                    backgroundColor: readOnly ? "#F5F5F5" : "",
                    border:
                      !readOnly && errorField === "item_name"
                        ? "3px solid red"
                        : "",
                  }}
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
              <div>카테고리</div>
              <div className="flex">
                <input
                  readOnly
                  style={{ backgroundColor: readOnly ? "#F5F5F5" : "" }}
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
                  style={{ backgroundColor: readOnly ? "#F5F5F5" : "" }}
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

          <div style={{ position: "relative" }}>
            <div>
              <div>창고</div>
              <div>
                <input
                  className={!readOnly && "input_red"}
                  ref={inputRefs.storage_code}
                  readOnly
                  style={{
                    backgroundColor: readOnly ? "#F5F5F5" : "",
                    border:
                      !readOnly && errorField === "storage_code"
                        ? "3px solid red"
                        : "",
                  }}
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
                    className={!readOnly && "input_red"}
                    ref={inputRefs.location_code}
                    readOnly
                    style={{
                      backgroundColor: readOnly ? "#F5F5F5" : "",
                      border:
                        !readOnly && errorField === "storage_code"
                          ? "3px solid red"
                          : "",
                    }}
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
                      borderRadius: "25px",
                      backgroundColor: "#5390f0",
                      color: "#fff",
                      position: "absolute",
                      right: "-22px",
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
                  style={{ backgroundColor: readOnly ? "#F5F5F5" : "" }}
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
                  style={{ backgroundColor: readOnly ? "#F5F5F5" : "" }}
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
                  style={{ backgroundColor: readOnly ? "#F5F5F5" : "" }}
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
                  style={{ backgroundColor: readOnly ? "#F5F5F5" : "" }}
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
                  style={{ backgroundColor: readOnly ? "#F5F5F5" : "" }}
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
                  style={{ backgroundColor: readOnly ? "#F5F5F5" : "" }}
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
                    backgroundColor: readOnly ? "#F5F5F5" : "",
                    border: "initial",
                    borderRadius: "5px",
                  }}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div
          className="item_detail_button_wrap"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginRight: "80px",
          }}
        >
          <button
            type="button"
            className="btn_save"
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
              backgroundColor: selectItem ? "" : "#F5F5F5",
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
