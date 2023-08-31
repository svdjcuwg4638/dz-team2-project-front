import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { storageAction } from "../../../redux/actions/management/storageAction";

const SearchHelper = ({ searchPartner, handleRowClick, menu }) => {
  const dispatch = useDispatch();

  const [InputboxText, setInputboxText] = useState("");
  const [SelectedColumn, setSelectedColumn] = useState();
  const [Category, setCategory] = useState("default");

  useEffect(() => {
    if (menu.name === "거래처") dispatch(partnerAction.getPartnerAll());
    if (menu.name === "품목") dispatch(itemAction.getItemAll());
    if (menu.name === "창고") dispatch(storageAction.getstorageAll());
  }, [InputboxText]);

  let filteredData = [];
  if (menu.dataAll[menu.type_all].data) {
    filteredData = menu.dataAll[menu.type_all].data;

    if (Category === "default") {
      filteredData = menu.dataAll[menu.type_all].data.filter(
        (item) =>
          item[menu.code_column].includes(InputboxText) ||
          item[menu.name_column].includes(InputboxText)
      );
    } else if (Category === "code") {
      filteredData = menu.dataAll[menu.type_all].data.filter((item) =>
        item[menu.code_column].includes(InputboxText)
      );
    } else if (Category === "name") {
      filteredData = menu.dataAll[menu.type_all].data.filter((item) =>
        item[menu.name_column].includes(InputboxText)
      );
    }
  }

  const rowClickHandler = (datarow) => {
    setSelectedColumn(datarow);
    searchPartner(datarow[menu.code_column]);
  };
  const selectHandler = (event) => {
    setCategory(event.target.value);
  };
  const clickFn = (e) => {
    e.preventDefault();
    setInputboxText(e.target[0].value);
  };
  return (
    <div
      style={{
        border: "1px solid black",
        width: "400px",
        height: "500px",
        backgroundColor: "white",
      }}
    >
      <div className="header" style={{ backgroundColor: "#5390F0" }}>
        <div>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="mt-3"
            style={{ width: "25%", height: "30px" }}
          >
            <option value="default">공통</option>
            <option value="code">{menu.name}코드</option>
            <option value="name">{menu.name}명</option>
          </select>
          <form style={{ display: "inline" }} onSubmit={(e) => clickFn(e)}>
            <input
              style={{
                border: "1px solid black",
                width: "70%",
                height: "31px",
              }}
            ></input>
            <button type="submit">조회 </button>
          </form>
        </div>
      </div>
      <div>
        <div
          className="body m-3"
          style={{ height: "400px", overflowY: "scroll" }}
        >
          <table>
            <thead>
              <th>{menu.name}코드</th>
              <th>{menu.name}명</th>
            </thead>
            <tbody>
              {filteredData.map((datarow) => (
                <tr onClick={() => rowClickHandler(datarow)}>
                  <td>{datarow[menu.code_column]}</td>{" "}
                  <td> {datarow[menu.name_column]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchHelper;
