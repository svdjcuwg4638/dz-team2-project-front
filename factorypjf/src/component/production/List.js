import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import productionListClasses from "style/production/List.module.css";
import productionClasses from "style/production/Production.module.css";
import DataTable from "component/layout/Table.js/Table";
import AddTd from "component/layout/Table.js/AddTableData";
import ListTd from "component/layout/Table.js/ListTableData";

export default function List() {
  const [grid02_items, setItems] = useState([]);

  const grid01_headers = [
    { text: "선택", value: "select",width:'9%' },
    { text: "순번", value: "index",width:'9%' },
    { text: "날짜", value: "date",width:'9%' },
    { text: "생산품명", value: "productName",width:'9%' },
    { text: "품목코드", value: "itemCode" ,width:'9%'},
    { text: "라인", value: "productLine",width:'9%' },
    { text: "수량", value: "quantity",width:'9%' },
    { text: "창고", value: "storage",width:'9%' },
    { text: "세부장소", value: "location",width:'9%' },
    { text: "비고", value: "description",width:'9%' },
    { text: "✔️", value: "validation",width:'9%' },
  ];
  const grid02_headers = [
    { text: "선택", value: "select" ,width:'5%' },
    { text: "순번", value: "index",width:'5%'  },
    { text: "자재명", value: "componentName",width:'15%'  },
    { text: "품목코드", value: "itemCode",width:'8%'  },
    { text: "필요수량", value: "quantity",width:'8%'  },
    { text: "창고", value: "storage",width:'10%'  },
    { text: "세부장소", value: "location",width:'8%'  },
    { text: "재고", value: "inventory",width:'5%'  },
    { text: "비고", value: "description",width:'20%'  },
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
