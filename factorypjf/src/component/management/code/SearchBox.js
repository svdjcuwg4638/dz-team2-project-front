import React from "react";
import { useDispatch } from "react-redux";
import { codeAction } from "redux/actions/management/codeAction";
import api from "redux/api";

const SearchBox = ({ formSearchData, setSearchFormData }) => {
  const dispatch = useDispatch();

  //#region 관리코드검색
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFormData({
      ...formSearchData,
      [name]: value,
    });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        formSearchData.url,
      );
      dispatch(codeAction.getCodeAll());
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
              <div>{formSearchData.searchName[0]}</div>
              <div className="inputBox">
                <input
                  type="text"
                  name="storage_code"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div>
              <div>{formSearchData.searchName[1]}</div>
              <div className="inputBox">
                <input
                  type="text"
                  name="storage_name"
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
