import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import productionListClasses from "style/production/list.module.css";
import productionClasses from "style/production/production.module.css";

import Table from "component/layout/Table/Table";
import AddTd from "component/layout/Table/AddTableData";
import ListTd from "component/layout/Table/ListTableData";
import HelperModal from "component/common/helper/HelperModal";
import { getAxios, postAxios } from "function/axiosFuction";

export default function List() {
  //text: 컬럼명, value: 내부적으로 가지는 값(DB 필드명과 같음), width: 컬럼 style(width), helper: 도움창 사용여부, gridTrigger: 입력이 완료되면 grid02 데이터 가져오는 trigger 컬럼
  const [grid01_items,set01Item]=useState()
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
    { text: "소요시간", value: "leadTime", width: "5%"},
    { text: "작업인원", value: "workForce", width: "5%"},

    { text: "비고", value: "description", width: "9%" },
  ];

  const [grid02_items, set02Item] = useState();

  const grid02_headers = [
    
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
  
  //grid01 row 선택시 그에 맞는 자재를 grid2에 출력하기 위해 입력 값을 저장하는 state
  const cacheInit={
    idx:null,
    items:[],
    actionType:''
  }
  const cacheReducer = (state, action) => {
    //처음으로 행을 선택할때
    if(state.idx===null){
      state={...state,idx:action.idx}
      return state;
      //이전에 선택한 적이 있었을 때
    }else{
      let copyItems = state.items?JSON.parse(JSON.stringify(state.items)):[];
      //이전에 선택되었던 행에 대한 grid2 넣어줌
      copyItems[state.idx]=action.items
      //지금 선택된 행에 대한 grid2 출력 바꿈
      if(action.type==='SELECT_ROW'){
        set02Item(copyItems[action.idx]?[...copyItems[action.idx]]:[])
        return{idx:action.idx, items:[...copyItems]}
      } else if(action.type==='ON_SAVE'){
        return{idx:action.idx, items:[...copyItems],actionType:'save'}
      } else if(action.type==='TRIGGER')
        set02Item(copyItems[state.idx]?[...copyItems[state.idx]]:[])
        return {...state,items:[...copyItems]}
      }
      //state 지금 선택된 행으로 변경, item에 push
    };
  const [grid02Cache, cacheDispatch] = useReducer(cacheReducer, cacheInit);
  
  // useEffect(()=>{
  //   if(grid02Cache){
  //     console.log(grid02Cache)
  //   }
  // },[grid02Cache])

  //grid 1 trigger handler
  const gridTriggerHandler = (header, tableItems, currentCol) => {
    let itemCode = "";
    //생산품코드 입력시
    if (header.value === "item") {
      itemCode = tableItems[currentCol.row].itemCode;

    }
    //자재 관계 가져오는 request
    axios
      .get(`http://localhost:9091/production/add/component`, {
        params: { itemCode },
      })
      .then((res) => {
        return res.data.data;
      })
      .then((data) => {

        let newTableItems = [];


        for (let i = 0; i < data.length; i++) {
          newTableItems.push({
            productCode:data[i].item_code,
            item: data[i].component_name,
            itemCode: data[i].component_code,
            quantity: data[i].quantity,
            // storage:data[i].storage_name,
            // storageCode:data[i].storage_code,
            // location: data[i].location_name,
            // locationCode: data[i].location_code,
            // total:data[i].total,
            description: data[i].description,
          });
        }
        // //grid02 item 변경
        // set02Item([...newTableItems]);
        // console.log(142)
        cacheDispatch({type:'TRIGGER', idx:currentCol.row, items:newTableItems})
        
        console.log(grid02Cache.items)
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
        .get(`http://localhost:9091/production/add/inventory`, {
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
          // set02Item([...copyItems]);
          cacheDispatch({type:'TRIGGER', idx:currentCol.row, items:[...copyItems]})
        })
        .catch((error) => console.log(error));
    }
  };

  const saveHandler = () => {
    //====================테이블의 모든 input 가져오기====================
    const inputArr=[...document.querySelectorAll('[id*="grid"]')]
    let grid01Data=[]
    const grid02Data=[]

    inputArr.forEach((el)=>{
      //id(grid번호_행번호_header) 에서 행번호 찾기
      let row=el.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0];
      //id(grid번호_행번호_header) 에서 header 찾기
      let header = el.id.match(/(?<=\w_)[a-z_]+/g)[0];

      if(el.id.includes('grid01')){
        //grid01 state + input value
        grid01Data[row]={...grid01Data[row],[header]:el.value}
      }else if(el.id.includes('grid02')){
        //grid02 state + input value
        grid02Data[row]={...grid02Data[row],[header]:el.value}
      }
    })
   
    cacheDispatch({type:'ON_SAVE',idx:null, items:grid02Data})

    //=================grid01 필수 입력 컬럼에 값 다 있는지 확인===============
    let alertHeader=''
    let itemCount=0
    //grid01 입력확인
    for (let i = 0; i < grid01Data.length; i++) {
      //겉으로 보이는 value + state에 저장된 itemList
      grid01Data[i]={...grid01_items[i],...grid01Data[i]}
      for(let key in grid01Data[i]){
        if(grid01Data[i].item){
          itemCount++;
          // //item 값이 입력된 행인데 NULL 컬럼 아닌 컬럼에 값이 입력돼있지 않으면
          if(grid01Data[i].item&&!(key==='description'||key==='lead_time||'||key==='work_force'||key==='team'||key==='select'||key==='index')&&!grid01Data[i][key]){
            alertHeader = grid01_headers.find((header)=>{
              return header.value===key
            })
            alert('상위테이블 '+alertHeader.text+'를 입력해주세요')
            return;
          }else{
            //!!!!!!!!!!!!!!!!! 로그인한 companyId 가져오는 로직으로 수정 !!!!!!!!!!!!!!!!!
            grid01Data[i].company_id=1;
          }
        }else{
          grid01Data.splice(i,1);
          grid02Cache.items[i]&&grid02Cache.items.splice(i,1)
          i--;
        }
      }
    }
    //생산품이 하나도 입력되지 않았을때
    if(!itemCount){
      alertHeader='생산품'
      alert('저장할 '+alertHeader+'이 없습니다.')
    }

    //grid02 입력확인
    if(!alertHeader){
      for (let i = 0; i < grid02Cache.items.length; i++) {
        for (let j = 0; j < grid02Cache.items[i].length; j++) {
          if(grid02Cache.items[i]!==null){
            for(let key in grid02Cache.items[i][j]){
              // //item 값이 입력된 행인데 NULL 컬럼 아닌 컬럼에 값이 입력돼있지 않으면
              if(grid02Cache.items[i][j].item&&!(key==='description'||key==='select'||key==='index')&&!grid02Cache.items[i][j][key]){
                alertHeader = grid02_headers.find((header)=>{
                  return header.value===key
                })
                if(alertHeader.value==='inventory'){alert('해당 장소에 자재가 없습니다.')}
                else{alert('하위테이블 '+alertHeader.text+'를 입력해주세요')}
                return;
              }
            }
          }   
        }
      }
    }

    if(!alertHeader){
      console.log(grid01Data)
      console.log(grid02Cache)
      
      postAxios('production/add',{production:grid01Data,component:grid02Cache.items},null,null)
    }
  };

  const selectRowHandler=(idx)=>{
    const inputArr=[...document.querySelectorAll('input[id*="grid02"]')]
    // console.log(inputArr)
    
    //겉으로 보이는 input value
    const elementItem=[]
    inputArr.forEach((el)=>{
      //id(grid번호_행번호_header) 에서 행번호 찾기
      let row=el.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0];
      //id(grid번호_행번호_header) 에서 header 찾기
      let header = el.id.match(/(?<=\w_)[a-z_]+/g)[0];
      
      //겉으로 보이는 value + state에 저장된 itemList
      elementItem[row]={...grid02_items[row],...elementItem[row],[header]:el.value}
    })
  
    cacheDispatch({type:'SELECT_ROW', idx, items:elementItem})
    // console.log(grid02Cache.items)
  }

  return (
    <>
      <div className={productionClasses.wrap}>
        <p className={productionClasses["sub-menu-name"]}>생산등록</p>
        <div className={productionClasses.grid01}>
          <Table headers={grid01_headers}>
            <AddTd onGridTrigger={gridTriggerHandler}  selectRowHandler={selectRowHandler} emitItem={set01Item}></AddTd>
          </Table>
        </div>
        <div className={productionClasses.grid02}>
          <Table headers={grid02_headers}>
            <ListTd items={grid02_items} onTrigger={triggerHandler} emitItem={set02Item}></ListTd>
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
