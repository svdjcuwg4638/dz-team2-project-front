import React from "react";
import LocationTable from "./LocationTable";
import api from "../../../redux/api";
import { useState } from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import { useDispatch } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";

const RightBox = ({ storageAll, locationAll }) => {
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [locationInput, setlocationInput] = useState("");
  const dispatch = useDispatch();

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
      dispatch(storageAction.getstorageAll());
    } else {
      console.log("No storage selected");
    }
  };

  return (
    <div>
      {locationAll && <LocationTable  data={locationAll} setSelectedStorage={setSelectedStorage} storageAll={storageAll} />}
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
