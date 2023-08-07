import React from "react";
import LocationTable from "./LocationTable";
import api from "../../../redux/api";
import { useState } from "react";
import AutoCompleteInput from "./AutoCompleteInput";

const RightBox = ({ storageAll, locationAll }) => {
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [locationInput, setlocationInput] = useState("");

  const columns = [
    {
      accessor: "storage_name",
      Header: "창고코드",
    },
    {
      accessor: "location_name",
      Header: "세부장소",
    },
  ];

  // 창고 추가
  const submit = async (event) => {
    event.preventDefault();

    if (selectedStorage) {
      const location = {
        storage_id: selectedStorage.storage_id,
        company_id: 1,
        location_name: locationInput,
      };
      const response = await api.post("/location/add", location);
    } else {
      console.log("No storage selected");
    }
  };

  return (
    <div>
      {locationAll && <LocationTable columns={columns} data={locationAll} />}
      <form className="add_from">
        { storageAll &&
        <AutoCompleteInput
          storageAll={storageAll}
          setSelectedStorage={setSelectedStorage}
        />
        }
        <input type="text" onChange={(e)=>setlocationInput(e.target.value)} />
        <button className="button" onClick={submit}>
          추가
        </button>
      </form>
    </div>
  );
};

export default RightBox;
