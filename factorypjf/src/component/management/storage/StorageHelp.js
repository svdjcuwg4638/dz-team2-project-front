import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storageAction } from "redux/actions/management/storageAction";
import "../../../style/management/storage.css";

const StorageHelp = ({ handleInputChange, setShowFlag }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storageAction.getstorageAll());
  }, []);

  const { storageAll, locationAll } = useSelector((state) => state.storage);
  const [filterData, setFilterData] = useState();
  useEffect(() => {
    searchStorageData();
  }, [storageAll, locationAll]);

  function searchStorageData() {
    const filteredLocationData = locationAll?.data
      .filter((locdata) => locdata.location_name.includes(locationNameInput))
      .map((locdata) => {
        const correspondingStorage = storageAll?.data.find(
          (stdata) => stdata.storage_code === locdata.storage_code
        );
        return {
          ...locdata,
          storage_name: correspondingStorage?.storage_name,
        };
      });

    setFilterData(filteredLocationData);
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

  const [storageNameInput, setStorageNameInput] = useState("");
  const [locationNameInput, setLocationNameInput] = useState("");

  return (
    <div>
      <div className="storage_help_bg" onClick={() => setShowFlag(false)}></div>
      <div className="storage_help_modal">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              borderBottom: "2px solid rgb(83, 144, 240)",
              fontSize: "30px",
              fontWeight: "bold",
              padding: "3px",
              margin: "23px",
              width: "26%",
              textAlign: "center",
            }}
          >
            창고코드
          </div>
        </div>
        <form style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", width: "35%", margin: "0" }}>
            <div style={{ marginRight: "10px" }}>창고명 </div>
            <div>
              <input
                type="text"
                name="storage_name"
                value={storageNameInput}
                onChange={(e) => setStorageNameInput(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex", width: "40%", margin: "0" }}>
            <div style={{ marginRight: "10px" }}>세부장소명 </div>
            <div>
              <input
                type="text"
                name="location_name"
                value={locationNameInput}
                onChange={(e) => setLocationNameInput(e.target.value)}
              />
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
        <table
          style={{
            padding: "21px",
            width: "95%",
            marginLeft: "18px",
            textAlign: "center",
            marginTop: "10px",
            maxHeight: "332px",
            overflowY: "scroll",
            display: "block",
          }}
        >
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
              filterData?.map((data) => {
                const storageData = storageAll?.data.find(
                  (stdata) => stdata.storage_code === data.storage_code
                );
                return (
                  <tr
                    onClick={() => {
                      insertStorageVal({
                        ...data,
                        storage_name: storageData.storage_name,
                      });
                      setShowFlag(false);
                    }}
                  >
                    <td>{data.storage_code}</td>
                    <td>{data.storage_name}</td>
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
