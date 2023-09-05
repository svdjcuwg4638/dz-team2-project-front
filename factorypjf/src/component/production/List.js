import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import productionListClasses from "style/production/List.module.css";
import productionClasses from "style/production/Production.module.css";

import Table from "component/layout/Table/Table";
import AddTd from "component/layout/Table/AddTableData";
import ListTd from "component/layout/Table/ListTableData";
import HelperModal from "component/common/helper/HelperModal";

const modalInit = {
  showModal: false,
  codeValue: "",
  codeText: "",
};

export default function List() {
  const [grid02_items, setItems] = useState([]);
  // //코드 도움창
  // const [showModal, setShowModal] = useState(false);
  // const toggleHandler = () => {
  //   setShowModal(!showModal);
  // };
  //코드 조회 쿼리
  const searchHandler = () => {
    // console.log(modalState);
    //modalState.codeValue가 카멜형식이라면 하이픈 형식으로 바꾸는 코드 추가 필요 (HJ)
    // axios
    //   .get(`http://localhost:9090/common-code/${modalState.codeValue}`)
    //   .then((response) => {
    //     console.log(response)
    //   })
  };

  // //모달 끄고 닫는 핸들러
  // const onModalHanlder = ({ value, text }) => {
  //   // console.log('onmodalHandler',value)
  //   dispatch({ type: "ON_MODAL", value, text });
  // };
  // const offModalHandler = () => {
  //   dispatch({ type: "OFF_MODAL" });
  // };
  // //모달 reducer (on/off, 코드 타입)
  // const modalReducer = (state, action) => {
  //   if (action.type === "ON_MODAL") {
  //     console.log(action);
  //     return {
  //       showModal: true,
  //       codeValue: action.value,
  //       codeText: action.text,
  //     };
  //   }
  //   if (action.type === "OFF_MODAL") {
  //     return { showModal: false, codeValue: "", codeText: "" };
  //   }
  // };
  // const [modalState, dispatch] = useReducer(modalReducer, modalInit);

  const grid01_headers = [
    { text: "선택", value: "select", width: "9%" },
    { text: "순번", value: "index", width: "9%" },
    { text: "날짜", value: "date", width: "9%" },
    { text: "생산품명", value: "itemName", width: "9%", helper: true },
    { text: "품목코드", value: "itemCode", width: "9%", helper: true },
    { text: "생산팀", value: "team", width: "9%", helper: true },
    { text: "라인", value: "productLine", width: "9%" },
    { text: "수량", value: "quantity", width: "9%" },
    { text: "창고", value: "storage", width: "9%", helper: true },
    { text: "세부장소", value: "location", width: "9%", helper: true },
    { text: "비고", value: "description", width: "9%" },
    { text: "✔️", value: "validation", width: "9%" },
  ];
  const grid02_headers = [
    { text: "선택", value: "select", width: "5%" },
    { text: "순번", value: "index", width: "5%" },
    { text: "자재명", value: "itemName", width: "15%" },
    { text: "품목코드", value: "itemCode", width: "8%", helper: true },
    { text: "필요수량", value: "quantity", width: "8%" },
    { text: "창고", value: "storage", width: "10%", helper: true },
    { text: "세부장소", value: "location", width: "8%", helper: true },
    { text: "재고", value: "inventory", width: "5%" },
    { text: "비고", value: "description", width: "20%" },
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
          <Table headers={grid01_headers} >
            <AddTd></AddTd>
          </Table>
        </div>
        <div className={productionClasses.grid02}>
          <Table headers={grid02_headers} >
            <ListTd items={grid02_items}></ListTd>
          </Table>
        </div>
      </div>
    </>
  );
}
