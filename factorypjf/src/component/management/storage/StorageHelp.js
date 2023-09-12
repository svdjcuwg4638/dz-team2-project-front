import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storageAction } from "redux/actions/management/storageAction";
import "../../../style/management/storage.css";

const StorageHelp = ({ handleInputChange, setShowFlag }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storageAction.getstorageAll());
  }, []);

  const { storageAll, locationAll } = useSelector((state) => state.storage);

  function searchStorageData(e) {
    e.preventDefault();
  }

  function insertStorageVal(data) {
    handleInputChange({
      target: {
        name: "storage_code",
        value: data.storage_name,
      },
    });
    handleInputChange({
      target: {
        name: "location_code",
        value: data.location_name,
      },
    });
  }

  return (
    <div>
      <div className="storage_help_bg"></div>
      <div className="storage_help_modal">
        <form style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", width: "35%", margin: "0" }}>
            <div>창고명 : </div>
            <div>
              <input type="text" name="storage_name"></input>
            </div>
          </div>
          <div style={{ display: "flex", width: "40%", margin: "0" }}>
            <div>세부장소명 : </div>
            <div>
              <input type="text" name="location_name"></input>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "10%",
              margin: "0",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              className="button"
              onClick={searchStorageData}
            >
              조회
            </button>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>창고코드</th>
              <th>창고명</th>
              <th>세부장소코드</th>
              <th>세부장소명</th>
            </tr>
          </thead>
          <tbody>
            {locationAll.data &&
              storageAll.data &&
              locationAll.data.map((data) => {
                const storageData = storageAll.data.find(
                  (stdata) => stdata.storage_code === data.storage_code
                );
                return (
                  <tr
                    onClick={() => {
                      insertStorageVal({
                        ...data,
                        storage_name: storageData.storage_name,
                      });
                      setShowFlag(false)
                    }}
                  >
                    <td>{data.storage_code}</td>
                    <td>{storageData.storage_name}</td>
                    <td>{data.location_code}</td>
                    <td>{data.location_name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StorageHelp;
