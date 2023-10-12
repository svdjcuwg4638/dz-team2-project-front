import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { storageAction } from "redux/actions/management/storageAction";

const rowHoverStyle = {
  backgroundColor: "#f0f0f0", // 원하는 배경색으로 변경하세요.
};

function SubTable({ filteredDetailData }) {
  const dispatch = useDispatch();

  const { storageAll, locationAll } = useSelector((state) => state.storage);
  const storageAll1 = storageAll.data || []; // 데이터가 없을 경우 빈 배열을 기본값으로 설정
  const locationAll1 = locationAll.data || [];

  useEffect(() => {
    dispatch(storageAction.getstorageAll());
  }, []);

  useEffect(() => {
    console.log('스토리지', locationAll1);
  }, [locationAll1]);

  return (
    <table>
      <tbody>
        {filteredDetailData.map((detail, index) => (
          <SubTableRow key={index} rowData={detail} storageAll={storageAll1} locationAll={locationAll1} />
        ))}
      </tbody>
    </table>
  );
}

function SubTableRow({ rowData, storageAll, locationAll }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // storage_code와 location_code를 storage_name과 location_name으로 변환
  const storageName = storageAll.find(storage => storage.storage_code === rowData.storage_code)?.storage_name || rowData.storage_code;
  const locationName = locationAll.find(location => location.location_code === rowData.location_code)?.location_name || rowData.location_code;

  return (
    <tr
      style={{ ...(hovered ? rowHoverStyle : {}), textAlign: 'center', borderBottom: '1px solid #d9d9d9' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <td style={{width: '8%'}}>{rowData.item_code}</td>
      <td style={{width: '8%'}}>{rowData.item_name}</td>
      <td style={{width: '8%'}}>{rowData.amount}</td>
      <td style={{width: '8%'}}>{rowData.unit_price}</td>
      <td style={{width: '8%'}}>{rowData.tot_amount}</td>
      <td style={{width: '8%'}}>{storageName}</td>
      <td style={{width: '8%'}}>{locationName}</td>
      <td style={{width: '20%'}}>{rowData.detail_date}</td>
      <td style={{width: '24%'}}>{rowData.description}</td>
    </tr>
  );
}

export default SubTable;
