import { useRef, useState } from "react";
import api from "redux/api";

function LocationTable({ data, setSelectIds, selectIds }) {
  const [SearchList, setSearchList] = useState(data);

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

  // #region 세부장소 검색
  const [formData, setFormData] = useState({
    storage_code: "",
    location_name: "",
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
      setSearchList(
        (await api.post("/storage/Locationsearch", formData)).data.data
      );
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
            <div>세부장소코드</div>
            <div className="inputBox">
              <input type="text" name="location_code" onChange={handleChange} />
            </div>
          </div>
          <div>
            <div>세부장소이름</div>
            <div className="inputBox">
              <input type="text" name="location_name" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="button_wrap">
          <button className="button">조회</button>
        </div>
      </form>
      <table className="table_scroll">
        <thead>
          <tr>
            <th></th>
            <th>창고코드</th>
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
                <td>{data.storage_code}</td>
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
