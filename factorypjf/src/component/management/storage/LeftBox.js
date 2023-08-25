import { useState } from "react";
import api from "../../../redux/api";
import StorageTable from "./StorageTable";
import { useDispatch } from "react-redux";
import { storageAction } from "../../../redux/actions/management/storageAction";

function LeftBox({ storageAll }) {

  const dispatch = useDispatch()

  const [storageInput, setstorageInput] = useState("");
    // 창고 추가
    const submit = async (event) => {
      event.preventDefault();
  
      const storage = {
        storage_name: storageInput,
        company_id: 1,
      };
      const response = await api.post("/storage/add", storage);
      dispatch(storageAction.getstorageAll())
    };

  return (
    <div>
      {storageAll && <StorageTable data={storageAll} />}
      <div>
        <form className="add_from">
          <input type="text" onChange={(e)=>setstorageInput(e.target.value)} />
          <button className="button" onClick={submit}>
            추가
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeftBox;
