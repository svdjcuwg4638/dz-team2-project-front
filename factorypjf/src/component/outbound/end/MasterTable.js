import React, { useState } from 'react';
import '../../../style/inbound/overlay.css'

const rowHoverStyle = {
  backgroundColor: "#f0f0f0", // 원하는 배경색으로 변경하세요.
};

function MasterTable({ searchData = [], onRowClick }) {
  return (
    <table>
      <tbody>
        {searchData.map((rowData, index) => (
          <TableRow key={index} rowData={rowData} onRowClick={onRowClick} />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ rowData, onRowClick }) {
  const [hovered, setHovered] = useState(false); // 마우스 호버 상태를 저장하기 위한 상태 변수

  // 마우스가 행 위로 올라갔을 때 호출되는 이벤트 핸들러
  const handleMouseEnter = () => {
    setHovered(true);
  };

  // 마우스가 행 위에서 벗어났을 때 호출되는 이벤트 핸들러
  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <tr
      className='bottom'
      onClick={() => onRowClick(rowData.bound_id)}
      style={{ ...(hovered ? rowHoverStyle : {}), textAlign: 'center' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <td>{rowData.bound_no}</td>
      <td>{rowData.bound_category}</td>
      <td>{rowData.partner_code}</td>
      <td>{rowData.bound_date}</td>
    </tr>
  );
}

export default MasterTable;
