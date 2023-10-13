import React, { useEffect, useState } from "react";

import AddTd from "component/layout/Table/AddTableData";
import Table from "component/layout/Table/Table";
import ListTd from "component/layout/Table/ListTableData";
import HelperModal from "component/common/helper/HelperModal";
import SearchHelperModal from "component/common/helper/SearchHelperModal";
import AlertModal from "component/common/AlertModal";
import {
  camelToSnake,
  getToday,
  snakeToCamel,
  timeToKR,
} from "function/commonFunction";

import productionListClasses from "style/production/list.module.css";
import productionClasses from "style/production/production.module.css";
import searchStyle from "style/common/searchStyle.module.css";
import listStyle from "style/production/list.module.css";
import { useReducer } from "react";
import { getAxios, putAxios } from "function/axiosFuction";

export default function Add() {
  const [grid01_items, set01Item] = useState();
  const [grid02_items, set02Item] = useState();
  const grid01_headers = [
    { text: "선택", value: "select", width: "3%" },
    { text: "순번", value: "index", width: "3%" },
    { text: "생산번호", value: "productionCode", width: "9%", readonly: true },
    { text: "생산일", value: "date", width: "9%",required:true },
    {
      text: "생산품",
      value: "item",
      width: "9%",
      gridTrigger: true,
      readonly:true,
      required:true
    },
    { text: "수량", value: "quantity", width: "3%", readonly: true,required:true },
    { text: "생산팀", value: "team", width: "4%", helper: true ,required:true},
    { text: "라인", value: "line", width: "5%", helper: true ,required:true},
    { text: "창고", value: "storage", width: "5%", helper: true ,required:true},
    { text: "장소", value: "location", width: "5%", helper: true ,required:true},
    { text: "거래처", value: "partner", width: "9%", helper: true ,required:true},
    { text: "담당자", value: "emp", width: "5%", helper: true ,required:true},
    { text: "소요시간", value: "leadTime", width: "5%" ,required:true},
    { text: "작업인원", value: "workForce", width: "5%" },

    { text: "비고", value: "description", width: "9%" },
  ];
  const grid02_headers = [
    { text: "순번", value: "index", width: "5%" },
    { text: "자재", value: "item", width: "15%", readonly: true,required:true },
    { text: "필요 수량", value: "quantity", width: "8%", readonly: true },
    { text: "총 투입수량", value: "totalQuantity", width: "8%", readonly: true },
    { text: "창고", value: "storage", width: "10%", helper: true ,required:true, trigger: true},

    {
      text: "세부장소",
      value: "location",
      width: "8%",
      helper: true,
      trigger: true,
      required:true
    },
    // {
    //   text: "재고",
    //   value: "inventory",
    //   width: "5%",
    //   readonly: true,
     
    // },
    { text: "비고", value: "description", width: "20%", readonly: true },
  ];
  const searchFilter = [
    { text: "생산번호", value: "productionCode", width: "3%" },
    { text: "생산품", value: "item", width: "3%", helper: true },
    { text: "생산팀", value: "team", width: "3%", helper: true },
    { text: "창고", value: "storage", width: "3%", helper: true },
    { text: "장소", value: "location", width: "3%", helper: true },
    { text: "거래처", value: "partner", width: "3%", helper: true },
    { text: "담당자", value: "emp", width: "3%", helper: true },
    { text: "비고", value: "description", width: "3%" },
  ];

  const [inputFilter, setInputFilter] = useState();

  const [disabledBtn, setDisabledBtn] = useState({
    state: true,
    class: "btn_disabled",
    // class: `${listStyle["btn_disabled"]}`,
  });

  const [searchPeriod, setSearchPeriod] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const copyFilter = { ...inputFilter };

    copyFilter.start_date = searchPeriod.startDate;
    copyFilter.end_date = searchPeriod.endDate;

    setInputFilter({ ...copyFilter });
  }, [searchPeriod]);

  useEffect(() => {
    const filter = { start_date: getToday() };
    getAxios("production/list", filter, searchResult, consoleError);
  }, []);

  const gridTriggerHandler = () => {};
  const grid01SelectHandler = (idx, e) => {
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

  const grid02SelectHandler = (e, idx) => {};

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

  const editHandler = (e, tableType, colInfo, coordinate) => {
    setDisabledBtn({ state: false, class: "btn_save" });
    if (tableType === "add") {
      //grid01에 수정 표시
      let copyItem = JSON.parse(JSON.stringify(grid01_items));
      copyItem[coordinate.row].state = "edit";
      set01Item([...copyItem]);
      // console.log(grid01Dummy01)
    } else if (tableType === "list") {
      //grid02에 수정 표시
      cacheDispatch({ type: "EDIT", idx: coordinate.row });
      // console.log(grid02Cache)
    }
  };

  const saveHandler = () => {
    //수정된 item (state가 'edit'인것)

    if (!grid01_items.find((data) => data.item) && !deleteData) return;
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
          // //item 값이 입력된 행인데 NULL 컬럼 아닌 컬럼에 값이 입력돼있지 않은 값
          if (
            grid01Data[i].item &&
            !(
              key === "description" ||
              key === "state" ||
              key === "team" ||
              key === "select" ||
              key === "index" ||
              key === "isDelete"
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
    if (!itemCount && !deleteData) {
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
                (key === "item" ||
                  key === "storage" ||
                  key === "quantity" ||
                  key === "location") &&
                !grid02Cache.items[i][j][key]
              ) {
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
            }
          }
        }
      }
    }

    //수정된 row
    const edited = [];
    if (!alertHeader) {
      //수정
      for (let i = 0; i < grid01Data.length; i++) {
        let tempObj = {};
        for (let j = 0; j < grid02Cache.items[i].length; j++) {
          if (
            grid01Data[i].state === "edit" ||
            grid02Cache.items[i][j].state === "edit"
          ) {
            tempObj.productionCode = grid01Data[i].productionCode;
            tempObj.itemCode = grid01Data[i].itemCode;
            tempObj.item = grid01Data[i].item;
            edited.push(tempObj);
            break;
          }
        }
      }
    }
    //모달에 들어갈 내용
    const state = {
      headLine: "알림",
      title: "아래 생산 내역을 수정/삭제하시겠습니까?",
      table: [
        {
          name: "수정내역",
          header: [
            { text: "생산번호", value: "productionCode" },
            { text: "생산품명", value: "item" },
            { text: "생산품코드", value: "itemCode" },
          ],
          tableItem: edited,
        },
        {
          name: "삭제내역",
          header: [
            { text: "생산번호", value: "productionCode" },
            { text: "생산품명", value: "item" },
            { text: "생산품코드", value: "itemCode" },
          ],
          tableItem: deleteData,
        },
      ],
      data: { grid01Data, grid02Data: grid02Cache.items, deleteData },
    };
    modalDispatch({ type: "ON_MODAL", state });
  };

  const deleteHandler = () => {
    const checked = Array.from(
      ...[document.querySelectorAll('input[type="checkbox"]:checked')]
    );
    let idxArr = [];
    for (let input of checked) {
      let row = input.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0];
      idxArr.push(parseInt(row));
    }
    let copyItem = JSON.parse(JSON.stringify(grid01_items));
    let unDelete = [];
    let deleteArr = [];
    for (let i = 0; i < copyItem.length; i++) {
      if (!idxArr.includes(i)) {
        unDelete.push(copyItem[i]);
      } else {
        deleteArr.push(copyItem[i]);
      }
    }
    //삭제한 행 제외하고 테이블 출력
    set01Item([...unDelete]);
    //삭제한 행 모아놓기
    setDeleteData([...deleteArr]);

    cacheDispatch({ type: "DELETE_ROW", idxArr });
    setDisabledBtn({ state: false, class: "btn_save" });
    console.log(grid02Cache);

    checked.forEach((el) => (el.checked = false));
  };
  function searchResult(data) {
    console.log(data);
    const production = data.data.production;
    const component = data.data.component;

    const item01 = [];
    const item02 = [];
    for (let i = 0; i < production.length; i++) {
      let obj01 = {};
      for (let key in production[i]) {
        let header = "";
        if (key.includes("_name")) {
          //'name' 떼기 (item_name => item 으로 변경)
          header = key.replace("_name", "");
        } else if (key === "production_date") {
          header = "date";
          const dateKR = timeToKR(production[i][key]);
          obj01[header] = dateKR.match(/\d{4}-\d{2}-\d{2}/g)[0];
          continue;
        } else {
          header = snakeToCamel(key);
        }
        obj01[header] = production[i][key];
      }

      let arr = [];
      for (let j = 0; j < component[i].length; j++) {
        let obj02 = {};
        for (let key in component[i][j]) {
          let header = "";
          if (key.includes("_name")) {
            //'name' 떼기 (item_name => item 으로 변경)
            header = key.replace("_name", "");
          } else if (key === "production_date") {
            header = "date";
            const dateKR = timeToKR(component[i][j][key]);
            obj02[header] = dateKR.match(/\d{4}-\d{2}-\d{2}/g);
            continue;
          } else {
            header = snakeToCamel(key);
          }
          obj02[header] = component[i][j][key];
        }
        arr.push(obj02);
      }

      item02.push(arr);
      item01.push(obj01);
    }

    console.log(item01);
    set01Item([...item01]);

    //grid02
    cacheDispatch({ type: "INIT_CACHE", data: item02 });
    console.log([...item02]);
  }

  function consoleError(error) {
    console.log(error);
  }

  //검색필터 state 변경시 handler
  const formHandler = (filter) => {
    const filterToSnake = {};
    if (Object.keys(filter).length > 0) {
      // console.log(filter)
      for (let key in filter) {
        filterToSnake[camelToSnake(key)] = filter[key];
      }
      setInputFilter(filterToSnake);
      // console.log(filterToSnake)
    }
  };

  const searchHandler = () => {
    // const filter = { ...inputFilter };
    // if (searchPeriod.startDate) {
    //   filter.startDate = searchPeriod.startDate;
    // }
    // if (searchPeriod.endDate) {
    //   filter.endDate = searchPeriod.endDate;
    // }

    getAxios("production/list", inputFilter, searchResult, consoleError);
  };

  //grid01 row 선택시 그에 맞는 자재를 grid2에 출력하기 위해 입력 값을 저장하는 state
  const cacheInit = {
    idx: null,
    items: [],
  };
  const cacheReducer = (state, action) => {
    //cacheInit (행 선택하지 않음)
    if (action.type === "INIT_CACHE") {
      set02Item([]);
      return { items: action.data ? [...action.data] : [] };
    }
    //처음으로 행을 선택할때
    if (state.idx === null) {
      state = { ...state, idx: action.idx };
      return state;
      //이전에 선택한 적이 있었을 때
    } else {
      //cacheItems 복사
      let copyItems = state.items
        ? JSON.parse(JSON.stringify(state.items))
        : [];
      //행을 지울때
      if (action.type === "DELETE_ROW") {
        if (action.idxArr) {
          let unDelete = [];
          for (let i = 0; i < copyItems.length; i++) {
            //삭제하는 idx가 아니면 undelete에 push
            if (!action.idxArr.includes(i)) {
              unDelete.push(copyItems[i]);
            }
          }
          set02Item([]);
          return { idx: 0, items: [...unDelete] };
        }
      } else {
        if (action.type === "SELECT_ROW") {
          //이전에 선택되었던 행에 파라미터 grid02 row 넣어줌
          copyItems[state.idx] = action.items && [...action.items];
          set02Item(copyItems[action.idx] ? [...copyItems[action.idx]] : []);
          return { idx: action.idx, items: [...copyItems] };
        } else if (action.type === "ON_SAVE") {
          //이전에 선택되었던 행에 파라미터 grid02 row 넣어줌
          copyItems[state.idx] = action.items && [...action.items];
          return { idx: action.idx, items: [...copyItems] };
        } else if (action.type === "TRIGGER") {
          //이전에 선택되었던 행에 파라미터 grid02 row 넣어줌
          copyItems[state.idx] = action.items && [...action.items];
          set02Item(action.items ? [...action.items] : []);
          return { ...state, items: [...copyItems] };
        } else if (action.type === "EDIT") {
          let copyItems = state.items
            ? JSON.parse(JSON.stringify(state.items))
            : [];
          copyItems[state.idx][action.idx].state = "edit";
          return { ...state, items: [...copyItems] };
        }
      }
      //state 지금 선택된 행으로 변경, item에 push
    }
  };
  const [grid02Cache, cacheDispatch] = useReducer(cacheReducer, cacheInit);

  const [deleteIdx, setDeleteIdx] = useState();
  const [deleteData, setDeleteData] = useState([]);

  const [initFilter, setInitFilter] = useState();

  //==========================모달===========================
  const modalInit = {
    showModal: false,
    headLine: "",
    title: "",
    table: [],
    data: {},
  };

  const offModal = () => {
    modalDispatch({ type: "OFF_MODAL" });
  };

  //모달 reducer (on/off, 코드 타입)
  const modalReducer = (state, action) => {
    if (action.type === "ON_MODAL") {
      return { showModal: true, ...action.state };
    }
    if (action.type === "OFF_MODAL") {
      console.log("in");
      return {
        ...modalInit,
      };
    }
  };
  const [modalState, modalDispatch] = useReducer(modalReducer, modalInit);

  const submitHandler = (type) => {
    const { grid01Data, grid02Data, deleteData } = { ...modalState.data };
    if (type === "save") {
      //product, product_detail 테이블 수정
      // const param={production:[],component:[],productionDelete:[]}
      const param = {};

      grid01Data.forEach((el) => {
        if (el.state === "edit") {
          param.production = param.production
            ? [...param.production, el]
            : [el];
        }
      });
      // param.production.push(grid01Data.find((el)=>{
      //   return el.state==='edit'
      // }))
      //product_relation 테이블 수정

      grid02Data.forEach((data) => {
        data.forEach((el) => {
          if (el.state === "edit") {
            param.component = param.component ? [...param.component, el] : [el];
          }
        });
      });
      // param.component.push(...componentArr)

      //product 테이블 delete
      // param.productionDelete.push(deleteData)
      param.productionDelete = param.productionDelete
        ? [...param.productionDelete, deleteData]
        : [...deleteData];
      console.log(param);
      putAxios("production/list/edit", param, success, fail);

      function success(data) {
        console.log(data);
        modalDispatch({ type: "OFF_MODAL" });
        searchHandler();
        let checkedArr = document.querySelectorAll(
          'input[type="checkbox"]:checked'
        );
        checkedArr = Array.from(checkedArr);
        checkedArr.forEach((el) => (el.checked = false));
        setDisabledBtn({ state: false, class: "btn_save" });
      }
      function fail(data) {
        console.log(data);
      }
    }
    if (type === "cancel") {
      modalDispatch({ type: "OFF_MODAL" });
    }
  };

  const enterHandler = searchHandler;

  return (
    <div className={listStyle["container-production_list"]}>
      <div
        className={`${searchStyle["container-search-helper"]} ${productionListClasses["filter-container"]}`}
      >
        <div className={listStyle["search_date"]}>
          <span>
            <label style={{ marginLeft: "2px" }}>생산일</label>
            <input
              onChange={(e) =>
                setSearchPeriod({ ...searchPeriod, startDate: e.target.value })
              }
              type="date"
              min="1900-01-01"
              max="9999-12-31"
            ></input>
          </span>

          <span style={{ marginTop: "20px", marginRight:'7px'}}>~</span>
          <span>
            <label>&nbsp;</label>
            <input
              onChange={(e) =>
                setSearchPeriod({ ...searchPeriod, endDate: e.target.value })
              }
              type="date"
              min="1900-01-01"
              max="9999-12-31"
            ></input>
          </span>
        </div>
        <SearchHelperModal
          headers={searchFilter}
          formHandler={formHandler}
          enterHandler={enterHandler}
        ></SearchHelperModal>
        <button className="btn_save" onClick={searchHandler}>
          조회
        </button>
      </div>
      <div className={productionClasses["sub-menu-name"]}>생산품</div>
      <div className={listStyle.grid01}>
        <Table headers={grid01_headers}>
          <AddTd
            items={grid01_items}
            selectRowHandler={grid01SelectHandler}
            onGridTrigger={gridTriggerHandler}
            emitItem={set01Item}
            // deleteItem={deleteIdx}
            editHandler={editHandler}
          ></AddTd>
        </Table>
      </div>
      {modalState.showModal && (
        <AlertModal
          offModal={offModal}
          modalState={modalState}
          onSubmit={submitHandler}
        ></AlertModal>
      )}
      <div className={productionClasses["sub-menu-name"]}>소모자재</div>
      <div className={listStyle.grid02}>
        <Table headers={grid02_headers}>
          <ListTd
            items={grid02_items}
            onTrigger={triggerHandler}
            emitItem={set02Item}
            selectRowHandler={grid02SelectHandler}
            editHandler={editHandler}
          ></ListTd>
        </Table>
      </div>
      <div className="wrap-btn">
        <button
          class="btn_delete"
          className={productionClasses["product_btn_delete"]}
          onClick={deleteHandler}
        >
          삭제
        </button>
        <button
          class="btn_save"
          className={disabledBtn.class}
          onClick={saveHandler}
          disabled={disabledBtn.state}
        >
          저장
        </button>
      </div>
    </div>
  );
}
