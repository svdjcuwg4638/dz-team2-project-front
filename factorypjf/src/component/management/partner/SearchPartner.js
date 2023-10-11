import React, { useState } from "react";
import api from "redux/api";

const SearchPartner = ({ setSearchData }) => {
  const [formData, setFormData] = useState({
    searchCategory: "partner_name",
    searchValue: "",
  });

  //#region 관리코드검색
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
    };

    try {
      setSearchData((await api.post("/partner/search", submitData)).data.data);
    } catch (error) {
      console.log("error :", error);
    }
  };
  //#endregion

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="management_search_wrap">
        <div className="management_search_content">
          <div>
            <div>분류</div>
            <div>
              <select name="searchCategory" onChange={handleSearchChange} style={{height:"22.8px"}}>
                <option value="partner_name">거래처명</option>
                <option value="partner_code">거래처코드</option>
                <option value="representative">대표자명</option>
                <option value="ph_num">연락처</option>
                <option value="email">이메일</option>
                <option value="collect_date">수금/지급 예정일</option>
                <option value="post_num">우편번호</option>
              </select>
            </div>
          </div>
          <div>
            <div>검색</div>
            <div>
              <input
                type="text"
                name="searchValue"
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="button_wrap">
            <button className="btn_save">조회</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchPartner;
