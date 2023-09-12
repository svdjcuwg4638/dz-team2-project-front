import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import productionListClasses from "style/production/list.module.css";
import productionClasses from "style/production/production.module.css";

import Table from "component/layout/Table/Table";
import AddTd from "component/layout/Table/AddTableData";
import ListTd from "component/layout/Table/ListTableData";
import HelperModal from "component/common/helper/HelperModal";

export default function List() {
  //text: 컬럼명, value: 내부적으로 가지는 값(DB 필드명과 같음), width: 컬럼 style(width), helper: 도움창 사용여부, gridTrigger: 입력이 완료되면 grid02 데이터 가져오는 trigger 컬럼
  const grid01_headers = [
    { text: "선택", value: "select", width: "9%" },
    { text: "순번", value: "index", width: "9%" },
    { text: "날짜", value: "date", width: "9%" },
    { text: "생산품", value: "item", width: "9%", helper: true,gridTrigger:true },
    { text: "생산팀", value: "team", width: "9%", helper: true },
    { text: "라인", value: "line", width: "9%",helper:true },
    { text: "수량", value: "quantity", width: "9%" },
    { text: "창고", value: "storage", width: "9%", helper: true },
    { text: "장소", value: "location", width: "9%", helper: true },
    { text: "비고", value: "description", width: "9%" },
    { text: "✔️", value: "validation", width: "9%" },
  ];

  const [grid02_items, setItems] = useState([]);
  const grid02_headers = [
    { text: "선택", value: "select", width: "5%" },
    { text: "순번", value: "index", width: "5%" },
    { text: "자재", value: "item", width: "15%",helper:true },
    { text: "필요수량", value: "quantity", width: "8%",helper:true },
    { text: "창고", value: "storage", width: "10%", helper: true },
    { text: "세부장소", value: "location", width: "8%", helper: true },
    { text: "재고", value: "total", width: "5%", readonly:true },
    { text: "비고", value: "description", width: "20%",readonly:true },
  ];

  //gridTrigger 컬럼의 onBlurHandler
  const onGridTrigger = (header,tableItem) => {
    
    let itemCode=''
    if(header.value==='item'){
      itemCode=tableItem.itemCode;
    }
    
    axios
      .get(`http://localhost:9090/production/add/component`, {
        params: {itemCode}
      })
      .then((res) => {
        return res.data.data;
      })
      .then((data) => {
        let tableItems = [];
        
        for (let i = 0; i < data.length; i++) {
          tableItems.push({
            item: data[i].component_name,
            itemCode: data[i].item_code,
            quantity: data[i].quantity,
            // storage:data[i].storage_name,
            // storageCode:data[i].storage_code,
            // location: data[i].location_name,
            // locationCode: data[i].location_code,
            // total:data[i].total,
            description:data[i].description
          });
        }
        setItems(tableItems)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // axios
    //   .get("/dummy/addDummy.json")
    //   .then((response) => {
    //     // console.log(response)
    //     return response.data;
    //   })
    //   .then((data) => {
    //     setItems(data.componentRelation);
    //   });
  }, []);

  return (
    <>
      <div className={productionClasses.wrap}>
        {/* {modalState.showModal && (
          <HelperModal
            modalState={modalState}
            offModal={offModalHandler}
            onSearchCode={searchHandler}
          />
        )} */}
        <p className={productionClasses["sub-menu-name"]}>생산등록</p>
        <div className={productionClasses.grid01}>
          <Table headers={grid01_headers}>
            <AddTd onGridTrigger={onGridTrigger}></AddTd>
          </Table>
        </div>
        <div className={productionClasses.grid02}>
          <Table headers={grid02_headers}>
            <ListTd items={grid02_items}></ListTd>
          </Table>
        </div>
      </div>
    </>
  );
}
