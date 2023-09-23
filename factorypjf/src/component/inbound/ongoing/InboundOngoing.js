import React, { useEffect, useState } from 'react'
import inboundClasses from '../../../style/inbound/inbound.module.css'
import Table from '../table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { inboundAction } from 'redux/actions/inbound/inboundAction';
import DetailModal from './Modal' // 수정된 부분

function InboundOngoing() {
  const dispatch = useDispatch();
  
  const {inboundAll, inboundDetailAll, loading} = useSelector((state) => state.inbound);
  
  const [searchData, setSearchData] = useState(inboundAll.data);
  const [searchDetailData, setSearchDetailData] = useState(inboundDetailAll.data);
  const [selectedBoundId, setSelectedBoundId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (boundId) => {
    setSelectedBoundId(boundId);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    dispatch(inboundAction.getInboundAll());
  }, []);

  useEffect(() => {
    setSearchData(inboundAll.data);
    setSearchDetailData(inboundDetailAll.data);
    console.log(inboundAll.data);
    console.log(inboundDetailAll.data);
  }, [inboundAll])

  const grid01_headers = [
    { text: "문서번호", value: "bound_no", width: "3%" },
    { text: "유형", value: "bound_category", width: "9%" },
    { text: "거래처", value: "partner_code", width: "9%" },
    { text: "입고예정일", value: "bound_date", width: "9%", helper: true },
    { text: "창고/장소", value: "", width: "9%", helper: true },
  ];

  return (
    <div className={inboundClasses.wrap}>
      <p className={inboundClasses["sub-menu-name"]}>입고등록</p>
      <Table headers={grid01_headers}></Table>
      <tbody>
        {searchData && searchData.length > 0 ? (
          searchData.map((data, index) => (
            <tr key={index}>
              {grid01_headers.map((header) => {
                if (!header.value) {
                  return (
                    <td key="warehouse-location">
                      <button onClick={() => handleOpenModal(data.bound_id)}>창고/장소</button>
                    </td>
                  );
                }
                return <td key={header.value}>{data[header.value]}</td>;
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={grid01_headers.length}>데이터가 없습니다.</td>
          </tr>
        )}
      </tbody>
      <DetailModal isOpen={isModalOpen} onClose={handleCloseModal} boundId={selectedBoundId} details={searchDetailData} /> {/* 수정된 부분 */}
    </div>
  )
}

export default InboundOngoing