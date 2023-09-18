import React, { useEffect, useState } from "react";
import api from "../../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { unitPriceAction } from "../../../redux/actions/management/unitPriceAction";
import SearchHelper from "component/storage/item/SearchHelper";
import { partnerAction } from "redux/actions/management/partnerAction";

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
    partner_name:"",
    unit_price: "",
    start_date: today,
    type: "inbound",
  });

  useEffect(()=>{

    setFormData({
      ...formData,
      partner_name:partnerAll?.data?.find((data)=>data.partner_code == formData["partner_code"])?.partner_name 
    })

  },[formData["partner_code"]])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const submitData = {
      ...formData,
    };



    try {
      const response = await api.post("/unitPrice/add", submitData);
      setFormData({
        item_code: "",
        item_name: "",
        company_id: "1",
        partner_code: "",
        partner_name:"",
        unit_price: "",
        start_date: today,
        type: "inbound",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    dispatch(unitPriceAction.getUnitPriceAll());
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
  const partner = {
    name: "거래처",
    guide: true,
    type_all: "partnerAll",
    code_column: "partner_code",
    name_column: "partner_name",
    dataAll: { partnerAll },
    trigger_type: "input",
  };

  const [HelperScreenState, setHelperScreenState] = useState(false);
  const [partnerHelperScreenState, setPartnerHelperScreenState] =
    useState(false);

  const selectedPartnerFn = () => {
    setHelperScreenState(false);
    setPartnerHelperScreenState(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>품목코드(F2)</th>
            <th>품목이름(F2)</th>
            <th>거래처이름(F2)</th>
            <th>단가</th>
            <th>입고/출고</th>
            <th>시작일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                readOnly
                type="text"
                name="item_code"
                value={formData["item_code"]}
                onKeyDown={(e) => {
                  if (e.key === "F2") {
                    setHelperScreenState(!HelperScreenState);
                  }
                }}
              ></input>
            </td>
            <td>
              <input
                readOnly
                type="text"
                name="item_name"
                value={formData["item_name"]}
                onKeyDown={(e) => {
                  if (e.key === "F2") {
                    setHelperScreenState(!HelperScreenState);
                  }
                }}
              ></input>
            </td>
            <td>
              <input
                readOnly
                type="text"
                name="partner_name"
                value={formData["partner_name"]}
                onKeyDown={(e) => {
                  if (e.key === "F2") {
                    setPartnerHelperScreenState(!partnerHelperScreenState);
                  }
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select name="type" value={formData["type"]} onChange={handleInputChange} style={{ border: "none", outline: "none" }}>
                <option value="inbound">입고</option>
                <option value="outbound">출고</option>
              </select>
            </td>
            <td>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          {HelperScreenState && (
            <div
              style={{
                position: "absolute",
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
          )}
          {partnerHelperScreenState && (
            <div
              style={{
                position: "absolute",
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
                menu={partner}
                searchPartner={selectedPartnerFn}
              />
            </div>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={submitHandler}>등록</button>
      </div>
    </div>
  );
};

export default AddUnitPrice;
