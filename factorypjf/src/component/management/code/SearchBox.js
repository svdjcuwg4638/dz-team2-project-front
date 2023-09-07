import React from "react";
import api from "redux/api";
import "../../../style/management/storage.css"

const SearchBox = ({ formSearchData, setSearchFormData, setSearchData,selectId }) => {

  //#region 관리코드검색
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFormData({
      ...formSearchData,
      management_code:selectId,
      [name]: value,
    });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formSearchData,
      management_code :selectId,
    }

    try {
      setSearchData(
        (await api.post(formSearchData.url, submitData)).data.data
      );
    } catch (error) {
      console.log("error :", error);
    }
  };
  //#endregion

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <div className="storage_search_wrap">
          <div>
            <div>{formSearchData.searchName[0]}</div>
            <div className="inputBox">
              <input
                type="text"
                name={formSearchData.keys && formSearchData.keys[0]}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div>
            <div>{formSearchData.searchName[1]}</div>
            <div className="inputBox">
              <input
                type="text"
                name={formSearchData.keys && formSearchData?.keys[1]}
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
  );
};

export default SearchBox;
