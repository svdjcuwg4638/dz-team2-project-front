import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { storageAction } from "../../../redux/actions/management/storageAction";
import { codeAction } from "redux/actions/management/codeAction";
import '../../../style/inbound/overlay.css'
const styles = {
  btnSave: {
      backgroundColor: "var(--main-color)",
      color: "white",
      border: "none",
      boxShadow: "1px 1px 2px 1px grey",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "bold",
      width: "50px",
      height: "30px",
      margin: "5px",
    },
  };
const SearchHelper = ({
  searchPartner,
  code_type,
  handleRowClick,
  menu,
  handleInputChange,
  setDataLoad,
}) => {
  const dispatch = useDispatch();

  const [InputboxText, setInputboxText] = useState("");
  const [SelectedColumn, setSelectedColumn] = useState();
  const [Category, setCategory] = useState("default");

  useEffect(() => {
    if (menu.name === "거래처") dispatch(partnerAction.getPartnerAll());
    if (menu.name === "품목") dispatch(itemAction.getItemAll());
    if (menu.name === "창고") dispatch(storageAction.getstorageAll());
    if (menu.name === "세부장소") dispatch(storageAction.getstorageAll());
    if (menu.name === "공통코드") dispatch(codeAction.getCodeAll());
  }, [InputboxText]);

  const [dataLoaded, setDataLoaded] = useState(false);
  let filteredData = [];
  if (dataLoaded && menu.dataAll[menu.type_all].data) {
    filteredData = menu.dataAll[menu.type_all].data;

    if (Category === "default") {
      if (menu.name == "공통코드") {
        filteredData = menu.dataAll[menu.type_all].data.filter(
          (item) =>
            (item[menu.code_column].includes(InputboxText) ||
              item[menu.name_column].includes(InputboxText)) &&
            item["management_code"] == menu.common_code_type
        );
      } else {
        filteredData = menu.dataAll[menu.type_all].data.filter(
          (item) =>
            item[menu.code_column].includes(InputboxText) ||
            item[menu.name_column].includes(InputboxText)
        );
      }
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
    if (menu.name == "공통코드") {
      handleInputChange({
        target: {
          name: code_type,
          value: datarow[menu.code_column],
        },
      });
      } else if (menu.input_type == "partner") {
        handleInputChange('master', menu.code_column, datarow[menu.code_column]);
    } else if(menu.input_type == "item"){
      handleInputChange('detail', menu.code_column, datarow[menu.code_column]);
      handleInputChange('detail', menu.name_column, datarow[menu.name_column]);
    }
    setSelectedColumn(datarow);
    searchPartner(datarow[menu.name_column]);
  };

  const clickFn = (e) => {
    e.preventDefault();
    setInputboxText(e.target[0].value);
    setDataLoaded(true);
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
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="mt-3"
            style={{
              width: "25%",
              height: "30px",
              margin: "0 5px",
              border: "1px solid #d9d9d9",
              textAlign: "center",
            }}
          >
            <option value="default">전체</option>
            <option value="code">{menu.name}코드</option>
            <option value="name">{menu.name}명</option>
          </select>
          <form style={{ display: "inline" }} onSubmit={(e) => clickFn(e)}>
            <input
              style={{
                border: "1px solid black",
                width: "50%",
                height: "31px",
                border: "1px solid #d9d9d9",
              }}
            ></input>
             {/* <div style={{ textAlign: "right", marginRight: "10px" }}> */}
             <button style={styles.btnSave}className="btn" type="submit">
                검색
              </button>
            {/* </div> */}
          </form>
        </div>
      </div>
      <div>
        <div
          className="body m-3"
          style={{ height: "400px", overflowY: "scroll" }}
        >
          <table style={{ color: "#000", textAlign: "center" }}
            className="common_help_table">
            <thead>
              <tr>
                <th>{menu.name}코드</th>
                <th>{menu.name}명</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((datarow) => (
                <tr
                  onClick={(e) => {
                    rowClickHandler(datarow);
                  }}
                  style={{textAlign: 'center'}}
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
