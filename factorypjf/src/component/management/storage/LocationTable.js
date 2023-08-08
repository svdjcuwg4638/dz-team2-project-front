import "../../../style/Table.css";
import { useState } from "react";
import api from "../../../redux/api";
import { useDispatch } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";
import EditAutoComplete from "./EditAutoComplete";

function LocationTable({ data, storageAll }) {
  const dispatch = useDispatch();

  const [selectIds, setSelectIds] = useState([]);
  const [storageSearch, setStorageSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  // 수정 상태를 위한 state
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({});

  // 필터
  const filteredData = data.filter(
    (item) =>
      item.storage_name.includes(storageSearch) &&
      item.location_name.includes(locationSearch)
  );

  // check box 클릭되면 해당 id값 저장
  const handleCheckboxChange = (id) => {
    if (selectIds.includes(id)) {
      setSelectIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectIds((prev) => [...prev, id]);
    }
  };

  // 삭제버튼 이벤트
  const handleDelete = async () => {
    await api.post("/location/delete", selectIds);
    dispatch(storageAction.getstorageAll());
    setSelectIds([]);
  };

  const handleRowDoubleClick = (data) => {
    setEditMode(data.location_id);
    setEditedData(data);
  };

  const handleInputChange = (key, value) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleEnterPress = async (id) => {
    if (editMode === id) {
      await api.post("/location/edit", editedData);
      dispatch(storageAction.getstorageAll());
      setEditMode(null);
    }
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
            <th>
              세부장소
              <input
                type="text"
                placeholder="세부장소 검색"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data) => (
            <tr onDoubleClick={() => handleRowDoubleClick(data)}>
              <td>
                <input
                  type="checkbox"
                  checked={selectIds.includes(data.location_id)}
                  onChange={() => handleCheckboxChange(data.location_id)}
                />
              </td>
              <td>
                {editMode === data.location_id ? (
                  <EditAutoComplete
                    storageAll={storageAll}
                    locationAll={data}
                    setEditedData={setEditedData}
                  />
                ) : (
                  data.storage_name
                )}
              </td>
              <td>
                {editMode === data.location_id ? (
                  <input
                    type="text"
                    value={editedData.location_name}
                    onChange={(e) =>
                      handleInputChange("location_name", e.target.value)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleEnterPress(data.location_id)
                    }
                  />
                ) : (
                  data.location_name
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default LocationTable;
