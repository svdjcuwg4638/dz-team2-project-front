import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import productionListClasses from "style/production/List.module.css";
import productionClasses from "style/production/Production.module.css";
import DataTable from "component/layout/Table.js/DataTableData";
import AddTd from "component/layout/Table.js/AddTableData";
import ListTd from "component/layout/Table.js/ListTableData";

export default function List() {
  const [grid02_items, setItems] = useState([]);

  const grid01_headers = [
    { text: "선택", value: "select" },
    { text: "순번", value: "index" },
    { text: "날짜", value: "date" },
    { text: "생산품명", value: "productName" },
    { text: "품목코드", value: "itemCode" },
    { text: "생산라인", value: "productLine" },
    { text: "생산수량", value: "quantity" },
    { text: "창고", value: "storage" },
    { text: "세부장소", value: "location" },
    { text: "비고", value: "description" },
    { text: "✔️", value: "validation" },
  ];
  const grid02_headers = [
    { text: "선택", value: "select" },
    { text: "순번", value: "index" },
    { text: "자재명", value: "componentName" },
    { text: "품목코드", value: "itemCode" },
    { text: "필요수량", value: "quantity" },
    { text: "창고", value: "storage" },
    { text: "세부장소", value: "location" },
    { text: "재고", value: "inventory" },
    { text: "비고", value: "description" },
  ];

  
  useEffect(() => {
    axios
      .get("/dummy/addDummy.json")
      .then((response) => {
        // console.log(response)
        return response.data;
      })
      .then((data) => {
        setItems(data.componentRelation);
      });
  }, []);

  return (
    <div className={productionClasses.wrap}>
      <p className={productionClasses["sub-menu-name"]}>생산등록</p>
      <div className={productionClasses.grid01}>
        <DataTable headers={grid01_headers}>
          <AddTd></AddTd>
        </DataTable>
      </div>
      <div className={productionClasses.grid02}>
        <DataTable headers={grid02_headers}>
          <ListTd items={grid02_items}></ListTd>
        </DataTable>
      </div>
    </div>
  );
}
