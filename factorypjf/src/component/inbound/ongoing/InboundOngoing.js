import React, { useEffect, useState } from "react";
import inboundClasses from "../../../style/inbound/inbound.module.css";
import Table from "../table/Table";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { inboundAction } from "redux/actions/inbound/inboundAction";
import DetailModal from "./Modal"; // 수정된 부분
import { storageAction } from "redux/actions/management/storageAction";
import api from "redux/api";

const rowHoverStyle = {
  backgroundColor: "#f0f0f0", // 원하는 배경색으로 변경하세요.
};

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
    width: "62px",
    height: "30px",
    margin: "5px",
  },
  btnSave1: {
    backgroundColor: "var(--main-color)",
    color: "white",
    border: "none",
    boxShadow: "1px 1px 2px 1px grey",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    width: "90px",
    height: "30px",
    margin: "5px",
  },
  btnSaveDelete: {
    paddingTop: "2px",
  },
};

function InboundOngoing() {

  const [hovered, setHovered] = useState(false); // 마우스 호버 상태를 저장하기 위한 상태 변수

  // 마우스가 행 위로 올라갔을 때 호출되는 이벤트 핸들러
  const handleMouseEnter = (boundId) => {
    setHovered(boundId);
  };

  // 마우스가 행 위에서 벗어났을 때 호출되는 이벤트 핸들러
  const handleMouseLeave = () => {
    setHovered(null);
  };

  const grid01_headers = [
    { text: "문서번호", value: "bound_no", width: "20%" },
    { text: "유형", value: "bound_category", width: "20%" },
    { text: "거래처", value: "partner_code", width: "20%" },
    { text: "입고예정일", value: "bound_date", width: "20%" },
    { text: "창고/장소", value: "", width: "20%", helper: true },
  ];
  
  const dispatch = useDispatch();

  const { inboundAll, inboundDetailAll, loading } = useSelector(
    (state) => state.inbound
  );
  const { storageAll, locationAll } = useSelector((state) => state.storage);

  const [searchData, setSearchData] = useState([]);
  const matchingMasters =
    searchData && searchData.length
      ? searchData.filter((master) => master.bound_state === "ongoing")
      : [];
  const [searchDetailData, setSearchDetailData] = useState(
    inboundDetailAll.data
  );
  const [updatedDetails, setUpdatedDetails] = useState({});
  useEffect(() => {
    console.log(updatedDetails);
  }, [updatedDetails]);

  const [selectedBoundId, setSelectedBoundId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (boundId) => {
    setSelectedBoundId(boundId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(inboundAction.getInboundAll());
    dispatch(storageAction.getstorageAll());
  }, []);

  useEffect(() => {
    setSearchData(inboundAll.data);
    setSearchDetailData(inboundDetailAll.data);
    // console.log('마스터',inboundAll.data);
    console.log("디테일", inboundDetailAll.data);
    // console.log('스토리지',storageAll.data);
    // console.log('로케이션',locationAll.data);
  }, [inboundAll]);

  const createRequestPayload = () => {
    let payload = [];

    // 모든 boundId에 대한 변경 내용을 반복합니다.
    for (let boundId in updatedDetails) {
      const details = updatedDetails[boundId];

      // 각 detail 항목에 대한 변경 내용을 반복합니다.
      for (let detail of details) {
        // 필요한 정보만 payload에 추가합니다.
        payload.push({
          bound_id: detail.bound_id,
          detail_id: detail.detail_id,
          storage_code: detail.storage_code,
          location_code: detail.location_code,
          amount: detail.amount,
        });
      }
    }
    return payload;
  };

  const handleSendToServer = async () => {
    const payload = createRequestPayload();
    console.log("서버보내지는것들", payload);
    try {
      const response = await api.post("inbound/updateOngoing", payload);

      if (response.status === 200 || response.status === 201) {
        console.log("Success");
        alert('입고처리 완료');
        window.location.reload();
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
  <div style={{padding:'0px'}}>
      <div className={inboundClasses.wrap}>
        {/* <p className={inboundClasses["sub-menu-name"]}>입고등록</p> */}
        <Table headers={grid01_headers}></Table>
        <div style={{overflow: "auto", maxHeight: "600px", textAlign: 'center'}}>
          {matchingMasters && matchingMasters.length > 0 ? (
            matchingMasters.map((data, index) => (
              <div
                key={index}
                onMouseEnter={() => handleMouseEnter(data.bound_id)} // 개별 tr에 대한 이벤트 핸들러 설정
                onMouseLeave={handleMouseLeave} // 공통 이벤트 핸들러
                style={{ ...hovered === data.bound_id ? rowHoverStyle : {}, display: "flex" }} // hover 상태에 따라 스타일 적용
              >
                {grid01_headers.map((header) => {
                  if (!header.value) {
                    return (
                      <td key="warehouse-location" style={{ flex: "20%", borderBottom: '1px solid #d9d9d9' , padding: '3px' }}>
                        <button style={styles.btnSave1} onClick={() => handleOpenModal(data.bound_id)}>
                          창고/장소 선택
                        </button>
                      </td>
                    );
                  }
                  return <td key={header.value} style={{ flex: "20%", borderBottom: '1px solid #d9d9d9', padding: '11px'}}>{data[header.value]}</td>
                })}
              </div>

            ))
          ) : (
            <tr>
              <td colSpan={grid01_headers.length}>데이터가 없습니다.</td>
            </tr>
          )}
        </div>
        <div style={styles.wrapBtn}>
        <button style={styles.btnSave} onClick={handleSendToServer}>입고처리</button>
        </div>    
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          boundId={selectedBoundId}
          details={searchDetailData}
          storageAll={storageAll}
          locationAll={locationAll}
          setUpdatedDetails={setUpdatedDetails}
        />
      </div>
    </div>
  );
  
}

export default InboundOngoing;
