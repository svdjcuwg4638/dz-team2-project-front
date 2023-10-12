import React, { useEffect, useState } from "react";
import MasterRow from "./MasterRow";
import inboundClasses from '../../../style/inbound/inbound.module.css';
import {useDispatch, useSelector } from "react-redux";
import { partnerAction } from "redux/actions/management/partnerAction";
// import '../../../style/inbound/start.css';

const MasterTable = ({
  setMasterLength,
  masterLength,
  boundId,
  setMaseterFocus,
  masterFlag,
  setSubFlag,
  setCheckedBoundIds,
  deletedBoundIds,
  incrementedBoundNo,
  incrementBoundNo
}) => {

  //#region 데이터 로딩
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const { partnerAll } = useSelector((state) => state.partner);

  useEffect(() => {
    const patchItems = async () => {
      setIsloading(true);
      try {
        await dispatch(partnerAction.getPartnerAll());
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    patchItems();
  }, []);
  //#endregion

  const functionincrementBoundNo = (currentNo) => {
    if (!currentNo) return null;
    const prefix = currentNo.substring(0, currentNo.length - 4);
    const numPart = parseInt(currentNo.slice(-4));
    const incrementedNum = numPart + 1;
    return `${prefix}${String(incrementedNum).padStart(4, '0')}`;
  };

  const plustHandler = () => {
    setMasterLength(masterLength + 1);
  };

  let currentBoundNo = incrementedBoundNo;

  return (
    <div>
      <div
        style={{
          height : '200px',
          maxHeight: masterLength > 3 ? "200px" : "none",
          overflowY: masterLength > 3 ? "auto" : "visible",
          
        }}>
          {boundId !== 0 && boundId && masterLength > 0 &&
            Array.from({ length: masterLength }).map((_, index) => {
              const currentBoundId = boundId + index;
              if (index > 0) {
                currentBoundNo = functionincrementBoundNo(currentBoundNo);
              }
              
              if (!deletedBoundIds.includes(currentBoundId)) {
                return (
                  <MasterRow 
                             key={index}
                             boundId={currentBoundId}
                             boundNo={currentBoundNo}
                             incrementedBoundNo={incrementedBoundNo}
                             setMaseterFocus={setMaseterFocus}
                             masterFlag={masterFlag}
                             setSubFlag={setSubFlag}
                             setCheckedBoundIds={setCheckedBoundIds}
                             partnerAll={partnerAll}
                  />
                );
              }
              return null; // 삭제된 boundId에 해당하는 row는 렌더링하지 않음.
            })}
          <div>
            <td style={{width : "1600px", borderBottom: '1px solid #d9d9d9'}}>
              <button className={inboundClasses.btn_add}
                      onClick={() => plustHandler()}>
                +
              </button>
            </td>
          </div>
        </div>
      
    </div>
  );
};

export default MasterTable;
