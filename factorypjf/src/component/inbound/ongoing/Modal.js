import { useEffect, useState } from "react";
import SearchHelper from "./SearchHelper";
import '../../../style/inbound/overlay.css'

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
      width: "50px",
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
        width: "65px",
        height: "30px",
        margin: "5px",
      },
    btnSaveDelete: {
      paddingTop: "2px",
    },
  };

function Modal({ isOpen, onClose, boundId, details = [], locationAll, storageAll, setUpdatedDetails}) { // 기본값 설정
// 연결된 bound_id를 기반으로 상세 정보를 필터링합니다.


  // 각 <tr> 요소마다 hover 상태를 관리하기 위한 상태 변수
  const [hoveredRows, setHoveredRows] = useState({});

  // 마우스가 특정 행 위로 올라갔을 때 호출되는 이벤트 핸들러
  const handleMouseEnter = (detailId) => {
    setHoveredRows((prevHoveredRows) => ({
      ...prevHoveredRows,
      [detailId]: true, // 해당 detailId의 행을 hover 상태로 설정
    }));
  };

  // 마우스가 특정 행 위에서 벗어났을 때 호출되는 이벤트 핸들러
  const handleMouseLeave = (detailId) => {
    setHoveredRows((prevHoveredRows) => ({
      ...prevHoveredRows,
      [detailId]: false, // 해당 detailId의 행을 hover 해제 상태로 설정
    }));
  };

const matchingDetails = details.filter(detail => detail.bound_id === boundId && detail.detail_state === 'ongoing');
const [formData, setFormData] = useState([]);

useEffect(() => {
    const matchingData = details.filter(detail => detail.bound_id === boundId);
    setFormData(matchingData);
}, [details, boundId]);


const [currentDetailId, setCurrentDetailId] = useState(null);

const handleButtonClick = (type, detailId) => {
    sedivelperScreenState(type);
    setCurrentDetailId(detailId);
};



useEffect(()=>{
    console.log('폼데이터는',formData)
},[formData]);

const [HelperScreenState, sedivelperScreenState] = useState(false);
const selectedPartnerFn = () => {
    sedivelperScreenState(false);
};

const handleInputChange = (event, detailId) => {
    const changes = event.target;

    const newFormData = formData.map(detail => {
        if (detail.detail_id == detailId) {
            return {
                ...detail,
                ...changes
            };
        }
        return detail;
    });

    setFormData(newFormData);
};
const filterUnchangedDetails = () => {
    return formData.filter(currentDetail => {
        // 원래의 details 배열에서 해당 detail 항목을 찾습니다.
        const originalDetail = details.find(detail => detail.detail_id === currentDetail.detail_id);
        // 항목이 없거나 변경되었다면 true를 반환하여 결과 배열에 포함시킵니다.
        return !originalDetail || JSON.stringify(originalDetail) !== JSON.stringify(currentDetail);
    });
};
const handleSaveChanges = () => {
    const changedDetails = filterUnchangedDetails();
    
    // 상위 컴포넌트의 setUpdatedDetails에 현재 boundId를 key로 하고, 변경된 상세 내용을 value로 전달
    setUpdatedDetails(prevDetails => ({
      ...prevDetails,
      [boundId]: changedDetails
    }));
    
    onClose(); // 모달을 닫습니다.
  };

const item = {
    name: "창고",
    guide: true,
    type_all: "storageAll",
    code_column: "storage_code",
    name_column: "storage_name",
    dataAll: {storageAll},
    trigger_type: "input",
    input_type: "storage",
};

const item2 = {
    name: "세부장소",
    guide: true,
    type_all: "locationAll",
    code_column: "location_code",
    name_column: "location_name",
    dataAll: {locationAll},
    trigger_type: "input",
    input_type: "location",
    };

if (!isOpen) return null;

return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <div style={{
           backgroundColor: 'white',
           padding: '20px',
           maxWidth: '1200px',
           width: '90%',
           borderRadius: '10px',
        }}>
            <table>
                <thead>
                    <tr>
                        <th>품목코드</th>
                        <th>품목명</th>
                        <th>수량</th>
                        <th>단가</th>
                        <th>총액</th>
                        <th>입고예정일</th>
                        <th>비고</th>
                        <th>창고</th>
                        <th>장소</th>
                    </tr>
                </thead>
                <tbody style={{textAlign: 'center'}}>
                    {matchingDetails.map((detail, index) => (
                        <tr className="bottom"
                        key={index}
                        style={
                            hoveredRows[detail.detail_id] // 해당 행의 hover 상태에 따라 스타일 적용
                              ? rowHoverStyle
                              : {}
                          }
                          onMouseEnter={() => handleMouseEnter(detail.detail_id)} // 해당 행의 hover 상태를 true로 설정
                          onMouseLeave={() => handleMouseLeave(detail.detail_id)} // 해당 행의 hover 상태를 false로 설정
                        >
                            <td>{detail.item_code}</td>
                            <td>{detail.item_name}</td>
                            <td>{detail.amount}</td>
                            <td>{detail.unit_price}</td>
                            <td>{detail.tot_amount}</td>
                            <td>{detail.detail_date}</td>
                            <td style={{width: '500px'}}>{detail.decription}</td>
                            <td style={{width: '200px'}}>
                                <input
                                    data-detail-id={detail.detail_id}
                                    name="storage_code"
                                    value={formData.find(fd => fd.detail_id === detail.detail_id)?.storage_name || ''}
                                />
                                 <button style={styles.btnSave1} onClick={() => handleButtonClick('storage',detail.detail_id)}>창고선택</button>
                            </td>
                            <td style={{width: '200px'}}>
                                
                                <input
                                    data-detail-id={detail.detail_id} 
                                    name="location_code"
                                    value={formData.find(fd => fd.detail_id === detail.detail_id)?.location_name || ''}
                                />
                                <button style={styles.btnSave1} onClick={() => handleButtonClick('location',detail.detail_id)}>장소선택</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={styles.wrapBtn}>
            <button style={styles.btnDelete}onClick={onClose}>닫기</button>
            <button style={styles.btnSave}onClick={handleSaveChanges}>저장</button>
            </div>
        </div>
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
                    menu={HelperScreenState === 'storage' ? item : item2}
                    searchPartner={selectedPartnerFn}
                    currentDetailId={currentDetailId}
                />
            </div>
        )}
    </div>
);

}
export default Modal