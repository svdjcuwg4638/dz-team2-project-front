import ListTd from "component/layout/Table/ListTableData";
import { putAxios } from "function/axiosFuction";
import { useEffect } from "react";

import helperStyle from "style/common/helperModal.module.css";

//======================모달 back =========================
function HelperBackdrop({ offModal }) {
  const clickHandler = (e) => {
    e.preventDefault();
    offModal();
  };
  return (
    <div onClick={clickHandler} className={helperStyle["back-drop"]}></div>
  );
}

function HelperOverlay({ modalState }) {
  useEffect(() => {
    console.log(modalState);
  });

  const submitHandler=()=>{
    const {grid01Data,grid02Data,deleteData}={...modalState.data}
    
    //product, product_detail 테이블 수정
    const param={}
    param.production=grid01Data.find((el)=>{
      return el.state==='edit'
    })
    //product_relation 테이블 수정
    let componentArr=[]
    grid02Data.forEach((data)=>{
      data.forEach((el)=>{if(el.state==='edit')componentArr.push(el)})
    })
    param.component=componentArr

    //product 테이블 delete
    param.productDelete=deleteData

   /

    console.log(param)
  }

  return (
    <div className={helperStyle.overlay}>
      <h1>{modalState.headLine}</h1>
      <div>{modalState.title}</div>
      <div>
        {modalState.table.map((table, idx) => (
          <div>
          <h4>{table.name}</h4>
          <table key={idx} items={table.tableItem}>
            <thead>
              <tr>
                {table.header.map((el, headerCol) => (
                  <td key={headerCol}>{el.text}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.tableItem.map((item, itemCol) => {
                return (
                  <tr>
                    {table.header.map((el)=>{
                      return <td>{item[el.value]}</td>
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        ))}
      </div>

      <button>취소</button>
      <button onClick={submitHandler}>확인</button>
    </div>
  );
}

//======================모달 root=========================
export default function HelperModal({ offModal, modalState, onSelectCode }) {
  return (
    <>
      <div className={helperStyle["helper-modal"]}>
        <HelperBackdrop offModal={offModal} />
        <HelperOverlay offModal={offModal} modalState={modalState} />
      </div>
    </>
  );
}
