import React, { useEffect, useState } from "react";
import axios from 'axios'
import AddTd from "component/layout/Table/AddTableData";
import Table from "component/layout/Table/Table";
import HelperModal from "component/common/helper/HelperModal";
import SearchHelperModal from "component/common/helper/SearchHelperModal";

import productionListClasses from "style/production/list.module.css";
import productionClasses from "style/production/production.module.css";

export default function Line() {
  const [item, setItem]=useState();
 
  const header=[
    { text: "선택", value: "select", width: "5%" },
    { text: "순번", value: "index", width: "5%" },
    {text:'라인명*',value: "line", width: "10%", selectBox:true },
    {text: '라인코드*', value:"lineCode", width: "10%"},
    {text: '관리자명',value:"emp", width: "10%"},
    {text: '상태 (이상조치/점검/정상)', value:"state",width: "10%"},
    {text: '용도',value:"uses", width: "15%"},
    {text: '위치', value:"place",width: "15%"}
  ]
  
  const selectHandler = ()=>{}
  const editHandler=()=>[{

  }]
  const saveHandler=()=>{

  }
  const deleteHandler=()=>{
    
  }

  return (
    <div>
      <p className={productionClasses["sub-menu-name"]}>생산라인관리</p>
      <div className={productionClasses.grid01}>
          <Table headers={header}>
            <AddTd
              isBtn={true}  
              items={item}
              selectRowHandler={selectHandler}
              onGridTrigger={null}
              emitItem={setItem}
              // deleteItem={deleteIdx}
              editHandler={editHandler}
            ></AddTd>
          </Table>
        </div>
        <div className={productionClasses["product_btn-wrap"]}>
          <button
            className={productionClasses["product_btn_delete"]}
            onClick={deleteHandler}
          >
            삭제
          </button>
          <button
            className={productionClasses['product_btn_save']}
            onClick={saveHandler}
          >
            저장
          </button>
        </div>
    </div>
  );
}
