import React, { useEffect, useState } from 'react'
import MasterTable from './MasterTable';
import SubTable from './SubTable';
import api from 'redux/api';
import inboundClasses from '../../../style/inbound/inbound.module.css'
import Table from '../start/Table'

function OutboundStart() {
//#region state관리
const [masterLength, setMasterLength] = useState(1);
const [boundId, setBoundId] = useState(null);
const [masterFocus, setMaseterFocus] = useState(boundId);

const [masterFlag, setMasterFlag] = useState(false);
const [subFlag, setSubFlag] = useState(false);
//#endregion

//#region 체크박스 삭제로직
const [checkedBoundIds, setCheckedBoundIds] = useState([]); //master에 체크된애들 모으는 배열
const [deletedBoundIds, setDeletedBoundIds] =  useState([]); //select된 애들 map함수 돌리기전에 필요한 조건
const [checkedSubBoundIds, setCheckedSubBoundIds] = useState([]);// detail 체크된애들 모으는 배열
const [deletedIndex, setDeletedIndex] = useState([]); //detail 체크에서 삭제된애들 map함수 위에꺼랑 같이 조건으로 돌림
//#endregion
const grid01_headers = [
    { text: "선택", value: "select", width: "3%" },
    { text: "문서번호", value: "boundno", width: "9%" },
    { text: "유형", value: "type", width: "9%" },
    {
    text: "거래처",
    value: "partner",
    width: "9%",
    helper: true,
    gridTrigger: true,
    },
    { text: "출고예정일", value: "itemName", width: "9%", helper: true },
];
const grid02_headers = [
    { text: "선택", value: "select", width: "3%" },
    { text: "품목코드", value: "item_code", width: "6%" },
    { text: "품목명", value: "item_name", width: "6%" },
    { text: "수량", value: "amount", width: "4%" },
    { text: "단가", value: "unit_price_id", width: "4%" },
    { text: "총액", value: "tot_amount", width: "6%" },
    { text: "재고", value: "inventory_id", width: "4%", helper: true },
    { text: "출고예정일", value: "detail_date", width: "10%" },
    { text: "비고", value: "description", width: "10%" },
 ];

const handleDeleteCheckedRows = () => { //여기서 체크된애들 조건배열에 추가하고 초기화함
  setDeletedBoundIds(prev => [...prev, ...checkedBoundIds]);
  setCheckedBoundIds([]);  // 초기화
  setDeletedIndex(prev => [...prev, ...checkedSubBoundIds]);
  // 필요하다면, 체크된 상태 초기화
  setCheckedSubBoundIds([]);
};

useEffect(()=> {
  console.log('체크 바운드',checkedBoundIds)
},[checkedBoundIds])

useEffect(()=>{
  console.log('삭제 바운드',deletedBoundIds)
},[deletedBoundIds])
//#endregion

const handleSave= () => {
    setMasterFlag(true);
  }

useEffect(() => {
  const fetchBoundId = async () => {
    try {
      const response = await api.get("/outbound/getid");
      setBoundId((response.data.data)+1);
    } catch (error) {
      console.error("Error fetching boundId:", error);
    }
  };

  fetchBoundId();
}, []);

useEffect(() => {
  setMaseterFocus(boundId)
}, [boundId]);

  return (
    <div className={inboundClasses.wrap}>
      <p className={inboundClasses["sub-menu-name"]}>출고예정</p>
      <Table headers={grid01_headers}></Table>
        <MasterTable
          masterLength={masterLength}
          boundId={boundId}
          setMasterLength={setMasterLength}
          setMaseterFocus={setMaseterFocus}
          //
          masterFlag={masterFlag}
          setSubFlag={setSubFlag}
          //
          setCheckedBoundIds={setCheckedBoundIds}
          deletedBoundIds={deletedBoundIds}
          setDeletedBoundIds={setDeletedBoundIds}
        />
      <Table headers={grid02_headers}></Table>
        <SubTable
          masterLength={masterLength}
          boundId={boundId}
          masterFocus={masterFocus}
          //
          subFlag={subFlag}
          setSubFlag={setSubFlag}
          setMasterFlag={setMasterFlag}
          //
          deletedBoundIds={deletedBoundIds}
          checkedSubBoundIds={checkedSubBoundIds}
          setCheckedSubBoundIds={setCheckedSubBoundIds}
          deletedIndex={deletedIndex}
        />
      <button onClick={handleDeleteCheckedRows}>삭제</button>
      <button onClick={() => handleSave()}>저장</button>
      
    </div>
  )
}

export default OutboundStart