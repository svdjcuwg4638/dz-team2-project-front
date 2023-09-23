import React, { useEffect, useState } from "react";
import Dep1 from "./Dep1";
import Dep2 from "./Dep2";
import Header from "./Header";
import Section from "./Section";
import { BiBookmark } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import api from "redux/api";
import { commonAction } from "redux/actions/common/commonAction";
import {
  BsBookmarkCheck,
  BsBookmarkCheckFill,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

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
      company_id: "1",
      pageUrl: sessionStorage.getItem("current_page"),
    };
    try {
      const rsponse = await api.post("/bookMark/add", submitData);
    } catch (error) {
      console.log(error);
    }
    dispatch(commonAction.getBookMark());
  };

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
                  <span>tab1</span>
                  <span>x</span>
                </div>
                <div>
                  <span>tab1</span>
                  <span>x</span>
                </div>
                <div>
                  <span>tab1</span>
                  <span>x</span>
                </div>
              </div>
              <div>
                <BsBookmarkCheck
                  size={45}
                  color="#5390f0"
                  onClick={() => addBookMark()}
                  style={{ display:bookMarkList?.find((data)=> data.pageUrl == location.pathname) ? "none" : ""  }}
                />
                <BsBookmarkCheckFill
                  size={45}
                  color="#5390f0"
                  onClick={() => addBookMark()}
                  style={{ display:bookMarkList?.find((data)=> data.pageUrl == location.pathname) ? "" : "none"  }}
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
