import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inboundAction } from "redux/actions/inbound/inboundAction";
import Table from "../table/Table";
import inboundClasses from "../../../style/inbound/inbound.module.css";
import MasterTable from "./MasterTable";
import SubTable from "./SubTable";
import SearchHelper from "./SearchHelper";
import { partnerAction } from "redux/actions/management/partnerAction";
import { itemAction } from "redux/actions/management/itemAction";
import api from "redux/api";
import '../../../style/inbound/overlay.css'

const styles = {
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

      container1_sons: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'flex-start', 

        width: '120px',
        height: '80px',
        position: 'relative'
      },

      container1_sons1: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'flex-start', 

        width: '280px',
        height: '80px'
      },

      container1_sons2: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'flex-start', 

        width: '80px',
        height: '80px',
        position: 'relative'
      },

      container1_sons3: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'flex-start', 

        width: '125px',
        height: '80px'
      },


      container1_last_child_bottom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",

        width: '100%',
        height: '40px'
      },
      container1_sons_upper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',

        margin: '0',

        width: '100%',
        height: '20px',
        
      },

      
   };


function InboundEnd() {
  const dispatch = useDispatch();

  const { inboundAll, inboundDetailAll, loading } = useSelector(
    (state) => state.inbound
  );
  const { partnerAll } = useSelector((state) => state.partner);
  const { itemAll } = useSelector((state) => state.item);

  const [searchData, setSearchData] = useState(inboundAll.data);
  const [searchDetailData, setSearchDetailData] = useState([]);
  const [selectedBoundId, setSelectedBoundId] = useState(null);
  const filteredDetailData = selectedBoundId
    ? searchDetailData.filter((detail) => detail.bound_id === selectedBoundId)
    : [];

  // #region
  const [selectedHelperItem, setSelectedHelperItem] = useState(null);
  const [HelperScreenState, sedivelperScreenState] = useState(false);
  const selectedPartnerFn = () => {
    sedivelperScreenState(false);
  };
  const handleInputChange = (section, field, value) => {
    setSearchSectionData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleBoundTypeChange = (event) => {
    const selectedValue = event.target.value;

    handleInputChange("master", "bound_category", selectedValue);
  };

  const [searchSectionData, setSearchSectionData] = useState({
    master: {
      bound_no: "",
      bound_category: "",
      partner_code: "",
      bound_start_date: "",
      bound_end_date: "",
    },
    detail: {
      item_code: "",
      item_name: "",
      detail_start_date: "",
      detail_end_date: "",
    },
  });
  useEffect(() => {
    console.log("검색섹션데이터", searchSectionData);
  }, [searchSectionData]);

  const item = {
    name: "거래처",
    guide: true,
    type_all: "partnerAll",
    code_column: "partner_code",
    name_column: "partner_name",
    dataAll: { partnerAll },
    trigger_type: "input",
    input_type: "partner",
  };

  const item2 = {
    name: "품목",
    guide: true,
    type_all: "itemAll",
    code_column: "item_code",
    name_column: "item_name",
    dataAll: { itemAll },
    trigger_type: "input",
    input_type: "item",
  };

  const grid01_headers = [
    { text: "문서번호", value: "boundno", width: "9%" },
    { text: "유형", value: "type", width: "9%" },
    {
      text: "거래처",
      value: "partner",
      width: "9%",
      gridTrigger: true,
    },
    { text: "입고일", value: "itemName", width: "9%" },
  ];
  const grid02_headers = [
    { text: "품목코드", value: "item_code", width: "8%" },
    { text: "품목명", value: "item_name", width: "8%" },
    { text: "수량", value: "amount", width: "8%" },
    { text: "단가", value: "unit_price_id", width: "8%" },
    { text: "총액", value: "tot_amount", width: "8%" },
    { text: "창고", value: "storage_code", width: "8%" },
    { text: "장소", value: "location_code", width: "8%" },
    { text: "품목입고일", value: "detail_date", width: "20%" },
    { text: "비고", value: "description", width: "24%" },
  ];
  const handleMasterSearch = async () => {
    try {
      const response = await api.post(
        "/inbound/searchMaster",
        searchSectionData.master
      );
      setSearchData(response.data.data);
      setSelectedBoundId(null); // 추가
    } catch (error) {
      console.error("Error sending master data:", error);
    }
  };

  const handleDetailSearch = async () => {
    try {
      const response = await api.post(
        "/inbound/searchDetail",
        searchSectionData.detail
      );
      setSearchData(response.data.data);
      setSelectedBoundId(null); // 추가
    } catch (error) {
      console.error("Error sending master data:", error);
    }
  };

  useEffect(() => {
    dispatch(inboundAction.getInboundAll());
    dispatch(partnerAction.getPartnerAll());
    dispatch(itemAction.getItemAll());
  }, []);

  useEffect(() => {
    const filteredData =
      inboundAll.data?.filter((data) => data.bound_state === "end") || [];
    setSearchData(filteredData);
    setSearchDetailData(inboundDetailAll.data || []);
    console.log("inbound", inboundAll.data);
    console.log("inbounddetail", inboundDetailAll.data);
  }, [inboundAll, inboundDetailAll]);

  return (
   <div style={{padding : '0px'}}>
    <div className={inboundClasses.wrap}>
      {/* <p className={inboundClasses["sub-menu-name"]}>입고현황</p> */}

      <div style={{border: '1px solid #E9EEF6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', backgroundColor:'white', boxShadow:'1px 1px 4px 0px rgba(0, 0, 0, 0.25)',}}>
        <div className="container1" style={{  display: 'flex', width: '55%', justifyContent: "space-around", alignItems: 'center' }}>
          <div style={styles.container1_sons3}>
            <p style={styles.container1_sons_upper}>문서번호</p>
            <div style={{height: '40px', display: 'flex', alignItems: 'center',}}>
              <input style={{width: '130px', height: '25px' ,border : '1px solid black'}}
                type="text"
                value={searchSectionData.master.bound_no}
                onChange={(e) =>
                  handleInputChange("master", "bound_no", e.target.value)
              }
              />
            </div>
          </div>
          <div style={styles.container1_sons}>
            <p style={styles.container1_sons_upper}>유형</p>
            <div style={{height: '40px', display: 'flex', alignItems: 'center'}}>
              <select style={{ height: '25px'}} onChange={handleBoundTypeChange}>
                <option value=""></option>
                <option value="구매">구매</option>
                <option value="재작업입고">재작업입고</option>
                <option value="유상사급입고">유상사급입고</option>
                <option value="기타입고">기타입고</option>
              </select>
            </div>
          </div>
          <div style={styles.container1_sons}>
            <p style={styles.container1_sons_upper}>거래처명</p>
            <div style={styles.container1_last_child_bottom}>
              <input type="text" value={searchSectionData.master.partner_code} style={{width: '120px', height: '25PX', border : '1px solid black' }}/>
              <button
              style={{border: '0px', color : '#ffffff',  background: '#5390f0', borderRadius: '10px', padding: '0px', width: '30px', height: '30px', textAlign:'center', marginLeft: '5px', position: 'absolute', right: '-39px'}}
                onClick={(e) => {
                  setSelectedHelperItem(item);
                  sedivelperScreenState(!HelperScreenState);
                }}
              >
                ?
              </button>
            </div>
          </div>
          <div style={styles.container1_sons1}>
            <p style={styles.container1_sons_upper}>&nbsp;&nbsp;&nbsp;입고일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;입고일</p>
            <div style={styles.container1_last_child_bottom}>
              <input
              type="date"
              value={searchSectionData.detail.detail_start_date}
              onChange={(e) =>
                handleInputChange("detail", "detail_start_date", e.target.value)
              }
              />
              <input
              type="date"
              value={searchSectionData.detail.detail_end_date}
              onChange={(e) =>
                handleInputChange("detail", "detail_end_date", e.target.value)
              }
              />
              <button style={styles.btnSave} onClick={handleMasterSearch}>조회</button>
            </div>
          </div>
        </div>
        <div className="container2" style={{ display: 'flex', width: '45%', justifyContent:"space-around", alignItems: 'center'}}>
          <div style={styles.container1_sons2}>
            <p style={styles.container1_sons_upper}>품목명</p>
            <div style={styles.container1_last_child_bottom}>
              <input style={{width: '120px', height: '25px', border : '1px solid black'}}
              type="text" value={searchSectionData.detail.item_name} />
              <button
              style={{border: '0px', color : '#ffffff',  background: '#5390f0', borderRadius: '10px', padding: '0px', width: '30px', height: '30px', textAlign:'center', marginLeft: '5px', position: 'absolute', right: '-60px'}}
                onClick={(e) => {
                  setSelectedHelperItem(item2);
                  sedivelperScreenState(!HelperScreenState);
                }}
              >
                ?
              </button>
            </div>
          </div>
          <div style={styles.container1_sons1}>
            <p style={styles.container1_sons_upper}>&nbsp;&nbsp;품목입고일&nbsp; &nbsp;~ &nbsp;&nbsp;품목입고일</p>
            <div style={styles.container1_last_child_bottom}>
              <input
              type="date"
              value={searchSectionData.detail.detail_start_date}
              onChange={(e) =>
                handleInputChange("detail", "detail_start_date", e.target.value)
              }
              />
              <input
              type="date"
              value={searchSectionData.detail.detail_end_date}
              onChange={(e) =>
                handleInputChange("detail", "detail_end_date", e.target.value)
              }
              />
              <button style={styles.btnSave} onClick={handleDetailSearch}>조회</button>
            </div>
          </div>
        </div>
      </div>

      <div>&nbsp;</div>

      <Table headers={grid01_headers}></Table>
      <div
        id="mastertable-container"
        style={{
          maxHeight: "200px", // 원하는 높이로 설정
          overflowY: "auto",  // 수직 스크롤만 필요한 경우 설정
          border: "1px solid #ccc", // 테이블 주위에 경계선을 추가할 수 있습니다.
        }}
      >
      <MasterTable
        searchData={searchData}
        onRowClick={(boundId) => setSelectedBoundId(boundId)}
      />
      </div>
      <Table headers={grid02_headers}></Table>
      <div
        id="subtable-container"
        style={{
          maxHeight: "200px", // 원하는 높이로 설정
          overflowY: "auto",  // 수직 스크롤만 필요한 경우 설정
          border: "1px solid #ccc", // 테이블 주위에 경계선을 추가할 수 있습니다.
        }}
      >
      <SubTable filteredDetailData={filteredDetailData} />
      </div>

      {HelperScreenState && (
      <div>
        <div className="subRowBk" onClick={()=>sedivelperScreenState(!HelperScreenState)}></div>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 10px rgba(0,0,0,0.8)",
            zIndex: 10,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <SearchHelper
            handleInputChange={handleInputChange}
            menu={selectedHelperItem}
            searchPartner={selectedPartnerFn}
          />
        </div>
      </div>
      )}
    </div>
    </div>
  );
}

export default InboundEnd;
