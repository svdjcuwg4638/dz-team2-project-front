import React, { useEffect, useState } from "react";
import MasterTable from "./MasterTable";
import SubTable from "./SubTable";
import api from "redux/api";
import inboundClasses from "../../../style/inbound/inbound.module.css";
import Table from "../table/Table";
import { useDispatch, useSelector } from "react-redux";
import { unitPriceAction } from "redux/actions/management/unitPriceAction";

const styles = {
  wrapBtn: {
    display: "flex",
    justifyContent: "end",
    marginTop: "10px",
  },
  btnDelete: {
    backgroundColor: "white",
    color: "var(--red-color)",
    border: "1px solid var(--red-color)",
    boxShadow: "1px 1px 2px 1px grey",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    width: "50px",
    height: "30px",
    margin: "5px",
  },
  btnSave: {
    backgroundColor: "var(--main-color)",
    color: "white",
    border: "none",
    boxShadow: "1px 1px 2px 1px grey",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    width: "50px",
    height: "30px",
    margin: "5px",
  },
  btnSaveDelete: {
    paddingTop: "2px",
  },
};

const InBoundStart = () => {
  const dispatch = useDispatch();
  const { unitPriceAll } = useSelector((state) => state.unitPrice);
  useEffect(() => {
    dispatch(unitPriceAction.getCurrentUnitPriceAll());
  }, []);

  useEffect(() => {
    console.log("전체", unitPriceAll);
  }, [unitPriceAll]);
  //#region state관리
  const [masterLength, setMasterLength] = useState(1);
  const [boundId, setBoundId] = useState(null);
  const [boundNo, setBoundNo] = useState(null);
  const [incrementedBoundNo, setIncrementedBoundNo] = useState(null);
  const [masterFocus, setMaseterFocus] = useState(boundId);

  const [masterFlag, setMasterFlag] = useState(false);
  const [subFlag, setSubFlag] = useState(false);
  //#endregion

  //#region 체크박스 삭제로직
  const [checkedBoundIds, setCheckedBoundIds] = useState([]); //master에 체크된애들 모으는 배열
  const [deletedBoundIds, setDeletedBoundIds] = useState([]); //select된 애들 map함수 돌리기전에 필요한 조건
  const [checkedSubBoundIds, setCheckedSubBoundIds] = useState([]); // detail 체크된애들 모으는 배열
  const [deletedIndex, setDeletedIndex] = useState([]); //detail 체크에서 삭제된애들 map함수 위에꺼랑 같이 조건으로 돌림

  //마스터는 deltedBoundIds로 필터하고 디테일은 deletedBound와 deletedIndex 이 두놈에 포함되지 않는놈들로 출력해야함

  const handleDeleteCheckedRows = () => {
    //여기서 체크된애들 조건배열에 추가하고 초기화함
    setDeletedBoundIds((prev) => [...prev, ...checkedBoundIds]);
    setCheckedBoundIds([]); // 초기화
    setDeletedIndex((prev) => [...prev, ...checkedSubBoundIds]);
    // 필요하다면, 체크된 상태 초기화
    setCheckedSubBoundIds([]);
  };

  useEffect(() => {
    console.log("체크서브 바운드", checkedSubBoundIds);
  }, [checkedSubBoundIds]);

  useEffect(() => {
    console.log("삭제 바운드", deletedBoundIds);
  }, [deletedBoundIds]);
  //#endregion

  const handleSave = () => {
    setMasterFlag(true);
  };
  //#region 헤더정의
  const grid01_headers = [
    { text: "선택", value: "select", width: "2.2%" },
    { text: "문서번호", value: "boundno", width: "2.2%" },
    { text: "유형", value: "type", width: "2.5%" },
    {
      text: "거래처",
      value: "partner",
      width: "2.5%",
      helper: true,
      gridTrigger: true,
    },
    { text: "입고예정일", value: "itemName", width: "2.5%",},
  ];
  const grid02_headers = [
    { text: "선택", value: "select", width: "12.5%" },
    { text: "품목코드", value: "item_code", width: "12.5%" ,helper: true },
    { text: "품목명", value: "item_name", width: "12.5%" },
    { text: "단가", value: "unit_price", width: "12.5%" },
    // { text: "재고", value: "stock", width: "4%" },
    { text: "수량", value: "amount", width: "12.5%" },
    { text: "총액", value: "tot_amount", width: "12.5%",  },
    { text: "입고예정일", value: "detail_date", width: "12.5%" },
    { text: "비고", value: "description", width: "12.5%" },
  ];
  //#endregion

  //#region maxbound/useEffect
  useEffect(() => {
    const fetchBoundId = async () => {
      try {
        const response = await api.get("/inbound/getid");
        setBoundId(response.data.data + 1);
      } catch (error) {
        console.error("Error fetching boundId:", error);
      }
    };

    function getTodayPrefix() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `A${year}${month}${day}`;
    }

    const fetchBoundNo = async () => {
      try {
        const date = getTodayPrefix();
        console.log(date);
        const response = await api.get(`/inbound/getboundno?prefix=${date}`);
        setBoundNo(response.data.data);
        setIncrementedBoundNo(incrementBoundNo(response.data.data));
      } catch (error) {
        console.error("Error:", error);
        const defaultBoundNo = `${getTodayPrefix()}0001`;
        setBoundNo(defaultBoundNo);
        setIncrementedBoundNo(incrementBoundNo(defaultBoundNo));
      }
    };
    fetchBoundId();
    fetchBoundNo();
  }, []);

  useEffect(() => {
    setMaseterFocus(boundId);
  }, [boundId]);

  useEffect(() => {
    console.log("DB boundno", boundNo);
  }, [boundNo]);
  useEffect(() => {
    console.log("증가된boundno", incrementedBoundNo);
  }, [incrementedBoundNo]);

  const incrementBoundNo = (currentNo) => {
    const prefix = currentNo.substring(0, currentNo.length - 4); // 'A20230924' 부분만 추출
    const numPart = parseInt(currentNo.slice(-4)); // 마지막 4자리 숫자 부분만 추출해서 정수로 변환
    const incrementedNum = numPart + 1; // 숫자 1 증가
    return `${prefix}${String(incrementedNum).padStart(4, "0")}`; // 증가시킨 숫자를 다시 4자리 문자열로 변환 후 원래 문자열에 붙임
  };

  const handleIncrementBoundNo = (currentBoundNo) => {
    const incremented = incrementBoundNo(currentBoundNo);
    return incremented;
  };
  //#endregion

  return (
    <div style={{padding:'0px'}}>  
    <div className={inboundClasses.wrap}>
      {/* <p className={inboundClasses["sub-menu-name"]}>입고예정</p> */}
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
        //
        incrementedBoundNo={incrementedBoundNo}
        incrementBoundNo={incrementBoundNo}
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
      <div style={styles.wrapBtn}>
        <button style={styles.btnDelete} onClick={handleDeleteCheckedRows}>삭제</button>
        <button style={styles.btnSave} onClick={() => handleSave()}>저장</button>
      </div>
    </div>
    </div>
  );
};

export default InBoundStart;
