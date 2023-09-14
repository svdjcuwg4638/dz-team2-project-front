import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../redux/api";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { storageAction } from "redux/actions/management/storageAction";
import StorageHelp from "../storage/StorageHelp";
import { partnerAction } from "redux/actions/management/partnerAction";
import Modal from "../../storage/item/Modal";
import { codeAction } from "redux/actions/management/codeAction";
import "../../..";
const AddItem = ({ addFormViewHandler }) => {
  const dispatch = useDispatch();
  const { partnerAll } = useSelector((state) => state.partner);
  const { codeAll } = useSelector((state) => state.code);
  const { locationAll, storageAll } = useSelector((state) => state.storage);
  const [showFlag, setShowFlag] = useState(false);
  useEffect(() => {
    dispatch(storageAction.getstorageAll());
    dispatch(partnerAction.getPartnerAll());
    dispatch(codeAction.getCodeAll());
  }, []);

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
    partner_code: "",
    category: "",
    unit_price: "",
    type:"",
  });

  const [unitData, setUnitData] = useState({
    width: "m",
    length: "m",
    height: "m",
    volume: "L",
    weight: "Kg",
    unit: "EA",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleInputChangeForUnit = (event) => {
    const { name, value } = event.target;
    setUnitData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const isValidFormData = (data) => {
      for (let key in data) {
        if (data[key] === "") {
          return false;
        }
      }
      return true;
    };

    if (isValidFormData(formData)) {
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
        unit_price : formData["unit_price"],
        type:formData["type"]
      };

      try {
        console.log("submitData", submitData);
        const response = await api.post("/item/add", submitData);
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
          partner_code: "",
          category: "",
          unit_price: "",
          type:"inbound"
        });
      } catch (error) {
        console.error("Error submitting data:", error);
      }
      dispatch(itemAction.getItemAll());
    }
  };

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

  return (
    <div
      style={{
        width: "90%",
        height: "90%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          border: "none",
          backgroundColor: "#dadada",
        }}
        onClick={addFormViewHandler}
      >
        icon들어갈것(접기버튼)
      </button>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <div>
              <div>품목코드</div>
              <div>
                <input
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
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  name="category"
                  value={formData["category"]}
                ></input>
                <Modal
                  code_type={"category"}
                  menu={categoryCode}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>거래처</div>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  name="partner_code"
                  value={formData["partner_code"]}
                ></input>
                <Modal
                  menu={partner}
                  name="partner_code"
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>창고</div>
              <input
                type="text"
                value={formData["storage_code"]}
                name="storage_code"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div>세부장소</div>
              <input
                type="text"
                value={formData["location_code"]}
                name="location_code"
                onChange={handleInputChange}
              />
            </div>
            <button
              className="btn"
              type="button"
              style={{
                padding: "0px",
                width: "30px",
                marginTop: "23px",
                height: "30px",
                textAlign: "center",
                marginRight: "10px",
                marginLeft: "5px",
              }}
              onClick={() => setShowFlag(true)}
            >
              ?
            </button>
            {showFlag && (
              <StorageHelp
                handleInputChange={handleInputChange}
                setShowFlag={setShowFlag}
              />
            )}
          </div>

          <div>
            <div>
              <div>가격</div>
              <div>
                <input
                  value={formData["unit_price"]}
                  type="text"
                  name="unit_price"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>입고/출고</div>              
              <select name="type" onChange={handleInputChange}>
                <option value="inbound">입고</option>
                <option value="outbound">출고</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: "20px", fontWeight: "bold" }}>규격</div>

          <div className="item_add_unit_wrap" style={{ display: "block" }}>
            <div>
              <div>
                <div>폭</div>
                <div>
                  <input
                    value={formData["width"]}
                    type="text"
                    name="width"
                    onChange={handleInputChange}
                  ></input>
                  <div>{unitData["width"]}</div>
                  <Modal
                    menu={unitCode}
                    handleInputChange={handleInputChangeForUnit}
                    code_type={"width"}
                  />
                </div>
              </div>
              <div>
                <div>길이</div>
                <div>
                  <input
                    value={formData["length"]}
                    type="text"
                    name="length"
                    onChange={handleInputChange}
                  ></input>
                  <div>{unitData["length"]}</div>
                  <Modal
                    menu={unitCode}
                    code_type={"length"}
                    handleInputChange={handleInputChangeForUnit}
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>높이</div>
                <div>
                  <input
                    value={formData["height"]}
                    type="text"
                    name="height"
                    onChange={handleInputChange}
                  ></input>
                  <div>{unitData["height"]}</div>
                  <Modal
                    menu={unitCode}
                    code_type={"height"}
                    handleInputChange={handleInputChangeForUnit}
                  />
                </div>
              </div>
              <div>
                <div>부피</div>
                <div>
                  <input
                    value={formData["volume"]}
                    type="text"
                    name="volume"
                    onChange={handleInputChange}
                  ></input>
                  <div>{unitData["volume"]}</div>
                  <Modal
                    menu={unitCode}
                    code_type={"volume"}
                    handleInputChange={handleInputChangeForUnit}
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>중량</div>
                <div>
                  <input
                    value={formData["weight"]}
                    type="text"
                    name="weight"
                    onChange={handleInputChange}
                  ></input>
                  <div>{unitData["weight"]}</div>
                  <Modal
                    menu={unitCode}
                    code_type={"weight"}
                    handleInputChange={handleInputChangeForUnit}
                  />
                </div>
              </div>
              <div>
                <div>갯수</div>
                <div>
                  <input
                    value={formData["unit"]}
                    type="text"
                    name="unit"
                    onChange={handleInputChange}
                  ></input>
                  <div>{unitData["unit"]}</div>
                  <Modal
                    menu={unitCode}
                    code_type={"unit"}
                    handleInputChange={handleInputChangeForUnit}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
              <div>비고</div>
              <div>
                <textarea
                  name="description"
                  value={formData["description"]}
                  style={{ width: "100%", height: "90px" }}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="button">
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
