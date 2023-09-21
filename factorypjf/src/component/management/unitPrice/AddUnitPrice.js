import React, { useEffect, useState } from "react";
import api from "../../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { unitPriceAction } from "../../../redux/actions/management/unitPriceAction";
import { partnerAction } from "redux/actions/management/partnerAction";
import Modal from "component/storage/item/Modal";

const AddUnitPrice = ({ itemAll }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(unitPriceAction.getUnitPriceAll());
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

  const submitHandler = async (event) => {
    event.preventDefault();
    const submitData = {
      ...formData,
      unit_price: formData["unit_price"].replace(/,/g, ""),
    };
    try {
      const response = await api.post("/unitPrice/add", submitData);
      setFormData({
        item_code: "",
        item_name: "",
        company_id: "1",
        partner_code: "",
        partner_name: "",
        unit_price: "",
        start_date: today,
        type: "inbound",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    dispatch(unitPriceAction.getUnitPriceAll());
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

  return (
    <div className="detail_wrap">
      <form onSubmit={submitHandler} className="detail_wrap_sub">
        <div className="detail_content_wrap">
          <div>
            <div style={{width:"100%"}}>
              <div>품목코드</div>
              <div>
                <input
                  readOnly
                  value={formData["item_code"]}
                  type="text"
                  name="item_code"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div style={{width:"100%"}}>
              <div>품목이름</div>
              <div>
                <input
                  readOnly
                  value={formData["item_name"]}
                  type="text"
                  name="item_name"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="addUnit_help_wrap" style={{width:"10%"}}>
              <Modal menu={itemCode} handleInputChange={handleInputChange} />
            </div>
          </div>

          <div>
            <div>
              <div>거래처</div>
              <div>
                <input
                  readOnly
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
                <select name="bound">
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
                  value={formData["start_date"]}
                  type="text"
                  name="start_date"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="detail_button_wrap">
          <button type="button" className="button" onClick={submitHandler} style={{marginRight:"60px"}}>
            추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUnitPrice;
