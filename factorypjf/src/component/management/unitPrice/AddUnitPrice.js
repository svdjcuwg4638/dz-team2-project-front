import React, { useEffect, useRef, useState } from "react";
import api from "../../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { unitPriceAction } from "../../../redux/actions/management/unitPriceAction";
import { partnerAction } from "redux/actions/management/partnerAction";
import Modal from "component/storage/item/Modal";

const AddUnitPrice = ({ itemAll }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(unitPriceAction.getCurrentUnitPriceAll());
    dispatch(partnerAction.getPartnerAll());
  }, []);
  const { partnerAll } = useSelector((state) => state.partner);

  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    item_code: "",
    item_name: "",
    company_id: "1",
    partner_code: "",
    partner_name: "",
    unit_price: "",
    start_date: today,
    type: "inbound",
  });

  const [errorField, setErrorField] = useState(null);

  const inputRefs = {
    item_code: useRef(),
    item_name: useRef(),
    partner_name: useRef(),
    unit_price: useRef(),
    start_date: useRef(),
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const fieldsToCheck = [
      "item_code",
      "item_name",
      "partner_name",
      "unit_price",
      "start_date",
    ];

    const fieldNames = {
      item_code: "품목 코드",
      item_name: "품목 이름",
      partner_name: "거래처",
      unit_price: "단가",
      start_date: "시작일",
    };

    for (const field of fieldsToCheck) {
      if (!formData[field] || formData[field].trim() === "") {
        setErrorField(field);
        alert(fieldNames[field] + " 입력해주세요");
        inputRefs[field].current.focus();
        return;
      }
    }

    const submitData = {
      ...formData,
      unit_price: formData["unit_price"].replace(/,/g, ""),
    };
    try {
      const response = await api.post("/unitPrice/add", submitData);
      if (response.data.code == 1) {
        alert(submitData.item_name + "의 단가가 등록되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setFormData({
      ...formData,
      partner_name: partnerAll?.data?.find(
        (data) => data.partner_code == formData["partner_code"]
      )?.partner_name,
    });
  }, [formData["partner_code"]]);

  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = numericValue
      ? parseInt(numericValue, 10).toLocaleString()
      : "";
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const itemCode = {
    name: "품목",
    guide: true,
    type_all: "itemAll",
    code_column: "item_code",
    name_column: "item_name",
    dataAll: { itemAll },
    trigger_type: "search",
    input_type: "item",
  };

  const partnerCode = {
    name: "거래처",
    guide: true,
    type_all: "partnerAll",
    code_column: "partner_code",
    name_column: "partner_name",
    dataAll: { partnerAll },
    trigger_type: "search",
  };

  useEffect(() => {
    if (errorField == "item_code") {
      setErrorField(null);
    }
  }, [formData.item_code]);

  useEffect(() => {
    if (errorField == "partner_code") {
      setErrorField(null);
    }
  }, [formData.partner_code]);

  useEffect(() => {
    if (errorField == "unit_price") {
      setErrorField(null);
    }
  }, [formData.unit_price]);

  useEffect(() => {
    if (errorField == "start_date") {
      setErrorField(null);
    }
  }, [formData.start_date]);

  return (
    <div className="detail_wrap">
      <form onSubmit={submitHandler} className="detail_wrap_sub">
        <div className="detail_content_wrap">
          <div>
            <div>
              <div>품목코드</div>
              <div>
                <input
                  readOnly
                  ref={inputRefs.item_code}
                  value={formData["item_code"]}
                  type="text"
                  name="item_code"
                  style={{
                    border: errorField === "item_code" ? "3px solid red" : "",
                  }}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>품목명</div>
              <div>
                <input
                  readOnly
                  ref={inputRefs.item_name}
                  value={formData["item_name"]}
                  type="text"
                  name="item_name"
                  style={{
                    border: errorField === "item_code" ? "3px solid red" : "",
                  }}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="addUnit_help_wrap" style={{ width: "10%" }}>
              <Modal menu={itemCode} handleInputChange={handleInputChange} />
            </div>
          </div>

          <div>
            <div>
              <div>거래처</div>
              <div>
                <input
                  readOnly
                  style={{
                    border:
                      errorField === "partner_name" ? "3px solid red" : "",
                  }}
                  ref={inputRefs.partner_name}
                  value={formData["partner_name"]}
                  type="text"
                  name="partner_name"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="addUnit_help_wrap">
              <Modal menu={partnerCode} handleInputChange={handleInputChange} />
            </div>
          </div>

          <div>
            <div>
              <div>단가</div>
              <div>
                <input
                  style={{
                    border: errorField === "unit_price" ? "3px solid red" : "",
                  }}
                  ref={inputRefs.unit_price}
                  value={formData["unit_price"]}
                  type="text"
                  name="unit_price"
                  onChange={handlePriceInputChange}
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>입고출고</div>
              <div>
                <select name="type" onChange={handleInputChange}>
                  <option value="inbound">입고</option>
                  <option value="outbound">출고</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>시작일</div>
              <div>
                <input
                  ref={inputRefs.start_date}
                  style={{
                    border: errorField === "start_date" ? "3px solid red" : "",
                  }}
                  value={formData["start_date"]}
                  type="date"
                  name="start_date"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="detail_button_wrap">
          <button
            type="button"
            className="btn_save"
            onClick={submitHandler}
            style={{ marginRight: "60px" }}
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUnitPrice;
