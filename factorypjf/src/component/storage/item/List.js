import React, { useState } from "react";
import Table from "./Table";
import SearchSection from "./SearchSection";
const List = () => {
  const menulist = [
    {
      name: "거래처",
      eng_name: "partner",
      guide: true,
      code_column: "partner_code",
      name_column: "partner_name",
    },
    {
      name: "품목",
      eng_name: "partner",
      guide: true,
      code_column: "company_id",
      name_column: "owner",
    },
    {
      name: "날짜",
      guide: false,
      code_column: "partner_code",
      name_column: "partner_name",
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
            <th>창고코드</th>
            <th>창고명</th>
          </table>
        </div>
        <div
          className="location_tbl"
          style={{ height: "300px", overflowY: "scroll" }}
        >
          <table className="">
            <th>장소코드</th>
            <th>장소명</th>
          </table>
        </div>
        <Table></Table>
      </div>
    </div>
  );
};

export default List;
