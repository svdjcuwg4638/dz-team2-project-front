import React, { useEffect, useState } from "react";

import AddTd from "component/layout/Table/AddTableData";
import Table from "component/layout/Table/Table";
import ListTd from "component/layout/Table/ListTableData";
import HelperModal from "component/common/helper/HelperModal";
import SearchHelperModal from "component/common/helper/SearchHelperModal";
import AlertModal from "component/common/AlertModal";

import productionListClasses from "style/production/list.module.css";
import productionClasses from "style/production/production.module.css";
import searchStyle from "style/common/searchStyle.module.css";
import { useReducer } from "react";

export default function Add() {
  const [grid01_items, set01Item] = useState();
  const [grid02_items, set02Item] = useState();
  const grid01_headers = [
    { text: "선택", value: "select", width: "3%" },
    { text: "순번", value: "index", width: "3%" },
    // { text: "생산번호", value: "prouductNum", width: "9%", readonly: true },
    { text: "날짜*", value: "date", width: "9%" },
    {
      text: "생산품*",
      value: "item",
      width: "9%",
      helper: true,
      gridTrigger: true,
    },

    { text: "생산팀*", value: "team", width: "4%", helper: true },
    { text: "라인*", value: "line", width: "5%", helper: true },
    { text: "수량*", value: "quantity", width: "3%" },
    { text: "창고*", value: "storage", width: "5%", helper: true },
    { text: "장소*", value: "location", width: "5%", helper: true },
    { text: "고객*", value: "partner", width: "9%", helper: true },
    { text: "담당자*", value: "emp", width: "5%", helper: true },
    { text: "소요시간*", value: "leadTime", width: "5%" },
    { text: "작업인원", value: "workForce", width: "5%" },

    { text: "비고", value: "description", width: "9%" },
  ];
  const grid02_headers = [
    { text: "순번", value: "index", width: "5%" },
    { text: "자재*", value: "item", width: "15%", readonly: true },
    { text: "필요수량", value: "quantity", width: "8%", readonly: true },
    { text: "창고*", value: "storage", width: "10%", helper: true },

    {
      text: "세부장소*",
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
  const searchFilter = [
    { text: "생산일", value: "date", width: "3%" },
    { text: "생산품", value: "item", width: "3%", helper: true },
    { text: "생산팀", value: "team", width: "3%", helper: true },
    { text: "품목", value: "item", width: "3%", helper: true },
    { text: "창고", value: "storage", width: "3%", helper: true },
    { text: "장소", value: "location", width: "3%", helper: true },
    { text: "고객", value: "partner", width: "3%", helper: true },
    { text: "담당자", value: "emp", width: "3%", helper: true },
    { text: "비고", value: "description", width: "3%" },
  ];
  //=======================dummy=======================
  const grid01Dummy01 = [
    {
      production_code:"202309220001",
      date: "2023-09-21",
      item: "Laptop1",
      team: "IT",
      storage: "Warehouse A",
      location: "Shelf 3",
      partner: "ABC Electronics",
      emp: "John Doe",
      description: "High-end laptop for development",
      line: "L1",
      quantity: 1,
      leadTime: "1h",
      workForce: 1,
    },
    {
      production_code:"202309220002",
      date: "2023-09-21",
      item: "Laptop2",
      team: "IT",
      storage: "Warehouse A",
      location: "Shelf 3",
      partner: "ABC Electronics",
      emp: "John Doe",
      description: "High-end laptop for development",
      line: "L1",
      quantity: 1,
      leadTime: "1h",
      workForce: 1,
    },
    {
      production_code:"202309220003",
      date: "2023-09-21",
      item: "Laptop3",
      team: "IT",
      storage: "Warehouse A",
      location: "Shelf 3",
      partner: "ABC Electronics",
      emp: "John Doe",
      description: "High-end laptop for development",
      line: "L1",
      quantity: 1,
      leadTime: "1h",
      workForce: 1,
    },
  ];
  const grid01Dummy02 = [
    {
      date: "2023-09-21",
      item: "Laptop2",
      team: "IT2",
      storage: "Warehouse B",
      location: "Shelf 02",
      partner: "ABC Electronics2",
      emp: "John Doe2",
      description: "High-end laptop for development2",
      line: "L2",
      quantity: 1,
      leadTime: "1h",
      workForce: 1,
    },
    {
      date: "2023-09-21",
      item: "Laptop2",
      team: "IT2",
      storage: "Warehouse B",
      location: "Shelf 02",
      partner: "ABC Electronics2",
      emp: "John Doe2",
      description: "High-end laptop for development2",
      line: "L2",
      quantity: 1,
      leadTime: "1h",
      workForce: 1,
    },
  ];
  const grid02Dummy01 = [
    [
      {
        production_code:"202309220001",
        item: "Widget",
        quantity: 100,
        total: 200,
        storage: "Warehouse A",
        location: "Shelf 3",
        total: 5000,
        description: "A small widget used in various applications.",
      },
      {
        production_code:"202309220001",
        item: "Widget",
        quantity: 100,
        total: 200,
        storage: "Warehouse A",
        location: "Shelf 3",
        total: 5000,
        description: "A small widget used in various applications.",
      },
    ],
    [
      {
        production_code:"202309220002",
        item: "Widget2",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
      {
        production_code:"202309220002",
        item: "Widget2",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
      {
        production_code:"202309220002",
        item: "Widget2",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
      {
        production_code:"202309220002",
        item: "Widget2",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
    ],
    [
      {
        production_code:"202309220003",
        item: "Widget2",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
    ],
  ];
  useEffect(() => {
    //getAxios
    set01Item(grid01Dummy01);
    set02Item(grid02Dummy01[0]);
    cacheDispatch({ type: "INIT_CACHE", data: grid02Dummy01 });
  }, []);

  const gridTriggerHandler = () => {};
  const grid01SelectHandler = (idx, e) => {
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

  const grid02SelectHandler=(e, idx)=>{
    
}

  const triggerHandler = () => {};

  const editHandler=()=>{
    console.log('edit')
  }
  const saveHandler = () => {
    const state = {
      headLine: "안내",
      content: `아래 생산품 정보를 수정/삭제하시겠습니까?`,
      tableItem:[]
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
      for (let i = 0; i < copyItem.length; i++) {
        if (!idxArr.includes(i)) {
          unDelete.push(copyItem[i]);
        }
      }
    set01Item([...unDelete]);
  
    cacheDispatch({ type: "DELETE_ROW", idxArr });

    console.log(grid02Cache);
  };
  const formHandler = () => {};

 

  //grid01 row 선택시 그에 맞는 자재를 grid2에 출력하기 위해 입력 값을 저장하는 state
  const cacheInit = {
    idx: null,
    items: [],
  };
  const cacheReducer = (state, action) => {
    //cacheInit (행 선택하지 않음)
    if (action.type === "INIT_CACHE") {
      return { idx: 0, items: [...action.data] };
    }
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

  const [deleteIdx, setDeleteIdx] = useState();

  const [initFilter, setInitFilter] = useState();

  //==========================모달===========================
  const modalInit = {
    showModal: false,
    headLine: "",
    title: "",
    content:{
      header:[],
      item:[]
    }
  };

  const offModal = () => {
    modalDispatch("OFF_MODAL");
  };

  //모달 reducer (on/off, 코드 타입)
  const modalReducer = (state, action) => {
    if (action.type === "ON_MODAL") {
      return { showModal: true, ...action.state };
    }
    if (action.type === "OFF_MODAL") {
      return modalInit;
    }
  };
  const [modalState, modalDispatch] = useReducer(modalReducer, modalInit);

  return (
    <div className={productionListClasses["production_list-container"]}>
      <div className={productionClasses.wrap}>
        <p className={productionClasses["sub-menu-name"]}>생산내역조회</p>
        <div className={searchStyle["container-search-helper"]}>
          <SearchHelperModal
            headers={searchFilter}
            formHandler={formHandler}
          ></SearchHelperModal>
        </div>
        <div className={productionClasses.grid01}>
          <Table headers={grid01_headers}>
            <AddTd
              items={grid01_items}
              selectRowHandler={grid01SelectHandler}
              onGridTrigger={triggerHandler}
              emitItem={set01Item}
              // deleteItem={deleteIdx}
              editHandler={editHandler}
            ></AddTd>
          </Table>
        </div>
        {modalState.showModal && (
          <AlertModal offModal={offModal} modalState={modalState}></AlertModal>
        )}
        <div className={productionClasses.grid02}>
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
        <div className={productionClasses["product_btn-wrap"]}>
          <button
            className={productionClasses["product_btn_delete"]}
            onClick={deleteHandler}
          >
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
    </div>
  );
}
