import Modal from "component/storage/item/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "redux/actions/management/itemAction";
import api from "redux/api";
import StorageHelp from "../storage/StorageHelp";

const DetailItem = ({ selectItem }) => {
  const dispatch = useDispatch();

  const { locationAll, storageAll } = useSelector((state) => state.storage);
  const { partnerAll } = useSelector((state) => state.partner);
  const { codeAll } = useSelector((state) => state.code);

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
    quantity: "",
    description: "",
    partner_code: "",
    category: "",
  });

  // #region 규격에 단위없애주는 코드
  const removeNonNumeric = (str) => {
    return str?.replace(/\D/g, "");
  };

  const toggleReadOnly = () => {
    setReadOnly(!readOnly);

    if (readOnly) {
      setFormData((prevState) => ({
        ...prevState,
        width: removeNonNumeric(prevState.width),
        length: removeNonNumeric(prevState.length),
        height: removeNonNumeric(prevState.height),
        volume: removeNonNumeric(prevState.volume),
        weight: removeNonNumeric(prevState.weight),
        unit: removeNonNumeric(prevState.unit),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        width: selectItem?.width,
        length: selectItem?.length,
        height: selectItem?.height,
        volume: selectItem?.volume,
        weight: selectItem?.weight,
        unit: selectItem?.unit,
      }));
    }
  };
  // #endregion

  // #region 선택된 아이탬 변경시 값을 바꿔줌
  useEffect(() => {
    setReadOnly(true);
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
      width: selectItem?.width,
      length: selectItem?.length,
      height: selectItem?.height,
      volume: selectItem?.volume,
      weight: selectItem?.weight,
      unit: selectItem?.unit,
      description: selectItem?.description,
      partner_code: partnerAll?.data?.find(
        (data) => data?.partner_code == selectItem?.partner_code
      )?.partner_name,
      category: codeAll?.data?.find(
        (data) => data?.common_code == selectItem?.category
      )?.common_name,
    });
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

    var locationData = locationAll.data.find(
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
      unit: formData["unit"] + unitData["unit"],
      description: formData["description"],
      partner_code: partnerAll.data.find(
        (data) => data.partner_name == formData["partner_code"]
      ).partner_code,
      category: codeAll.data.find(
        (data) =>
          data.common_name == formData["category"] &&
          data.management_code == "CATEGORY"
      ).common_code,
    };

    try {
      const response = await api.post("/item/modify", submitData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    dispatch(itemAction.getItemAll());
  };

  const [readOnly, setReadOnly] = useState(true);

  const [showFlag, setShowFlag] = useState(false);

  const [unitData, setUnitData] = useState({
    width: "m",
    length: "m",
    height: "m",
    volume: "L",
    weight: "Kg",
    unit: "EA",
  });

  // #region 도움창 props
  const partner = {
    name: "거래처",
    guide: true,
    type_all: "partnerAll",
    code_column: "partner_code",
    name_column: "partner_name",
    dataAll: { partnerAll },
    trigger_type: "search",
  };

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
  // #endregion
  return (
    <>
      <form onSubmit={submitHandler} className="item_detail_from">
        <div>
          <div>
            <div>품목코드</div>
            <div>
              <input
                readOnly
                style={{ backgroundColor: "#dadada" }}
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
                value={formData["category"]}
                type="text"
                name="category"
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
            <div>거래처</div>
            <div className="flex">
              <input
                readOnly
                style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                value={formData["partner_code"]}
                type="text"
                name="partner_code"
                onChange={handleInputChange}
              />
              {!readOnly && (
                <Modal
                  menu={partner}
                  name="partner_code"
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
                  <div style={{width:"25px"}}>{unitData["width"]}</div>
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
                  <div style={{width:"25px"}}>{unitData["length"]}</div>
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
                nChange={handleInputChange}
              />
              {!readOnly && (
                <div className="flex">
                  <div style={{width:"25px"}}>{unitData["height"]}</div>
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
                  <div style={{width:"25px"}}>{unitData["volume"]}</div>
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
                  <div style={{width:"25px"}}>{unitData["weight"]}</div>
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
            <div>갯수</div>
            <div className="flex">
              <input
                type="text"
                name="unit"
                readOnly={readOnly}
                style={{ backgroundColor: readOnly ? "#dadada" : "" }}
                value={formData["unit"]}
                onChange={handleInputChange}
              />
              {!readOnly && (
                <div className="flex">
                  <div style={{width:"25px"}}>{unitData["unit"]}</div>
                  <Modal
                    menu={unitCode}
                    code_type={"unit"}
                    handleInputChange={handleInputChangeForUnit}
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
                  height: "150px",
                  backgroundColor: readOnly ? "#dadada" : "",
                }}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" className="button" onClick={toggleReadOnly} disabled={!selectItem}  style={{backgroundColor:selectItem?"" : "#dadada"}}>
            {readOnly ? "수정" : "취소"}
          </button>
          <button type="submit" className="button">
            저장
          </button>
        </div>
      </form>
    </>
  );
};

export default DetailItem;
