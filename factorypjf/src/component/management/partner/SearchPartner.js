import React, { useState } from 'react'
import api from 'redux/api';

const SearchPartner = ({setSearchData}) => {

  const [ formData , setFormData] = useState({
    searchCategory:"partner_code",
    searchValue:"",
  })

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
      }
  
      try {
        setSearchData(
          (await api.post("/partner/search", submitData)).data.data
        );
      } catch (error) {
        console.log("error :", error);
      }
    };
    //#endregion

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <div className="search_wrap">
          <div>
            <select name="searchCategory" onChange={handleSearchChange}>
              <option value="partner_code">거래처코드</option>
              <option value="partner_name">거래처명</option>
              <option value="representative">대표자명</option>
              <option value="ph_num">연락처</option>
              <option value="email">이메일</option>
              <option value="collect_date">수금/지급 예정일</option>
            </select>
          </div>
          <div>
            <div>검색어 : </div>
            <div className="inputBox">
              <input
                type="text"
                name="searchValue"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="button_wrap">
          <button className="button">조회</button>
        </div>
      </form>
    </>
  )
}

export default SearchPartner