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
import { getToday } from "function/commonFunction";

export default function List() {
  //text: 컬럼명, value: 내부적으로 가지는 값(DB 필드명과 같음), width: 컬럼 style(width), helper: 도움창 사용여부, gridTrigger: 입력이 완료되면 grid02 데이터 가져오는 trigger 컬럼
  const [grid01_items, set01Item] = useState();
  const grid01_headers = [
    { text: "선택", value: "select", width: "3%" },
    { text: "순번", value: "index", width: "3%" },
    { text: "생산번호", value: "productionCode", width: "9%", readonly: true,required:true },
    { text: "생산일", value: "date", width: "9%",required:true },
    {
      text: "생산품",
      value: "item",
      width: "5%",
      helper: true,
      gridTrigger: true,required:true
    },

    { text: "생산팀", value: "team", width: "5%", helper: true ,required:true},
    { text: "라인", value: "line", width: "5%", helper: true,required:true },
    { text: "수량", value: "quantity", width: "5%" ,required:true},
    { text: "창고", value: "storage", width: "5%", helper: true ,required:true},
    { text: "장소", value: "location", width: "5%", helper: true ,required:true},
    { text: "거래처", value: "partner", width: "5%", helper: true,required:true },
    { text: "담당자", value: "emp", width: "5%", helper: true,required:true },
    { text: "소요시간", value: "leadTime", width: "5%" ,required:true},
    { text: "작업인원", value: "workForce", width: "5%" },

    { text: "비고", value: "description", width: "9%" },
  ];

  const [code, setCode] = useState();

  const [grid02_items, set02Item] = useState();
  const grid02_headers = [
    { text: "순번", value: "index", width: "5%" },
    { text: "자재", value: "item", width: "15%", readonly: true },
    { text: "필요수량", value: "quantity", width: "8%", readonly: true },
    { text: "필요수량 총합", value: "totalQuantity", width: "8%", readonly: true },
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

  const [deleteIdx, setDeleteIdx] = useState();

  //재고가 자재 필요 수량보다 많은지
  const [quantityValid,setQuantityValid] = useState();

  //grid01 row 선택시 그에 맞는 자재를 grid2에 출력하기 위해 입력 값을 저장하는 state
  const cacheInit = {
    idx: null,
    items: [],
  };
  const cacheReducer = (state, action) => {
    //처음으로 행을 선택할때
    if (state.idx === null) {
      state = { ...state, idx: action.idx };
      return state;
      //이전에 선택한 적이 있었을 때
    } else {
      //cacheITems 복사
      let copyItems = state.items
        ? JSON.parse(JSON.stringify(state.items))
        : [];
      if (action.type === "DELETE_ROW") {
        if (action.idxArr) {
          let unDelete = [];
          for (let i = 0; i < copyItems.length; i++) {
            //삭제하는 idx가 아니면 undelete에 push
            if (!action.idxArr.includes(`${i}`)) {
              unDelete.push(copyItems[i]);
            }
          }
          set02Item(unDelete[0]);
          return { idx: 0, items: [...unDelete] };
        }
      } else {
        //이전에 선택되었던 행에 파라미터 grid02 row 넣어줌
        copyItems[state.idx] = action.items && [...action.items];
        if (action.type === "SELECT_ROW") {
          set02Item(copyItems[action.idx] ? [...copyItems[action.idx]] : []);
          return { idx: action.idx, items: [...copyItems] };
        } else if (action.type === "ON_SAVE") {
          return { idx: action.idx, items: [...copyItems] };
        } else if (action.type === "TRIGGER") {
          set02Item(action.items ? [...action.items] : []);
          return { ...state, items: [...copyItems] };
        }
      }
      //state 지금 선택된 행으로 변경, item에 push
    }
  };
  const [grid02Cache, cacheDispatch] = useReducer(cacheReducer, cacheInit);

  useEffect(() => {
    const prefix = getToday().replaceAll("-", "");
    getAxios(
      "production/add/code",
      { prefix: prefix },
      setProductionCode,
      defaultCode
    );
  }, []);

  function setProductionCode(data) {
    //첫 렌더링시 기본 3행
    const DEFAULT_ROW = 1;
    const tempArr = [];

    //
    const num = data.data.match(/(\d{4})$/g)[0];
    for (let i = 1; i < DEFAULT_ROW + 1; i++) {
      let code = data.data.replace(num, `${parseInt(num) + i}`);
      tempArr.push({ productionCode: code });
      //마지막으로 부여한 code를 상태에 추가
      if (i === DEFAULT_ROW) {
        setCode(code);
      }
    }
    set01Item([...tempArr]);
  }
  function defaultCode(error) {
    const prefix = getToday().replace("-", "");
    console.error("Production Code Error: ", error);
    const code = `P${prefix}5555`;
    setCode(code);
  }
  function addRowEmitHandler() {
    const num = code.match(/(\d{4})$/g)[0];
    let newCode = code.replace(num, `${parseInt(num) + 1}`);

    setCode(newCode);
    set01Item([...grid01_items, { productionCode: newCode }]);
  }

  //grid 1 trigger handler
  const gridTriggerHandler = (header, tableItems, currentCol) => {
    let itemCode = "";
    //생산품코드 입력시
    if (header.value === "item") {
      itemCode = tableItems[currentCol.row].itemCode;
    }

    const grid01QuantityEl =  document.querySelector(`#grid01_${currentCol.row}_quantity`);
    console.log(grid01QuantityEl);

    //소요자재 요청
    getAxios("production/add/component", { itemCode }, success, fail);

    function success(resData) {
      let data = resData.data;
      let newTableItems = [];

      for (let i = 0; i < data.length; i++) {
        newTableItems.push({
          productCode: data[i].item_code,
          item: data[i].component_name,
          itemCode: data[i].component_code,
          quantity: data[i].quantity,
          totalQuantity: data[i].quantity*grid01QuantityEl.value,
          // storage:data[i].storage_name,
          // storageCode:data[i].storage_code,
          // location: data[i].location_name,
          // locationCode: data[i].location_code,
          // total:data[i].total,
          description: data[i].description,
        });
      }
      cacheDispatch({
        type: "TRIGGER",
        idx: currentCol.row,
        items: newTableItems,
      });

      console.log(grid02Cache.items);
      
    }
    function fail(error) {
      console.log(error);
    }
  };
  function editHandler(e,tableType ,colInfo, coordinate){
    //grid01 수량 변경했을 때
    if(tableType==='add'&&colInfo.value==='quantity'){
      if(grid02_items){

        const copyItem = [...grid02_items]
        for (let i = 0; i < copyItem.length; i++) {
          //필요수량 * 생산수량
          let totalQuantity= copyItem[i].quantity*e.target.value;
          copyItem[i].totalQuantity=totalQuantity;
          //소요자재>재고이면 css 변경
          if(totalQuantity>copyItem[i].inventory){
            let inventoryEl = document.querySelector(`#grid02_${i}_inventory`);
            let totalQuantityEl = document.querySelector(`#grid02_${i}_totalQuantity`);
            inventoryEl.className+=` ${productionClasses['out-stock']}`
            totalQuantityEl.className+=` ${productionClasses['out-stock']}`
            console.log(totalQuantityEl,inventoryEl)
          }
        }
        set02Item([...copyItem])
      }
    }
  }

  //grid 2 trigger handler (창고와 세부장소에 맞는 재고 가져오기)
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

      getAxios(
        "production/add/inventory",
        { itemCode, storageCode, locationCode },
        success,
        fail
      );

      function success(resData) {
        const data = resData.data;
        //================선택한 코드 테이블에 출력===============
        let copyItems = tableItems;
        let currentRow = currentCol.row;

        copyItems[currentRow].inventory = data.total;
        // set02Item([...copyItems]);
        cacheDispatch({
          type: "TRIGGER",
          idx: currentCol.row,
          items: [...copyItems],
        });

        //소요자재 재고 확인 (필요자재 > 재고이면 css 변경)
        let totalQuantity= rowItem.totalQuantity;

        if(totalQuantity>rowItem.inventory){
          let inventoryEl = document.querySelector(`#grid02_${currentRow}_inventory`);
          let totalQuantityEl = document.querySelector(`#grid02_${currentRow}_totalQuantity`);
          inventoryEl.className+=` ${productionClasses['out-stock']}`
          totalQuantityEl.className+=` ${productionClasses['out-stock']}`
          console.log(totalQuantityEl,inventoryEl)
        }
      }

      function fail(error) {
        console.log(error);
      }

    }
  };

  const saveHandler = () => {
    if (!grid01_items.find((data) => data.item)){
      alert("저장할 내역이 없습니다.");
      return;
    } 
    //====================테이블의 모든 input 가져오기====================
    const inputArr = [...document.querySelectorAll('[id*="grid"]')];
    let grid01Data = [];
    const grid02Data = [];

    inputArr.forEach((el) => {
      //id(grid번호_행번호_header) 에서 행번호 찾기
      let row = Number(el.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0]);
      //id(grid번호_행번호_header) 에서 header 찾기
      let header = el.id.match(/(?<=\w_)[a-zA-Z_]+/g)[0];

      if (el.id.includes("grid01")) {
        //grid01 state + input value
        grid01Data[row] = { ...grid01Data[row], [header]: el.value };
        //grid02 state + input value
      } else if (el.id.includes("grid02")) {
        //겉으로 보이는 value + state에 저장된 itemList
        grid02Data[row] = {
          ...grid02_items[row],
          ...grid02Data[row],
          [header]: el.value,
        };
      }
    });

    cacheDispatch({ type: "ON_SAVE", idx: null, items: grid02Data });

    //=================grid01 필수 입력 컬럼에 값 다 있는지 확인===============
    let alertHeader = "";
    let itemCount = 0;
    //grid01 입력확인
    for (let i = 0; i < grid01Data.length; i++) {
      //겉으로 보이는 value + state에 저장된 itemList
      grid01Data[i] = { ...grid01_items[i], ...grid01Data[i] };
      for (let key in grid01Data[i]) {
        if (grid01Data[i].item) {
          itemCount++;
          // //item 값이 입력된 행인데 NULL 컬럼 아닌 컬럼에 값이 입력돼있지 않으면
          if (
            grid01Data[i].item &&
            !(
              key === "description" ||
              key === "leadTime||" ||
              key === "workForce" ||
              key === "team" ||
              key === "select" ||
              key === "index"
            ) &&
            !grid01Data[i][key]
          ) {
            alertHeader = grid01_headers.find((header) => {
              return header.value === key;
            });
            alert("상위테이블 " + alertHeader.text + "를 입력해주세요");
            return;
          } else {
            //!!!!!!!!!!!!!!!!! 로그인한 companyId 가져오는 로직으로 수정 !!!!!!!!!!!!!!!!!
            grid01Data[i].companyId = 1;
          }
        } else {
          grid01Data.splice(i, 1);
          grid02Cache.items[i] && grid02Cache.items.splice(i, 1);
          i--;
        }
      }
    }
    //생산품이 하나도 입력되지 않았을때
    if (!itemCount) {
      alertHeader = "생산품";
      alert("저장할 " + alertHeader + "이 없습니다.");
    }

    //grid02 입력확인
    if (!alertHeader) {
      for (let i = 0; i < grid02Cache.items.length; i++) {
        for (let j = 0; j < grid02Cache.items[i].length; j++) {
          if (grid02Cache.items[i] !== null) {
            for (let key in grid02Cache.items[i][j]) {
              // //item 값이 입력된 행인데 NULL 컬럼 아닌 컬럼에 값이 입력돼있지 않으면
              if (
                grid02Cache.items[i][j].item &&
                !(
                  key === "description" ||
                  key === "select" ||
                  key === "index"
                ) &&
                !grid02Cache.items[i][j][key]
              ) {
                //빈 컬럼 찾기
                alertHeader = grid02_headers.find((header) => {
                  return header.value === key;
                });
                if (alertHeader.value === "inventory") {
                  alert("해당 장소에 자재가 없습니다.");
                } else {
                  alert("하위테이블 " + alertHeader.text + "를 입력해주세요");
                }
                return;
              }
              if( grid02Cache.items[i][j].totalQuantity>grid02Cache.items[i][j].inventory){
                alert("자재 재고가 부족한 생산품이 있습니다.")
                return;
              }
            }
          }
        }
      }
    }

    if (!alertHeader) {
      console.log(grid01Data);
      console.log(grid02Cache.items);

      postAxios(
        "production/add",
        { production: grid01Data, component: grid02Cache.items },
        success,
        fail
      );
    }
    function success(data) {
      alert("저장이 완료됐습니다");
      window.location.reload();
    }
    function fail(data) {
      console.log(data);
      alert("ERROR! 데이터를 저장하지 못했습니다");
    }
    console.log(grid02Cache);
    console.log(grid02_items);

  };

  const selectRowHandler = (idx,e) => {
    //========필수항목일 경우 input 색상 변경=======
    if(e.target.type==='text'){
      let inputId = e.target.id
      let inputHeader = inputId.match(/(?<=\w_)[a-zA-z_]+/g)[0];
      e.target.className=e.target.className.replace('input_red','')
      e.target.className=e.target.className.replace('input_black','')
      // e.target.className=e.target.className.replace('input_blue','')
      
      // e.target.className.replace(`${productionClasses["input_red"]}`,null)
      // e.target.className.replace(`${productionClasses["input_black"]}`,null)
      grid01_headers.map((header)=>{
        if(inputHeader===header.value){
          //필수항목이고 빈칸이면
          if(!header.readonly&&header.required&&e.target.value===''){
            // e.target.className= e.target.className?e.target.className+`${productionClasses[" input_red"]}`:`${productionClasses["input_red"]}`
            e.target.className= e.target.className?e.target.className+' input_red':'input_red'
          }else if(!header.readonly){
            // e.target.className= e.target.className?e.target.className+`${productionClasses[" input_black"]}`:`${productionClasses["input_black"]}`
            e.target.className= e.target.className?e.target.className+' input_black':'input_black'
          }
        }
      })
    }


    //========선택 생산품에 대한 grid02 정보 출력하기========
    const inputArr = [...document.querySelectorAll('input[id*="grid02"]')];
    // console.log(inputArr)

    //겉으로 보이는 input value
    const elementItem = [];
    inputArr.forEach((el) => {
      //id(grid번호_행번호_header) 에서 행번호 찾기
      let row = el.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0];
      //id(grid번호_행번호_header) 에서 header 찾기
      let header = el.id.match(/(?<=\w_)[a-z_]+/g)[0];

      //겉으로 보이는 value + state에 저장된 itemList
      let copyRow = JSON.parse(JSON.stringify(grid02_items[row]));
      elementItem[row] = {
        ...copyRow,
        ...elementItem[row],
        [header]: el.value,
      };
    });
    // console.log(elementItem);

    cacheDispatch({ type: "SELECT_ROW", idx, items: [...elementItem] });
    // console.log(grid02Cache.items)
  };

  const deleteHandler = () => {
    //체크된 input 요소 가져오기
    const checked = Array.from(
      ...[document.querySelectorAll('input[type="checkbox"]:checked')]
    );
    let idxArr = [];
    //input row idx 담은 배열 만들기
    for (let input of checked) {
      let row = input.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0];
      idxArr.push(parseInt(row));
    }
    setDeleteIdx(idxArr);

    // let copyItem = JSON.parse(JSON.stringify(grid01_items));
    // for(let deleteIdx of idxArr){
    //   copyItem.splice(deleteIdx,1)
    // }
    // set01Item([...copyItem])
    cacheDispatch({ type: "DELETE_ROW", idxArr });

    checked.forEach(el=>el.checked=false)
    console.log(grid02Cache);
  };

  return (
    <>
      <div className={productionClasses['container-section_add']}>
        <div className={productionClasses["sub-menu-name"]}>생산품</div>
        <div className={productionClasses.grid01}>
          <Table headers={grid01_headers}>
            <AddTd
              items={grid01_items}
              isBtn={true}
              onGridTrigger={gridTriggerHandler}
              selectRowHandler={selectRowHandler}
              emitItem={set01Item}
              deleteItem={deleteIdx}
              addRowEmit={addRowEmitHandler}
              editHandler={editHandler}
            ></AddTd>
          </Table>
        </div>
        <div className={productionClasses["sub-menu-name"]}>소모자재</div>
        <div className={productionClasses.grid02}>
          <Table headers={grid02_headers}>
            <ListTd
              items={grid02_items}
              onTrigger={triggerHandler}
              emitItem={set02Item}
            ></ListTd>
          </Table>
        </div>
        <div className="wrap-btn">
          <button
            className="btn_delete"
            onClick={deleteHandler}
          >
            삭제
          </button>
          <button
            className="btn_save"
            onClick={saveHandler}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
}
