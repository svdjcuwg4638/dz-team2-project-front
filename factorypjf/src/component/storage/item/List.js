import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import Modal from "./Modal";
import { storageAction } from "../../../redux/actions/management/storageAction";
import "../registration/regiBtn.css";

import InputTable from "./InputTable";
import { CodehelperAction } from "redux/actions/storage/CodeHelperAction";

const List = () => {
  const dispatch = useDispatch();

  const { partnerAll } = useSelector((state) => state.partner);
  const { itemAll } = useSelector((state) => state.item);
  const { storageAll, locationAll } = useSelector(
    (state) => state.storage
  );

  useEffect(() => {
    dispatch(storageAction.getstorageAll());
    dispatch(CodehelperAction.getCodehelperAll());
  }, []);

  //두 column의 실제 자료형이 문자열이어야 한다.
  const menulist = [
    {
      name: "창고",
      guide: true,
      type_all: "storageAll",
      code_column: "storage_code",
      name_column: "storage_name",
      dataAll: { storageAll },
      trigger_type: "search",
    },
    {
      name: "거래처",
      //가이드유무
      guide: true,
      type_all: "partnerAll",
      code_column: "partner_code",
      name_column: "partner_name",
      dataAll: { partnerAll },
      trigger_type: "search",
    },
    {
      name: "품목",
      guide: true,
      type_all: "itemAll",
      code_column: "item_code",
      name_column: "item_name",
      dataAll: { itemAll },
      trigger_type: "search",
    },
    {
      name: "단위",
      guide: false,
      trigger_type: "search",
    },
    {
      name: "규격",
      guide: false,
      trigger_type: "search",
    },
  ];
  const tbl_menulist = [
    {
      name: "창고",
      guide: true,
      type_all: "storageAll",
      code_column: "storage_code",
      name_column: "storage_name",
      dataAll: { storageAll },
      trigger_type: "input",
    },
    {
      name: "거래처",
      //가이드유무
      guide: true,
      type_all: "partnerAll",
      code_column: "partner_code",
      name_column: "partner_name",
      dataAll: { partnerAll },
      trigger_type: "input",
    },
    {
      name: "품목",
      guide: true,
      type_all: "itemAll",
      code_column: "item_code",
      name_column: "item_name",
      dataAll: { itemAll },
      trigger_type: "input",
    },
    {
      name: "단위",
      guide: false,
      trigger_type: "input",
    },
    {
      name: "규격",
      guide: false,
      trigger_type: "input",
    },
  ];
  console.log(locationAll);
  return (
    <div style={{ height: "700px", overflowY: "scroll" }}>
      <div style={{ display: "flex" }}>
        {menulist.map((menu) => (
          <Modal menu={menu} />
        ))}
        <button style={{ height: "30px", lineHeight: "15px" }} className="btn">
          조회
        </button>
      </div>

      <div className="mt-3 " style={{ display: "flex", position: "relative" }}>
        <div
          className="storage_tbl"
          style={{ height: "300px", overflowY: "scroll" }}
        >
          <table className="">
            <thead>
              <tr>
                <th>창고코드</th>
                <th>창고명</th>
              </tr>
            </thead>
            <tbody>
              {storageAll.data &&
                storageAll.data.map((storage) => (
                  <tr>
                    <td>{storage.storage_code}</td>
                    <td>{storage.storage_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div
          className="location_tbl"
          style={{ height: "300px", overflowY: "scroll" }}
        >
          <table className="">
            <thead>
              <tr>
                <th>장소코드</th>
                <th>장소명</th>
              </tr>
            </thead>
            <tbody>
              {locationAll.data &&
                locationAll.data.map((location) => (
                  <tr>
                    <td>{location.location_code}</td>
                    <td>{location.location_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Table></Table>
      </div>
      <InputTable menulist={tbl_menulist} />
    </div>
  );
};

export default List;
