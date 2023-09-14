import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import productionListClasses from "style/production/list.module.css";
import productionClasses from "style/production/production.module.css";

import Table from "component/layout/Table/Table";
import AddTd from "component/layout/Table/AddTableData";
import ListTd from "component/layout/Table/ListTableData";
import HelperModal from "component/common/helper/HelperModal";
import { getAxios } from "function/axiosFuction";

export default function List() {
  //text: 컬럼명, value: 내부적으로 가지는 값(DB 필드명과 같음), width: 컬럼 style(width), helper: 도움창 사용여부, gridTrigger: 입력이 완료되면 grid02 데이터 가져오는 trigger 컬럼
  const grid01_headers = [
    { text: "선택", value: "select", width: "3%" },
    { text: "순번", value: "index", width: "3%" },
    // { text: "생산번호", value: "prouductNum", width: "9%", readonly: true },
    { text: "날짜", value: "date", width: "9%" },
    {
      text: "생산품",
      value: "item",
      width: "9%",
      helper: true,
      gridTrigger: true,
    },
    { text: "생산팀", value: "team", width: "4%", helper: true },
    { text: "라인", value: "line", width: "5%", helper: true },
    { text: "수량", value: "quantity", width: "3%" },
    { text: "창고", value: "storage", width: "5%", helper: true },
    { text: "장소", value: "location", width: "5%", helper: true },
    { text: "고객", value: "partner", width: "9%",helper:true },
    { text: "담당자", value: "emp", width: "5%", helper:true },
    { text: "소요시간", value: "lead_time", width: "5%"},
    { text: "작업인원", value: "work_force", width: "5%"},
    { text: "비고", value: "description", width: "9%" },
  ];

  const [grid02_items, setItems] = useState([]);
  const grid02_headers = [
    { text: "선택", value: "select", width: "5%" },
    { text: "순번", value: "index", width: "5%" },
    { text: "자재", value: "item", width: "15%", helper: true },
    { text: "필요수량", value: "quantity", width: "8%", helper: true },
    { text: "창고", value: "storage", width: "10%", helper: true },
    {
      text: "세부장소",
      value: "location",
      width: "8%",
      helper: true,
      trigger: true,
    },
    {
      text: "재고",
      value: "inventory",
      width: "5%",
      readonly: true,
      trigger: true,
    },
    { text: "비고", value: "description", width: "20%", readonly: true },
  ];

  const [validation, setValidation] = useState(false);

  //grid 1 trigger handler
  const gridTriggerHandler = (header, tableItems, currentCol) => {
    let itemCode = "";
    if (header.value === "item") {
      itemCode = tableItems[currentCol.row].itemCode;
    }

    axios
      .get(`http://localhost:9090/production/add/component`, {
        params: { itemCode },
      })
      .then((res) => {
        return res.data.data;
      })
      .then((data) => {
        let newTableItems = [];

        for (let i = 0; i < data.length; i++) {
          newTableItems.push({
            item: data[i].component_name,
            itemCode: data[i].item_code,
            quantity: data[i].quantity,
            // storage:data[i].storage_name,
            // storageCode:data[i].storage_code,
            // location: data[i].location_name,
            // locationCode: data[i].location_code,
            // total:data[i].total,
            description: data[i].description,
          });
        }
        setItems([...newTableItems]);
      })
      .catch((error) => console.log(error));
  };

  //grid2 trigger handler (창고와 세부장소에 맞는 재고 가져오기)
  const triggerHandler = (header, tableItems, currentCol) => {
    let itemCode,
      storageCode,
      locationCode = "";
    const rowItem = tableItems[currentCol.row];
    //trigger가 location일 경우
    if (header.value === "location") {
      itemCode = rowItem.itemCode;
      storageCode = rowItem.storageCode;
      locationCode = rowItem.locationCode;

      axios
        .get(`http://localhost:9090/production/add/inventory`, {
          params: { itemCode, storageCode, locationCode },
        })
        .then((res) => {
          return res.data.data;
        })
        .then((data) => {
          //================선택한 코드 테이블에 출력===============
          let copyItems = JSON.parse(JSON.stringify(tableItems));
          let currentRow = currentCol.row;

          copyItems[currentRow].inventory = data.total;
          setItems([...copyItems]);
        })
        .catch((error) => console.log(error));
    }
  };

  const saveHandler = () => {    
    //====================테이블의 모든 input 가져오기====================
    const inputArr=[...document.querySelectorAll('[id*="grid"]')]
    const grid01Data=[]
    const grid02Data=[]

    inputArr.forEach((el)=>{
      //id(grid번호_행번호_header) 에서 행번호 찾기
      let row=el.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0];
      //id(grid번호_행번호_header) 에서 header 찾기
      let header = el.id.match(/(?<=\w_)[a-z_]+/g)[0];

      if(el.id.includes('grid01')){
        grid01Data[row]={...grid01Data[row],[header]:el.value}
      }else if(el.id.includes('grid02')){
        grid02Data[row]={...grid02Data[row],[header]:el.value}
      }
    })
    console.log(grid01Data)
    console.log(grid02Data)
    
    
    //=================필수 입력 컬럼에 값 다 있는지 확인===============
    let alertHeader=''
    let itemCount=0

    for (let i = 0; i < grid01Data.length; i++) {
      for(let key in grid01Data[i]){
        // //item 값이 입력된 행인데 NULL 컬럼 아닌 컬럼에 값이 입력돼있지 않으면
        grid01Data[i].item&&itemCount++
        if(grid01Data[i].item&&!(key==='description'||key==='lead_time||'||key==='work_force'||key==='team')&&!grid01Data[i][key]){
          alertHeader = grid01_headers.find((header)=>{
            return header.value===key
          })
          alert('상위테이블 '+alertHeader.text+'를 입력해주세요')
          return false;
        }
      }
    }
    //생산품이 하나도 입력되지 않았을때
    if(!itemCount){
      alertHeader='생산품'
      alert('저장할 '+alertHeader+'이 없습니다.')
    }

    if(!alertHeader){
      for (let i = 0; i < grid02Data.length; i++) {
        for(let key in grid02Data[i]){
          // //item 값이 입력된 행인데 NULL 컬럼 아닌 컬럼에 값이 입력돼있지 않으면
          if(grid02Data[i].item&&key!=='description'&&!grid02Data[i][key]){
            alertHeader = grid02_headers.find((header)=>{
              return header.value===key
            })
            alert('하위테이블 '+alertHeader.text+'를 입력해주세요')
            return;
        }
      }}    
    }
    if(!alertHeader){
      //putAxios
      console.log('success!',grid02Data)
    }
  };

  return (
    <>
      <div className={productionClasses.wrap}>
        <p className={productionClasses["sub-menu-name"]}>생산등록</p>
        <div className={productionClasses.grid01}>
          <Table headers={grid01_headers}>
            <AddTd onGridTrigger={gridTriggerHandler} onSave={saveHandler}></AddTd>
          </Table>
        </div>
        <div className={productionClasses.grid02}>
          <Table headers={grid02_headers}>
            <ListTd items={grid02_items} onTrigger={triggerHandler} onSave={saveHandler}></ListTd>
          </Table>
        </div>
        <div className={productionClasses["product_btn-wrap"]}>
          <button className={productionClasses["product_btn_delete"]}>
            삭제
          </button>
          <button
            className={productionClasses["product_btn_save"]}
            onClick={saveHandler}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
}
