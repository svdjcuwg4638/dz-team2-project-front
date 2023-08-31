import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import SearchSection from "./SearchSection";
import { storageAction } from "../../../redux/actions/management/storageAction";
import { itemAction } from "../../../redux/actions/management/itemAction";
import { partnerAction } from "../../../redux/actions/management/partnerAction";
const List = () => {
  const dispatch = useDispatch();

  const { partnerAll } = useSelector((state) => state.partner);
  const { itemAll } = useSelector((state) => state.item);
  const { storageAll, locationAll, loading } = useSelector(
    (state) => state.storage
  );

  useEffect(() => {
    dispatch(storageAction.getstorageAll());
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
    },
    {
      name: "거래처",
      //가이드유무
      guide: true,
      type_all: "partnerAll",
      code_column: "partner_code",
      name_column: "partner_name",
      dataAll: { partnerAll },
    },
    {
      name: "품목",
      guide: true,
      type_all: "itemAll",
      code_column: "item_code",
      name_column: "item_name",
      dataAll: { itemAll },
    },
    {
      name: "단위",
      guide: false,
    },
    {
      name: "규격",
      guide: false,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex" }}>
        {menulist.map((menu) => (
          <SearchSection menu={menu} />
        ))}
        <button>조회</button>
      </div>

      <div className="mt-3 " style={{ display: "flex", position: "relative" }}>
        <div
          className="storage_tbl"
          style={{ height: "300px", overflowY: "scroll" }}
        >
          <table className="">
            <thead>
              <th>창고코드</th>
              <th>창고명</th>
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
              <th>장소코드</th>
              <th>장소명</th>
            </thead>
            <tbody>
              {locationAll.data &&
                locationAll.data.map((location) => (
                  <tr>
                    <td>{location.storage_code}</td>
                    <td>{location.location_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Table></Table>
      </div>
    </div>
  );
};

export default List;
