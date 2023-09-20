import Modal from "component/storage/item/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { partnerAction } from "redux/actions/management/partnerAction";
import { unitPriceAction } from "redux/actions/management/unitPriceAction";

const UnitPriceList = ({ itemAll }) => {
  const dispatch = useDispatch();
  const { partnerAll } = useSelector((state) => state.partner);
  const { unitPriceAll } = useSelector((state) => state.unitPrice);

  useEffect(() => {
    dispatch(partnerAction.getPartnerAll());
    dispatch(unitPriceAction.getCurrentUnitPriceAll());
  }, []);

  // flag값의 변화에따라 리스트 db요청
  const [listFalg, setListFlag] = useState("current");
  useEffect(() => {
    if (listFalg == "current") {
      dispatch(unitPriceAction.getCurrentUnitPriceAll());
    }

    if (listFalg == "expected") {
      dispatch(unitPriceAction.getExpectedUnitPriceAll());
    }

    if (listFalg == "all") {
      dispatch(unitPriceAction.getUnitPriceAll());
    }

    setFormData({
      item_code: "",
      item_name: "",
      partner_code: "",
      partner_name: "",
      type: "",
      start_date: "",
    });
  }, [listFalg]);

  useEffect(() => {
    setSearchList(unitPriceAll.data);
    filterData();
  }, [unitPriceAll]);

  //#region 검색

  const [searchList, setSearchList] = useState(unitPriceAll?.data);
  const [formData, setFormData] = useState({
    item_code: "",
    item_name: "",
    partner_code: "",
    partner_name: "",
    type: "",
    start_date: "",
  });


  const filterData = () => {
    setSearchList(
      unitPriceAll?.data?.filter((data) => {
        let valid = true;
        if (formData.item_code && data.item_code !== formData.item_code) {
          valid = false;
        }
        if (
          formData.partner_code &&
          data.partner_code !== formData.partner_code
        ) {
          valid = false;
        }
        if (formData.type && data.type !== formData.type) {
          valid = false;
        }
        return valid;
      })
    );
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
  }, [formData.partner_code]);

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
  //#endregion

  function delvalue(e) {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name + "_code"]: "",
      [e.target.name + "_name"]: "",
    });
    console.log(formData);
  }

  return (
    <div>
      <form className="unit_price_search_form mt-4">
        <div>
          <div>
            <div>품목코드</div>
            <div className="flex">
              <input
                readOnly
                type="text"
                onChange={handleInputChange}
                value={formData["item_name"]}
              ></input>
              {formData["item_code"] != "" && (
                <div>
                  <button
                    name="item"
                    onClick={delvalue}
                    style={{ width: "20px", color: "red", background: "#fff" }}
                  >
                    x
                  </button>
                </div>
              )}
              <Modal menu={itemCode} handleInputChange={handleInputChange} />
            </div>
          </div>
          <div>
            <div>거래처</div>
            <div className="flex">
              <input
                tyep="text"
                name="partner_name"
                onChange={handleInputChange}
                value={formData["partner_name"]}
              ></input>
              <Modal menu={partnerCode} handleInputChange={handleInputChange} />
            </div>
          </div>
          <div>
            <div>입고/출고</div>
            <div>
              <select name="type" onChange={handleInputChange}>
                <option value=""></option>
                <option value="inbound">입고</option>
                <option value="outbound">출고</option>
              </select>
            </div>
          </div>
          <div>
            <div>시작일</div>
            <div>
              <input
                tyep="text"
                name="itme_code"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="button" onClick={filterData}>조회</button>
        </div>
      </form>
      <div className="unit_price_tab_wrap">
        <div
          onClick={() => setListFlag("current")}
          style={{ backgroundColor: listFalg == "current" ? "#dadada" : "" }}
        >
          현재단가
        </div>
        <div
          onClick={() => setListFlag("expected")}
          style={{ backgroundColor: listFalg == "expected" ? "#dadada" : "" }}
        >
          변경예정단가
        </div>
        <div
          onClick={() => setListFlag("all")}
          style={{ backgroundColor: listFalg == "all" ? "#dadada" : "" }}
        >
          전체
        </div>
      </div>
      <div className="table">
        <thead style={{ width: "99.2%" }}>
          <tr>
            <th>품목코드</th>
            <th>품목이름</th>
            <th>거래처</th>
            <th>단가</th>
            <th>입고/출고</th>
            <th>시작일</th>
            <th>종료일</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {unitPriceAll &&
            searchList?.map((data) => (
              <tr>
                <td>{data.item_code}</td>
                <td>
                  {
                    itemAll?.data?.find(
                      (idata) => idata.item_code == data.item_code
                    ).item_name
                  }
                </td>
                <td>
                  {
                    partnerAll?.data?.find(
                      (pdata) => pdata.partner_code == data.partner_code
                    ).partner_name
                  }
                </td>
                <td>{parseInt(data.unit_price,10).toLocaleString()}</td>
                <td>{data.type == "inbound" ? "입고" : "출고"}</td>
                <td>{data.start_date}</td>
                <td>{data.end_date}</td>
              </tr>
            ))}
        </tbody>
      </div>
    </div>
  );
};

export default UnitPriceList;
