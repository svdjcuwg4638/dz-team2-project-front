import "../../../style/Table.css";
import { useState } from "react";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";

function StorageTable({ data }) {
  const [selectIds, setSelectIds] = useState([]);
  const [storageSearch, setStorageSearch] = useState(""); // 창고코드 검색어 상태
  const dispatch = useDispatch();

  const filteredData = data.filter((item) =>
    item.storage_name.includes(storageSearch)
  );

  const handleCheckboxChange = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = async () => {
    await api.post("/storage/delete", selectIds);
    dispatch(storageAction.getstorageAll());
    setSelectIds([]);
  };

  return (
    <>
      <button onClick={handleDelete}>삭제</button>
      <table className="table_scroll">
        <thead>
          <tr>
            <th></th>
            <th>
              창고코드
              <input
                type="text"
                placeholder="창고코드 검색"
                value={storageSearch}
                onChange={(e) => setStorageSearch(e.target.value)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  checked={selectIds.includes(data.storage_id)}
                  onChange={() => handleCheckboxChange(data.storage_id)}
                />
              </td>
              <td>{data.storage_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StorageTable;
