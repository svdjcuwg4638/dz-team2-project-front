import React from 'react'
import Table from "component/inbound/table/Table";
import AddTd from "component/inbound/table/AddTableData";
import ListTd from "component/layout/Table/ListTableData";
import inboundClasses from "style/inbound/inbound.module.css";


function List() {
    const grid01_headers = [
        { text: "선택", value: "select", width: "9%" },
        { text: "문서번호", value: "boundno", width: "9%" },
        { text: "유형", value: "type", width: "9%" },
        {
          text: "거래처",
          value: "partner",
          width: "9%",
          helper: true,
          gridTrigger: true,
        },
        { text: "입고예정일", value: "itemName", width: "9%", helper: true },
        { text: "✔️", value: "validation", width: "9%" },
      ];
      const grid02_headers = [
        { text: "품목코드", value: "select", width: "5%" },
        { text: "품목명", value: "index", width: "5%" },
        { text: "수량", value: "itemName", width: "15%" },
        { text: "입고예정일", value: "itemCode", width: "8%", helper: true },
        { text: "비고", value: "description", width: "20%" },
      ];
    
      return (
        <>
          <div className={inboundClasses.wrap}>
            <p className={inboundClasses["sub-menu-name"]}>입고현황</p>
            <div className={inboundClasses.grid01}>
              <Table headers={grid01_headers}>
                <AddTd></AddTd>
              </Table>
            </div>
            <button>삭제</button>
            <button>저장</button>
          </div>
        </>
      );
}

export default List