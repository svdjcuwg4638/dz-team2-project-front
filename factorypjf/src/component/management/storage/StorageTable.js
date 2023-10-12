import { useRef } from "react";

function StorageTable({
  data,
  selectCodes,
  setSelectCodes,
  selectId,
  setSelectId,
}) {
  // #region 스크롤 이벤트 함수
  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
    console.log(data);
  };
  // #endregion

  // #region 삭제 체크박스 함수
  const handleCheckboxChange = (cd) => {
    if (selectCodes.includes(cd)) {
      setSelectCodes((prev) => prev.filter((itemCd) => itemCd !== cd));
    } else {
      setSelectCodes((prev) => [...prev, cd]);
    }
  };
  // #endregion

  return (
    <>
      <div className="ctable">
        <div className="chead">
          <div className="ctr storage_row">
            <div></div>
            <div>창고코드</div>
            <div>창고명</div>
          </div>
        </div>
      </div>

      <div className="ctable">
        <div className="cbody" onWheel={handleScroll}>
          {data.length > 0 &&
            data?.map((data) => (
              <div
                className="ctr storage_row"
                onClick={() => setSelectId(data)}
                style={{
                  backgroundColor:
                    data.storage_code == selectId?.storage_code
                      ? "rgb(245, 245, 245)"
                      : "",
                }}
              >
                <div
                  onClick={(event) => {
                    event.stopPropagation(); 
                  }}
                >
                  <input
                    type="checkbox"
                    className="management_checkBox"
                    checked={selectCodes.includes(data.storage_code)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(data.storage_code);
                    }}
                    onClick={(event) => {
                      event.stopPropagation(); 
                    }}
                  />
                </div>
                <div>{data.storage_code}</div>
                <div>{data.storage_name}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default StorageTable;
