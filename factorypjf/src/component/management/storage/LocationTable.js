import { useEffect, useRef, useState } from "react";
import api from "redux/api";

function LocationTable({ data, setSelectIds, selectIds,selectId }) {
  const [SearchList, setSearchList] = useState(data);


  useEffect(()=>{
    setSearchList(data.filter((data)=>data.storage_code == selectId?.storage_code))
  },[selectId,data])

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
      <table className="table_scroll">
        <thead>
          <tr>
            <th></th>
            <th>세부장소코드</th>
            <th>세부장소명</th>
          </tr>
        </thead>
        <tbody className="storage_scrollable_table" onWheel={handleScroll}>
          {SearchList &&
            SearchList.map((data) => (
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={selectIds.includes(data.location_id)}
                    onChange={() => handleCheckboxChange(data.location_id)}
                  />
                </td>
                <td>{data.location_code}</td>
                <td>{data.location_name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default LocationTable;
