import React, { useEffect, useState } from "react";
import Dep1 from "./Dep1";
import Dep2 from "./Dep2";
import Header from "./Header";
import Section from "./Section";
import { useDispatch, useSelector } from "react-redux";
import api from "redux/api";
import { commonAction } from "redux/actions/common/commonAction";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { saveCurrentPath } from "redux/actions/common/tabAction";

const Layout = ({ children, setTabs, tabs, setActiveTab }) => {
  const dispatch = useDispatch();

  //#region bookmark 코드
  const { bookMarkAll } = useSelector((state) => state.common);

  const [bookMarkList, setBookMarkList] = useState();

  const location = useLocation();

  useEffect(() => {
    dispatch(commonAction.getBookMark());
  }, []);

  useEffect(() => {
    setBookMarkList(bookMarkAll.data);
  }, [bookMarkAll]);

  const addBookMark = async () => {
    const submitData = {
      company_id: 1,
      pageUrl: sessionStorage.getItem("current_page"),
    };
    try {
      const response = await api.post("/bookMark/add", submitData);
    } catch (error) {
      console.log(error);
    }
    dispatch(commonAction.getBookMark());
  };
  //#endregion

  function tabHandler(i) {
    setActiveTab(i);
  }

  return (
    <div className="wrap">
      <Dep1 />
      <div className="wd-100p">
        <Header />
        <div className="flex">
          <Dep2 bookMarkList={bookMarkList} />
          <div className="section_wrap">
            <div className="section_top">
              <div className="tap_wrap">
                <div>
                  <div onClick={() => tabHandler(0)}>tab{1}</div>
                </div>
                <div>
                  <div onClick={() => tabHandler(1)}>tab{2}</div>
                </div>
                <div></div>
              </div>
              <div>
                <BsBookmarkCheck
                  size={45}
                  color="#5390f0"
                  onClick={() => addBookMark()}
                  style={{
                    display: bookMarkList?.find(
                      (data) => data.pageUrl == location.pathname
                    )
                      ? "none"
                      : "",
                  }}
                />
                <BsBookmarkCheckFill
                  size={45}
                  color="#5390f0"
                  onClick={() => addBookMark()}
                  style={{
                    display: bookMarkList?.find(
                      (data) => data.pageUrl == location.pathname
                    )
                      ? ""
                      : "none",
                  }}
                />
              </div>
            </div>
            <Section>{children}</Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
