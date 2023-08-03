import React, { useEffect, useState } from "react";
import "../../style/management/Storage.css";
import api from "../../redux/api.js";
import { useDispatch, useSelector } from "react-redux";
import { storageAction } from "../../redux/actions/management/storageAction";
import Table from "./Table";

const Storage = () => {
  const dispatch = useDispatch();

  const { storageAll } = useSelector((state) => state.storage);

  console.log(storageAll);
  useEffect(() => {
    dispatch(storageAction.getstorageAll());
  }, []);

  const [storageInput, setstorageInput] = useState("");

  // 창고 추가
  const Submit = async (event) => {
    event.preventDefault();

    const storage = {
      storage_name: storageInput,
      company_id: 1,
    };
    const response = await api.post("/storage/add", storage);
  };

  //입력된값 반영
  const inputChange = (event) => {
    setstorageInput(event.target.value);
  };

  return (
    <div className="storage_wrap">
      <div>
        <input type="text" />
        <Table storageAll={storageAll} />
        <div className="text-box">
          <input type="text" value={storageInput} onChange={inputChange} />
        </div>
        <div className="button">
          <div onClick={Submit}>추가</div>
        </div>
      </div>
      <div>
        <input type="text" />
        <table>
          <thead>
            <tr>
              <td>창고코드</td>
              <td>세부장소</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A101</td>
              <td>A-1창고</td>
            </tr>
            <tr>
              <td>A101</td>
              <td>A-2창고</td>
            </tr>
            <tr>
              <td>A101</td>
              <td>A-3창고</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Storage;
