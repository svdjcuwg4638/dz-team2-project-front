import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTd from "component/layout/Table/AddTableData";
import Table from "component/layout/Table/Table";
import HelperModal from "component/common/helper/HelperModal";
import SearchHelperModal from "component/common/helper/SearchHelperModal";

import lineStyle from "style/production/line.module.css";
import productionClasses from "style/production/production.module.css";
import { getAxios, postAxios } from "function/axiosFuction";
import { snakeToCamel } from "function/commonFunction";

export default function Line() {
  const [item, setItem] = useState();
  const [deleteKey,setDeleteKey]=useState();
  const [deleteIdx,setDeleteIdx]=useState();

  useEffect(() => {
    getAxios("production/line", null, getItem, consoleError);
  }, []);

  function getItem(data) {
    const item = data.data.map((el) => {
      const tempObj = {};
      for (let key in el) {
        let objKey = "";
        if (key.includes("_name")) {
          objKey = key.replace("_name", "");
        } else {
          objKey = snakeToCamel(key);
        }
        tempObj[objKey] = el[key];
      }
      tempObj.select = "";
      tempObj.index = "";
      tempObj.state = "";
      return tempObj;
    });
   
    setItem([...item]);
  }
  function consoleError(error) {
    console.log(error);
  }

  const header = [
    { text: "선택", value: "select", width: "5%" },
    { text: "순번", value: "index", width: "5%" },
    { text: "라인명", value: "line", width: "10%", selectBox: true,required:true },
    { text: "라인코드", value: "lineCode", width: "10%", readonly:true,required:true },
    { text: "관리자명", value: "emp", width: "10%", helper:true },
    { text: "용도", value: "uses", width: "15%" },
    { text: "위치", value: "place", width: "15%" },
    { text: "비고", value: "description", width: "15%" },
  ];

  const selectHandler = (idx,e) => {
    //========필수항목일 경우 input 색상 변경=======
    if(e.target.type==='text'){
      let inputId = e.target.id
      let inputHeader = inputId.match(/(?<=\w_)[a-zA-z_]+/g)[0];
      e.target.className=e.target.className.replace('input_red','')
      e.target.className=e.target.className.replace('input_black','')
      // e.target.className=e.target.className.replace('input_blue','')
      
      // e.target.className.replace(`${productionClasses["input_red"]}`,null)
      // e.target.className.replace(`${productionClasses["input_black"]}`,null)
      header.map((h)=>{
        if(inputHeader===h.value){
          //필수항목이고 빈칸이면
          if(!h.readonly&&h.required&&e.target.value===''){
            // e.target.className= e.target.className?e.target.className+`${productionClasses[" input_red"]}`:`${productionClasses["input_red"]}`
            e.target.className= e.target.className?e.target.className+' input_red':'input_red'
          }else if(!h.readonly){
            // e.target.className= e.target.className?e.target.className+`${productionClasses[" input_black"]}`:`${productionClasses["input_black"]}`
            e.target.className= e.target.className?e.target.className+' input_black':'input_black'
          }
        }
      })
    }

    //새로 추가된 행이면 라인코드 입력 가능
    if(item[idx].state==='add'){
      e.target.readOnly=false;
    }
  };
  const editHandler = (e,tableType,colInfo, coordinate) => {
    if(item[coordinate.row].state==='add')return;
    const copyItem=JSON.parse(JSON.stringify(item))
    copyItem[coordinate.row].state='edit';
    setItem([...copyItem])
    
  };
  const addRowEmitHandler=()=>{
    //!!!!!!!!!!!companyId 1로 고정!!!!!!!!!!!!!!!!
    setItem([...item,{state:'add',companyId:1}])
    
  }
  const deleteHandler = () => {
    //체크된 input 요소 가져오기
    const checkedEl = document.querySelectorAll('input[type="checkbox"]:checked')
    const checked = Array.from(      checkedEl);
    let deleteKey = [];
    let idxArr=[];
    //input row idx 담은 배열 만들기
    for (let input of checked) {
      let row = input.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0];
      idxArr.push(parseInt(row))
      deleteKey.push(item[row].lineCode);
    }
    
    setDeleteKey([...deleteKey]);
    setDeleteIdx([...idxArr]);
    checkedEl.forEach(el => {
      el.checked=false
    });
  };
  const saveHandler = () => {
    //====================테이블의 모든 input 가져오기====================
    const inputArr = [...document.querySelectorAll('[id*="grid"]')];
    let gridData = [];
    const param={add:[],edit:[],delete:[]};

    //input value
    inputArr.forEach((el) => {
      //id(grid번호_행번호_header) 에서 행번호 찾기
      let row = Number(el.id.match(/(?<=grid\d+_)\d+(?=_)/g)[0]);
      //id(grid번호_행번호_header) 에서 header 찾기
      let header = el.id.match(/(?<=\w_)[a-zA-Z_]+/g)[0];

      gridData[row] = {...item[row], ...gridData[row], [header]: el.value };
    });

    //================= 필수 입력 컬럼에 값 다 있는지 확인===============
    let alertHeader;
 

    for (let i = 0; i < gridData.length; i++) {
   
      //라인코드나 라인명 둘 중 하나만 입력됐을때
      if (!!gridData[i].lineCode !== !!gridData[i].line) {
        if (!gridData[i].lineCode) {
          alertHeader = `${i}번째 행 라인코드를 입력해주세요`;
          return;
        }
        if (!gridData[i].line) {
          alertHeader = `${i}번째 행 라인명을 입력해주세요`;
          return;
        }
        //라인코드와 라인명 둘다 있고 state가 add나 edit일때
      } else if((gridData[i].lineCode&&gridData[i].line)&&(gridData[i].state==='add'||gridData[i].state==='edit')) {
        if(gridData[i].state==='add'){
          param.add=[...param.add,gridData[i]]
        }
        if(gridData[i].state==='edit'){
          param.edit=[...param.edit,gridData[i]]
        }
       
      }
    }
    if (deleteKey){
      param.delete=[...param.delete,...deleteKey]
    }

    //add,edit,delete 모두 없을때
    if (param.add.length===0&&param.delete.length&&param.edit.length) {
      alertHeader = "변경된 데이터가 없습니다.";
    }

    if (alertHeader) {
      alert(alertHeader);
    } else {
      console.log('param',param)
      postAxios("production/line/add",param,print,errorHandler);
    }

    function print(data) {
      alert(`변경사항이 저장되었습니다.`)
      window.location.reload();
    }
    function errorHandler(error){
      console.log(error)
      let duplicateKey=error.response.data.duplicateKey
      alert(`"${duplicateKey}"는 이미 존재하는 라인코드입니다.`)
    }
};


  return (
    <div className={lineStyle['container-line_section']}>
      {/* <p className={productionClasses["sub-menu-name"]}>생산라인관리</p> */}
      <div className={lineStyle.grid01}>
        <Table headers={header}>
          <AddTd
            isBtn={true}
            items={item}
            selectRowHandler={selectHandler}
            onGridTrigger={null}
            emitItem={setItem}
            deleteItem={deleteIdx}
            editHandler={editHandler}
            addRowEmit={addRowEmitHandler}
          ></AddTd>
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
  );
}
