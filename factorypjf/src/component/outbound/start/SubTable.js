import React, { useEffect, useState } from "react";
import SubRow from "./SubRow";
import inboundClasses from '../../../style/inbound/inbound.module.css'
import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "redux/actions/management/itemAction";
import { storageAction } from "redux/actions/management/storageAction";

const SubTable = ({ boundId, masterLength, masterFocus, subFlag, deletedBoundIds,checkedSubBoundIds,setCheckedSubBoundIds,deletedIndex }) => {
  
  const dispatch = useDispatch();
  const [subRowArray, setSubRowArray] = useState([]);

    //#region 데이터 로딩
    const [isLoading, setIsloading] = useState(false);
    const { itemAll } = useSelector((state) => state.item);
    const {storageAll, locationAll} = useSelector((state) => state.storage);

  
    useEffect(() => {
      dispatch(itemAction.getItemAll());
      dispatch(storageAction.getstorageAll());
    }, []);
    //#endregion
  useEffect(() => {
    if (boundId !== null && masterLength !== null) {
      setSubRowArray(Array.from({ length: masterLength }).map((_, index) => boundId + index));
    }
    // console.log('subrowarray는',subRowArray)
  }, [boundId]);

  const [allRequestsSuccessful, setAllRequestsSuccessful] = useState(true);

  const handleRequestSuccess = () => {
    // 여기서는 아무 것도 하지 않습니다. 모든 요청이 완료되면 처리합니다.
  }

  const handleRequestFail = () => {
    setAllRequestsSuccessful(false);
  }

  useEffect(() => {
    if (subFlag) { // subFlag를 모든 요청이 완료되었음을 알리는 트리거로 사용합니다.
      if (allRequestsSuccessful) {
        alert('저장완료');
        window.location.reload();
      } else {
        alert('저장실패');
      }
      setAllRequestsSuccessful(true); // 초기화
    }
  }, [subFlag]);

  const addSubArray = (masterFocus) => {
    setSubRowArray((prevArray) => [...prevArray, masterFocus]);
    console.log('masterfocus',masterFocus);
    console.log('subrowarray',subRowArray);
  };

  return (
    <div>
      <div
        style={{
          maxHeight: "300px", // 원하는 높이로 설정
          overflowY: "auto",  // 세로 스크롤을 사용하려면 auto 또는 scroll로 설정
          
        }}
              >
        <div>
          {boundId && masterLength &&
            subRowArray.map((boundId, index) => {
              if (deletedBoundIds && !deletedBoundIds.includes(boundId) && !deletedIndex.includes(index)) {
                return (
                  <SubRow index={index}
                    boundId={boundId}
                    masterFocus={masterFocus}
                    subFlag={subFlag}
                    handleRequestSuccess={handleRequestSuccess}
                    handleRequestFail={handleRequestFail}
                    checkedSubBoundIds={checkedSubBoundIds}
                    setCheckedSubBoundIds={setCheckedSubBoundIds}
                    itemAll={itemAll}
                    storageAll={storageAll}
                    locationAll={locationAll}/>
                )
              }
              return null;
            })}
          <tr>
          <td style={{width : "1600px", borderBottom: '1px solid #d9d9d9'}}>
            <button className={inboundClasses.btn_add}
              onClick={() => addSubArray(masterFocus)}
            >+</button>
          </td>
          </tr>
        </div>
      </div>
    </div>
  );
};

export default SubTable;