import axios from "axios";
import React, { useEffect, useState } from "react";

import HelperTable from "./HelperTable";
import getUrl from "./codeUrl";
import {getAxios} from "function/axiosFuction";

import helperStyle from "style/common/helperModal.module.css";

//======================모달 back =========================
function HelperBackdrop({ offModal }) {
  const clickHandler = (e) => {
    e.preventDefault();
    offModal();
  };
  return (
    <div onClick={clickHandler} className={helperStyle["back-drop"]}>
      HelperBackdrop
    </div>
  );
}

//=====================모달 창===========================
function HelperOverlay({ onSearchCode, modalState, onSelectCode }) {
  const codeName = modalState.codeName;
  const codeValue = modalState.codeValue;

  //response data
  const [codeData, setCodeData] = useState();
  //누른 컬럼에 따른 요청 url 상태
  const [codeURL, setCodeURL] = useState();

  //응답데이터를 테이블에 넣기 위해 가공
  function setTableItems(data) {
    const tableItems = data.data.map((el) => {
      let objCode = "";
      let objName = "";
      //객체이므로 순서 보장이 안되니 코드데이터인지 코드명데이터인지 확인해서 넣어줌
      for (let key in el) {
        if (key.toLowerCase().includes("code")) {
          objCode = el[key];
        }
        if (key.toLowerCase().includes("name")) {
          objName = el[key];
        }
      }
      return {
        code: objCode,
        name: objName,
      };
    });
    setCodeData(tableItems);
  }

  function logError(error) {
    console.log(error);
  }

  useEffect(() => {
    //url 가져와서 상태 변경
    setCodeURL(getUrl(codeValue));
    codeURL&&getAxios(codeURL, null, setTableItems, logError);
  }, [modalState, codeURL, codeValue]);


  //테이블 headers
  const headers = [
    {
      text: "코드",
      value: "code",
      width: "50%",
      //누른 컬럼이 code에 관한 컬럼이면 도움창의 코드 컬럼만 selectable
      selectable: codeValue.toLowerCase().includes("code"),
    },
    {
      text: "이름",
      value: "name",
      width: "50%",
      //누른 컬럼이 코드명에 관한 컬럼이면 도움창의 코드명 컬럼만 selectable
      selectable: !codeValue.toLowerCase().includes("code"),
    },
  ];

  //조회버튼 click handler
  function submitHandler(e) {
    e.preventDefault();

    //검색키워드
    const keyword = document.querySelector("#keyword").value;
    const getParam= { searchOption: selectOption, keyword: keyword };
    
    getAxios(codeURL,getParam,setTableItems,logError)
  }

  //검색 옵션
  const [selectOption, setSelectOption] = useState("all");
  const selectOptionHandler = (e) => {
    setSelectOption(e.target.value);
  };

  return (
    <div className={helperStyle.overlay}>
      <h3>{codeName} </h3>
      <form action="submit" onSubmit={submitHandler}>
        <select
          name="searchOption"
          defaultValue={"all"}
          onChange={selectOptionHandler}
        >
          <option value="all">전체</option>
          <option value="codeValue">코드</option>
          <option value="codeName">이름</option>
        </select>
        <input type="text" name="" id="keyword" />
        <button>검색</button>
      </form>
      {codeData ? (
        <HelperTable
          headers={headers}
          items={codeData}
          onSelectCode={onSelectCode}
        ></HelperTable>
      ) : (
        <p>해당 데이터를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

//======================모달 root=========================
export default function HelperModal({
  offModal,
  modalState,
  onSelectCode,
}) {

  const selectCodeHandler = (codeRow) => {
    onSelectCode(codeRow);
    offModal();
  };

  return (
    <>
      <div className={helperStyle["helper-modal"]}>
        <HelperBackdrop offModal={offModal} />
        <HelperOverlay
          offModal={offModal}
          modalState={modalState}
          onSelectCode={selectCodeHandler}
        />
      </div>
    </>
  );
}
