import { useEffect, useRef, useState } from "react";
import api from "redux/api";

function LocationTable({ data, setSelectIds, selectIds, selectId }) {
  const [SearchList, setSearchList] = useState(data);

  useEffect(() => {
    setSearchList(
      data.filter((data) => data.storage_code == selectId?.storage_code)
    );
  }, [selectId, data]);

  // #region 스크롤 이벤트 함수
  const tableRef = useRef(null);

  const handleScroll = (e) => {
    const { deltaY } = e;
    if (tableRef.current) {
      tableRef.current.scrollTop += deltaY;
    }
  };
  // #endregion

  // check box 클릭되면 해당 id값 저장
  const handleCheckboxChange = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectIds((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <div className="ctable">
        <div className="chead">
          <div className="ctr storage_row_sub">
            <div></div>
            <div>세부장소코드</div>
            <div>세부장소명</div>
          </div>
        </div>
      </div>

      <div className="ctable">
        <div className="cbody" onWheel={handleScroll}>
          {SearchList &&
            SearchList.map((data) => (
              <div className="ctr storage_row_sub">
                <div>
                  <input
                    className="management_checkBox"
                    type="checkbox"
                    checked={selectIds.includes(data)}
                    onChange={() => handleCheckboxChange(data)}
                  />
                </div>
                <div>{data.location_code}</div>
                <div>{data.location_name}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default LocationTable;
