import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inboundAction } from "redux/actions/inbound/inboundAction";
import Table from "../start/table/Table";
import inboundClasses from "../../../style/inbound/inbound.module.css";
import MasterTable from "./MasterTable";
import SubTable from "./SubTable";
import SearchHelper from "./SearchHelper";
import { partnerAction } from "redux/actions/management/partnerAction";
import { itemAction } from "redux/actions/management/itemAction";
import api from "redux/api";
import { outboundAction } from "redux/actions/outbound/outboundAction";

function OutboundEnd() {
  const dispatch = useDispatch();

  const { outboundAll, outboundDetailAll, loading } = useSelector(
    (state) => state.outbound
  );
  const { partnerAll } = useSelector((state) => state.partner);
  const { itemAll } = useSelector((state) => state.item);

  const [searchData, setSearchData] = useState(outboundAll.data);
  const [searchDetailData, setSearchDetailData] = useState(
    outboundDetailAll.data
  );
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
    { text: "출고일", value: "itemName", width: "9%" },
  ];
  const grid02_headers = [
    { text: "품목코드", value: "item_code", width: "8%" },
    { text: "품목명", value: "item_name", width: "8%" },
    { text: "수량", value: "amount", width: "8%" },
    { text: "단가", value: "unit_price_id", width: "8%" },
    { text: "총액", value: "tot_amount", width: "8%" },
    { text: "창고", value: "storage_code", width: "8%" },
    { text: "장소", value: "location_code", width: "8%" },
    { text: "품목출고일", value: "detail_date", width: "20%" },
    { text: "비고", value: "description", width: "24%" },
  ];
  const handleMasterSearch = async () => {
    try {
      const response = await api.post(
        "/outbound/searchMaster",
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
    dispatch(outboundAction.getOutboundAll());
    dispatch(partnerAction.getPartnerAll());
    dispatch(itemAction.getItemAll());
  }, []);

  useEffect(() => {
    const filteredData = outboundAll?.data?.filter(
      (data) => data.bound_state === "end"
    );
    setSearchData(filteredData);
    setSearchDetailData(outboundDetailAll.data);
    console.log("outbound", outboundAll.data);
    console.log("outboundDetail", outboundDetailAll.data);
  }, [outboundAll, outboundDetailAll]);

  return (
    <div className={inboundClasses.wrap}>
      <p className={inboundClasses["sub-menu-name"]}>출고현황</p>
      <div className="searchsection" style={{ display: "flex" }}>
        <div>문서번호</div>
        <div>
          <input
            type="text"
            value={searchSectionData.master.bound_no}
            onChange={(e) =>
              handleInputChange("master", "bound_no", e.target.value)
            }
          />
        </div>
        <div>유형</div>
        <div>
          <select onChange={handleBoundTypeChange}>
          <option value="" disabled selected hidden></option>
            <option value="판매">판매</option>  
            <option value="유상사급출고">유상사급출고</option>
            <option value="기타출고">기타출고</option>
          </select>
        </div>
        <div>거래처명</div>
        <div>
          <input type="text" value={searchSectionData.master.partner_code} />
        </div>
        <button
          onClick={(e) => {
            setSelectedHelperItem(item);
            sedivelperScreenState(!HelperScreenState);
          }}
        >
          ?
        </button>
        <div>입고일</div>
        <div>
          <input
            type="date"
            value={searchSectionData.master.bound_start_date}
            onChange={(e) =>
              handleInputChange("master", "bound_start_date", e.target.value)
            }
          />
        </div>
        <div>~</div>
        <div>
          <input
            type="date"
            value={searchSectionData.master.bound_end_date}
            onChange={(e) =>
              handleInputChange("master", "bound_end_date", e.target.value)
            }
          />
        </div>
        <div>
          <button onClick={handleMasterSearch}>Master 검색</button>
        </div>
        <h3>/</h3>
        <div>품목명</div>
        <div>
          <input type="text" value={searchSectionData.detail.item_name} />
        </div>
        <button
          onClick={(e) => {
            setSelectedHelperItem(item2);
            sedivelperScreenState(!HelperScreenState);
          }}
        >
          ?
        </button>
        <div>품목입고일</div>
        <div>
          <input
            type="date"
            value={searchSectionData.detail.detail_start_date}
            onChange={(e) =>
              handleInputChange("detail", "detail_start_date", e.target.value)
            }
          />
        </div>
        <div>~</div>
        <div>
          <input
            type="date"
            value={searchSectionData.detail.detail_end_date}
            onChange={(e) =>
              handleInputChange("detail", "detail_end_date", e.target.value)
            }
          />
        </div>
        <div>
          <button onClick={handleDetailSearch}>Detail 검색</button>
        </div>
      </div>
      <Table headers={grid01_headers}></Table>
      <MasterTable
        searchData={searchData}
        onRowClick={(boundId) => setSelectedBoundId(boundId)}
      />
      <Table headers={grid02_headers}></Table>
      <SubTable filteredDetailData={filteredDetailData} />

      {HelperScreenState && (
        <div
          style={{
            position: "absolute",
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
      )}
    </div>
  );
}

export default OutboundEnd;
