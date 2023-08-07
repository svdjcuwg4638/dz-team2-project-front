import { useState } from "react";
import api from "../../../redux/api";
import StorageTable from "./StorageTable";

function LeftBox({ storageAll }) {
  const columns = [
    {
      accessor: "storage_name",
      Header: "창고코드",
    },
  ];
  const [storageInput, setstorageInput] = useState("");
    // 창고 추가
    const submit = async (event) => {
      event.preventDefault();
  
      const storage = {
        storage_name: storageInput,
        company_id: 1,
      };
      const response = await api.post("/storage/add", storage);
    };

  return (
    <div>
      {storageAll && <StorageTable columns={columns} data={storageAll} />}
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
