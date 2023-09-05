import axios from "axios";
import React, { useEffect, useState } from "react";

import helperStyle from "style/common/HelperModal.module.css";

import HelperTable from "./HelperTable";

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

function HelperOverlay({ onSearchCode, modalState, onSelectCode }) {
  const codeName = modalState.codeName;
  const codeValue = modalState.codeValue;

  const [codeData, setCodeData] = useState();
  const [codeURL, setCodeURL]=useState();
  function isUpperCase(char) {
    return char === char.toUpperCase();
  }

  
  useEffect(() => {
    //api 요청 위해 카멜케이스->케밥케이스
    let url=''
    for (let i = 0; i < codeValue.length; i++) {
      let char = codeValue.charAt(i);
      
      if (isUpperCase(char)) {
        char = "-" + char.toLowerCase();
      }
      url += char;
    }
    setCodeURL(url)
    console.log(codeURL)
    
    //api요청
    axios
      .get(`http://localhost:9090/common-code/${codeURL}`, {
        // params: { codeValue},
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        //테이블 items
        const tableItems = data.data.map((el) => {
          return {
            [codeValue + "Code"]: el.common_code,
            [codeValue + "Name"]: el.common_name,
          };
        });
        setCodeData(tableItems);
      })
      .catch(error=>console.log(error));
  }, [modalState,codeURL,codeValue]);

  //테이블 headers
  const headers = [
    {
      text: `${codeName}코드`,
      value: `${codeValue}Code`,
      width: "50%",
    },
    {
      text: `${codeName}명`,
      value: `${codeValue}Name`,
      width: "50%",
    },
  ];

  //조회버튼 click handler
  function submitHandler(e) {
    e.preventDefault();
    console.log(selectOption);
    const keyword=document.querySelector('#keyword').value
    console.log(document.querySelector('#keyword').value)
  
    axios
      .get(`http://localhost:9090/common-code/${codeURL}`, {
        params: { searchOption:selectOption, keyword:keyword},
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        //테이블 items
        const tableItems = data.data.map((el) => {
          return {
            [codeValue + "Code"]: el.common_code,
            [codeValue + "Name"]: el.common_name,
          };
        });
        setCodeData(tableItems);
      })
      .catch(error=>console.log(error));
  }

  const [selectOption,setSelectOption]=useState('all');

  const selectHandler=(e)=>{
    setSelectOption(e.target.value)
  }

  return (
    <div className={helperStyle.overlay}>
      <h3>{codeName} 코드</h3>
      <form action="submit" onSubmit={submitHandler}>
        <select name="searchOption" defaultValue={'all'} onChange={selectHandler}>
          <option value='all'>전체</option>
          <option value='codeValue'>{codeName+'코드'}</option>
          <option value='codeName'>{codeName+'명'}</option>
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

export default function HelperModal({
  offModal,
  onSearchCode,
  modalState,
  onSelectCode,
}) {
  // const [codeData, setCodeData] = useState();

  // function isUpperCase(char){
  //   return char===char.toUpperCase();
  // }
  // useEffect(() => {
  //   //api 요청 위해 카멜케이스->케밥케이스
  //   let codeURL=''
  //   for (let i = 0; i < modalState.codeValue.length; i++) {
  //     let char=modalState.codeValue.charAt(i)
  //     if(isUpperCase(char)){
  //       char='-'+char.toLowerCase();
  //     }
  //     codeURL+=char
  //   }
  //   console.log(codeURL)

  //   axios
  //     .get(`http://localhost:9090/common-code/${codeURL}`, {
  //       params: { codeValue: modalState.codeValue },
  //     })
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .then((data) => {
  //       setCodeData(data.data);
  //     });
  // }, [modalState]);

  // const [codeData,setCodeData]=useState();

  const selectCodeHandler = (code) => {
    onSelectCode(code);
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
