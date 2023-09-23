import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inboundAction } from 'redux/actions/inbound/inboundAction';
import Table from '../table/Table';
import inboundClasses from '../../../style/inbound/inbound.module.css'
import MasterTable from './MasterTable';
import SubTable from './SubTable';


function InboundEnd() {

const dispatch = useDispatch();

const {inboundAll, inboundDetailAll, loading} = useSelector((state) => state.inbound);

const [searchData, setSearchData] = useState(inboundAll.data);
const [searchDetailData, setSearchDetailData] = useState(inboundDetailAll.data);
const [selectedBoundId, setSelectedBoundId] = useState(null);
const filteredDetailData = selectedBoundId ? searchDetailData.filter(detail => detail.bound_id === selectedBoundId) : [];

const grid01_headers = [
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
];
  const grid02_headers = [
    { text: "품목코드", value: "item_code", width: "6%" },
    { text: "품목명", value: "item_name", width: "6%" },
    { text: "수량", value: "amount", width: "4%" },
    { text: "단가", value: "unit_price_id", width: "4%" },
    { text: "총액", value: "tot_amount", width: "6%" },
    { text: "재고", value: "inventory_id", width: "4%", helper: true },
    { text: "입고예정일", value: "detail_date", width: "10%" },
    { text: "비고", value: "description", width: "10%" },
  ];
useEffect(()=>{
    dispatch(inboundAction.getInboundAll());
},[])

useEffect(()=>{
    setSearchData(inboundAll.data);
    setSearchDetailData(inboundDetailAll.data);
    console.log('inbound',inboundAll.data);
    console.log('inbounddetail',inboundDetailAll.data)
},[inboundAll, inboundDetailAll])
  return (
    <div className={inboundClasses.wrap}>
        <p className={inboundClasses["sub-menu-name"]}>입고현황</p>
        <Table headers={grid01_headers}></Table>
            <MasterTable
            searchData={searchData}
            onRowClick={boundId => setSelectedBoundId(boundId)}
            />
        <Table headers={grid02_headers}></Table>
            <SubTable
            searchDetailData={filteredDetailData}
            />
    </div>
  )
}


export default InboundEnd