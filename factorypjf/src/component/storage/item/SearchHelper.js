import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { storageAction } from "../../../redux/actions/management/storageAction";
import { codeAction } from "redux/actions/management/codeAction";

const SearchHelper = ({
  searchPartner,
  code_type,
  handleRowClick,
  menu,
  handleInputChange,
  setDataLoad,
}) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [SelectedColumn, setSelectedColumn] = useState();
  const [Category, setCategory] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (menu.name === "거래처") dispatch(partnerAction.getPartnerAll());
    if (menu.name === "품목") dispatch(itemAction.getItemAll());
    if (menu.name === "창고") dispatch(storageAction.getstorageAll());
    if (menu.name === "세부장소") dispatch(storageAction.getstorageAll());
    if (menu.name === "공통코드") dispatch(codeAction.getCodeAll());
  }, []);

  const [dataLoaded, setDataLoaded] = useState(false);

  let filteredData = [];

  const lowerCasedSearchTerm = searchTerm.toLowerCase();

  if (dataLoaded && menu.dataAll[menu.type_all].data) {
    filteredData = menu.dataAll[menu.type_all].data;

    if (Category === "default") {
      if (menu.name == "공통코드") {
        filteredData = menu.dataAll[menu.type_all].data.filter(
          (item) =>
            (item[menu.code_column]
              .toLowerCase()
              .includes(lowerCasedSearchTerm) ||
              item[menu.name_column]
                .toLowerCase()
                .includes(lowerCasedSearchTerm)) &&
            item["management_code"] == menu.common_code_type
        );
      } else {
        filteredData = menu.dataAll[menu.type_all].data.filter(
          (item) =>
            item[menu.code_column]
              .toLowerCase()
              .includes(lowerCasedSearchTerm) ||
            item[menu.name_column].toLowerCase().includes(lowerCasedSearchTerm)
        );
      }
    } else if (Category === "code") {
      filteredData = menu.dataAll[menu.type_all].data.filter((item) =>
        item[menu.code_column].toLowerCase().includes(lowerCasedSearchTerm)
      );
    } else if (Category === "name") {
      filteredData = menu.dataAll[menu.type_all].data.filter((item) =>
        item[menu.name_column].toLowerCase().includes(lowerCasedSearchTerm)
      );
    }
  }

  const clickFn = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    setDataLoaded(true);
  };

  const rowClickHandler = (datarow) => {
    if (menu.name == "공통코드") {
      handleInputChange({
        target: {
          name: code_type,
          value: datarow[menu.code_column],
        },
      });
    } else if (menu.input_type == "item") {
      handleInputChange({
        target: {
          name: menu.code_column,
          value: datarow[menu.code_column],
        },
      });
      handleInputChange({
        target: {
          name: menu.name_column,
          value: datarow[menu.name_column],
        },
      });
    } else {
      handleInputChange({
        target: {
          name: menu.code_column,
          value: datarow[menu.code_column],
        },
      });
    }
    setSelectedColumn(datarow);
    searchPartner(datarow[menu.name_column]);
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
      <div className="header">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              borderBottom: "2px solid rgb(83, 144, 240)",
              fontSize: "30px",
              fontWeight: "bold",
              padding: "3px",
              margin: "23px",
              width: "43%",
              textAlign: "center",
            }}
          >
            {menu.name}
          </div>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <select
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "25%",
                height: "30px",
                margin: "0 5px",
                border: "1px solid #d9d9d9",
                textAlign: "center",
              }}
            >
              <option value="default">공통</option>
              <option value="code">{menu.name}</option>
              <option value="name">{menu.name}명</option>
            </select>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  clickFn(e);
                }
              }}
              style={{
                border: "1px solid black",
                width: "50%",
                height: "31px",
                border: "1px solid #d9d9d9",
              }}
            ></input>
            <div style={{ textAlign: "right", margin: "0 10px" }}>
              <button
                className="button"
                type="button"
                onClick={(e) => clickFn(e)}
              >
                조회
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div 
          className="body m-3"
          style={{ height: "400px", overflowY: "scroll", maxHeight: '300px' }}
        >
          <table
            style={{ color: "#000", textAlign: "center" }}
            className="common_help_table"
          >
            <thead>
              <tr>
                <th style={{ width: "50%" }}>{menu.name}</th>
                <th style={{ width: "50%" }}>{menu.name}명</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((datarow) => (
                <tr
                  onClick={(e) => {
                    rowClickHandler(datarow);
                  }}
                >
                  <td>{datarow[menu.code_column]}</td>
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
