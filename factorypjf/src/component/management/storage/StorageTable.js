import api from "redux/api";
import { useRef, useState } from "react";

function StorageTable({ data, selectCodes, setSelectCodes }) {
  const [SearchList, setSearchList] = useState(data);

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

  // #region 창고검색코드
  
  const [formData, setFormData] = useState({
    storage_name: "",
    storage_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSearchList((await api.post("/storage/search", formData)).data.data);
    } catch (error) {
      console.log("error :", error);
    }
  };
  // #endregion

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="storage_search_wrap">
          <div>
            <div>창고코드</div>
            <div className="inputBox">
              <input type="text" name="storage_code" onChange={handleChange} />
            </div>
          </div>
          <div>
            <div>창고이름</div>
            <div className="inputBox">
              <input type="text" name="storage_name" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="button_wrap">
          <button className="button">조회</button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>창고코드</th>
            <th>창고이름</th>
          </tr>
        </thead>
        <tbody className="storage_scrollable_table" onWheel={handleScroll}>
          {SearchList.length > 0 &&
            SearchList.map((data) => (
              <tr>
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
