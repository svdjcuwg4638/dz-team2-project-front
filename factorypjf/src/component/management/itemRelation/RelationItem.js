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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      component_code: formData.item_code,
      item_code: selectId.item_code,
    };

    try {
      const response = await api.post("/relation/add", submitData);
      const adData = response.data.data;
      setSearchData((state) => [...state, adData,]);
      setCodeAllData((state) => [...state, adData,]);
    } catch (error) {
      console.log("error :", error);
    }

    setFormData({
      ...formData,
      item_code: "",
      item_name: "",
      quantity: "",
      common_code: "",
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

  const [HelperScreenState, setHelperScreenState] = useState(false);
  const selectedPartnerFn = () => {
    setHelperScreenState(false);
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
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>자재코드</th>
            <th>자재이름</th>
            <th>소모수량</th>
          </tr>
        </thead>

        <tbody className="code-scrollable-table" onWheel={handleScroll}>
          {searchData &&
            searchData?.map((data) => (
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={selectCodes.includes(data.relation_id)}
                    onChange={() => handleCheckboxChange(data.relation_id)}
                  />
                </td>
                <td>{data.component_code}</td>
                <td>
                  {
                    itemAll.data.find(
                      (idata) => idata.item_code == data.component_code
                    ).item_name
                  }
                </td>
                <td>{data.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="input_wrap">
          <div>
            <div>자재코드(f2)</div>
            <div className="inputBox" style={{ marginRight: "10px" }}>
              <input
                required
                type="text"
                name="item_code"
                value={formData.item_code}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "F2") {
                    setHelperScreenState(!HelperScreenState);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <div>자재이름(f2)</div>
            <div className="inputBox" style={{ marginRight: "10px" }}>
              <input
                required
                type="text"
                name="item_name"
                value={formData.item_name}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "F2") {
                    setHelperScreenState(!HelperScreenState);
                  }
                }}
              />
            </div>
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
          </div>
          <div>
            <div>수량</div>
            <div className="inputBox" style={{ marginRight: "10px" }}>
              <input
                required
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="button_wrap">
          <button type="submit" className="button">
            추가
          </button>
          <button
            className="button"
            style={{ backgroundColor: "red" }}
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
