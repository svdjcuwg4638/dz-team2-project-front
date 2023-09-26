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
import listStyle from "style/production/list.module.css";
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
    { text: "생산품", value: "item", width: "3%" },
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
      productionCode: "202309220001",
      date: "2023-09-21",
      item: "Laptop1",
      itemCode: "I001",
      team: "IT",
      teamCode: "S1",
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
      productionCode: "202309220002",
      date: "2023-09-21",
      item: "Laptop2",
      itemCode: "I002",
      team: "IT",
      teamCode: "S1",
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
      productionCode: "202309220003",
      date: "2023-09-21",
      item: "Laptop3",
      itemCode: "I003",
      team: "IT",
      teamCode: "S1",
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
        productionCode: "202309220001",
        item: "Widget",
        productCode: "I001",
        quantity: 100,
        total: 200,
        storage: "Warehouse A",
        location: "Shelf 3",
        total: 5000,
        description: "A small widget used in various applications.",
      },
      {
        productionCode: "202309220001",
        productCode: "I001",
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
        productionCode: "202309220002",
        item: "Widget2",
        productCode: "I002",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
      {
        productionCode: "202309220002",
        item: "Widget2",
        productCode: "I002",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
      {
        productionCode: "202309220002",
        item: "Widget2",
        productCode: "I002",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
      {
        productionCode: "202309220002",
        item: "Widget2",
        productCode: "I002",
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
        productionCode: "202309220003",
        item: "Widget2",
        productCode: "I003",
        quantity: 100,
        total: 200,
        storage: "Warehouse A2",
        location: "Shelf 32",
        total: 5000,
        description: "A small widget used in various applications2.",
      },
    ],
  ];

  const [disabledBtn, setDisabledBtn] = useState({
    state: true,
    class: `${listStyle['btn_disabled']}`,
  });

  useEffect(() => {
    //getAxios
    let grid02Item;
    for (let i = 0; i < grid01Dummy01.length; i++) {
      grid01Dummy01[i].state = null;
      grid02Dummy01[i].forEach((el) => {
        el.state = null;
      });
    }

    set01Item(grid01Dummy01);
    set02Item(grid02Dummy01[0]);
    cacheDispatch({ type: "INIT_CACHE", data: grid02Dummy01 });
    console.log(grid01_items, grid02Cache);
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

  const grid02SelectHandler = (e, idx) => {};

  const triggerHandler = () => {};

  const editHandler = (e, tableType, coordinate) => {
    setDisabledBtn({state:false,class:`${listStyle['btn_abled']}`});
    if (tableType === "add") {
      //grid01에 수정 표시
      let copyItem = JSON.parse(JSON.stringify(grid01_items));
      copyItem[coordinate.row].state = "edit";
      set01Item([...copyItem])
      // console.log(grid01Dummy01)
    } else if (tableType === "list") {
      //grid02에 수정 표시
      cacheDispatch({ type: "EDIT", idx: coordinate.row });
      // console.log(grid02Cache)
    }
  };

  const saveHandler = () => {
    //수정된 item (state가 'edit'인것)

    if (!grid01_items.find((data) => data.item)) return;
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

    //확인 모달 띄우기
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
      data: { grid01Data, grid02Data: grid02Cache.items },
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
    let deleteArr=[];
    for (let i = 0; i < copyItem.length; i++) {
      if (!idxArr.includes(i)) {
        unDelete.push(copyItem[i]);
      }else{
        deleteArr.push(copyItem[i])
      }
    }
    //삭제한 행 제외하고 테이블 출력
    set01Item([...unDelete]);
    //삭제한 행 모아놓기
    setDeleteData([...deleteArr])

    cacheDispatch({ type: "DELETE_ROW", idxArr });
    setDisabledBtn({state:false,class:`${listStyle['btn_abled']}`});
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
          set02Item(unDelete[0]);
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
          copyItems[state.idx][action.idx].state = "edit";
          return { ...state, items: [...copyItems] };
        }
      }
      //state 지금 선택된 행으로 변경, item에 push
    }
  };
  const [grid02Cache, cacheDispatch] = useReducer(cacheReducer, cacheInit);

  const [deleteIdx, setDeleteIdx] = useState();
  const [deleteData,setDeleteData]=useState([]);

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
      return { ...modalInit };
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
            className={disabledBtn.class}
            onClick={saveHandler}
            disabled={disabledBtn.state}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
