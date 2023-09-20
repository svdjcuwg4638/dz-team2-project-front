import { useRef } from "react";

function StorageTable({ data, selectCodes, setSelectCodes,selectId,setSelectId }) {

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
      <table>
        <thead>
          <tr>
            <th></th>
            <th>창고코드</th>
            <th>창고이름</th>
          </tr>
        </thead>
        <tbody className="storage_scrollable_table" onWheel={handleScroll}>
          {data.length > 0 &&
            data?.map((data) => (
              <tr onClick={()=>setSelectId(data)} style={{backgroundColor : data.storage_code == selectId?.storage_code ? "#dadada" : ""}}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectCodes.includes(data.storage_code)}
                    onChange={() => handleCheckboxChange(data.storage_code)}
                  />
                </td>
                <td>{data.storage_code}</td>
                <td>{data.storage_name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default StorageTable;
