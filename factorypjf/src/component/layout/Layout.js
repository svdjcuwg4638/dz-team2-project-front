import React, { useEffect, useState } from "react";
import Dep1 from "./Dep1";
import Dep2 from "./Dep2";
import Header from "./Header";
import Section from "./Section";
import { useDispatch, useSelector } from "react-redux";
import api from "redux/api";
import { commonAction } from "redux/actions/common/commonAction";
import {
  BsBookmarkCheck,
  BsBookmarkCheckFill,
  BsInfoCircle,
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { LuFactory } from "react-icons/lu";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineHome } from "react-icons/ai";
const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const subMenu = {
    production: [
      { link: "/add", name: "생산등록" },
      { link: "/list", name: "생산내역조회" },
      { link: "/line", name: "생산라인관리" },
    ],
    inbound: [
      { link: "", name: "입고예정" },
      { link: "/ongoing", name: "입고등록" },
      { link: "/end", name: "입고현황" },
    ],
    outbound: [
      { link: "", name: "출고예정" },
      { link: "/end", name: "출고현황" },
    ],
    management: [
      { link: "/item", name: "품목관리" },
      { link: "/relation", name: "소모자재관리" },
      { link: "/unitprice", name: "단가관리" },
      { link: "/storage", name: "창고관리" },
      { link: "/partner", name: "거래처관리" },
      { link: "/code", name: "공통코드관리" },
    ],
    storage: [
      { link: "/list", name: "재고조회" },
      { link: "/movement", name: "재고이동" },
      { link: "/movementsList", name: "재고이동내역" },
      { link: "/registration", name: "기초재고등록" },
      { link: "/movement", name: "재고이동" },
      { link: "/movementsList", name: "재고이동내역" },
    ],
  };

  const navi = useNavigate();

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
    const currentUrl = sessionStorage.getItem("current_page");
    const modifiedUrl = "/" + currentUrl.split("/").slice(2).join("/");

    const submitData = {
      company_id: 1,
      pageUrl: modifiedUrl,
    };
    try {
      const response = await api.post("/bookMark/add", submitData);
    } catch (error) {
      console.log(error);
    }
    dispatch(commonAction.getBookMark());
  };
  //#endregion

  sessionStorage.setItem("current_tab", 1);

  const initialTabList = JSON.parse(sessionStorage.getItem("tab_list")) || [1];
  const [tabs, setTabs] = useState(initialTabList);

  const [currentTab, setCurrentTab] = useState(
    sessionStorage.getItem("current_tab") || 1
  );

  useEffect(() => {
    sessionStorage.setItem("tab_list", JSON.stringify(tabs));
  }, [tabs]);

  // 탭을 추가했을 때
  const addTab = () => {
    const maxTabNumber = Math.max(...tabs);
    const newTab = maxTabNumber + 1;
    setTabs((prevTabs) => [...prevTabs, newTab]);
    sessionStorage.setItem(
      `tab_${currentTab}_url`,
      sessionStorage.getItem("current_page")
    ); // 현재 탭의 URL 저장
    sessionStorage.setItem("current_tab", newTab); // 현재 탭을 새 탭으로 설정
    setCurrentTab(newTab);
    navi(newTab + "/"); // 초기 URL로 이동
  };

  const removeTab = (tabToRemove) => {
    const newTabs = tabs.filter((tab) => tab !== tabToRemove);
    setTabs(newTabs);

    if (currentTab == tabToRemove) {
      const firstTab = newTabs[0];
      const url = sessionStorage.getItem(`tab_${firstTab}_url`);
      location.href = url;
    }
  };

  // 탭을 클릭했을 때
  const handleTabClick = (tab) => {
    sessionStorage.setItem(
      `tab_${currentTab}_url`,
      sessionStorage.getItem("current_page")
    ); // 현재 탭의 URL 저장
    sessionStorage.setItem("current_tab", tab);
    setCurrentTab(tab);
    const lastUrl = sessionStorage.getItem(`tab_${tab}_url`);
    if (lastUrl) {
      navi(lastUrl);
    } else {
      navi(tab + "/");
    }
  };

  const getCurrentIcon = (menu) => {
    switch (menu) {
      case "":
        return <AiOutlineHome size={20} color="#fff" />;
      case "production":
        return <LuFactory size={20} color="#fff" />;
      case "inbound":
        return <FiPlusSquare size={20} color="#fff" />;
      case "outbound":
        return <FiMinusSquare size={20} color="#fff" />;
      case "storage":
        return <MdOutlineInventory2 size={20} color="#fff" />;
      case "management":
        return <BsInfoCircle size={20} color="#fff" />;
      default:
        return null;
    }
  };

  const getDefaultCurrentIcon = (menu) => {
    switch (menu) {
      case "":
        return <AiOutlineHome size={20} color="#000" />;
      case "production":
        return <LuFactory size={20} color="#000" />;
      case "inbound":
        return <FiPlusSquare size={20} color="#000" />;
      case "outbound":
        return <FiMinusSquare size={20} color="#000" />;
      case "storage":
        return <MdOutlineInventory2 size={20} color="#000" />;
      case "management":
        return <BsInfoCircle size={20} color="#000" />;
      default:
        return null;
    }
  };

  const getNameByLink = (menuKey, link) => {
    const matchedMenu = subMenu[menuKey]?.find(
      (item) => item.link === "/" + link
    );
    return matchedMenu ? matchedMenu.name : "홈";
  };

  return (
    <div className="wrap">
      <Dep1 />
      <div className="wd-100p">
        <Header />
        <div className="flex">
          <Dep2
            bookMarkList={bookMarkList}
            currentTab={currentTab}
            subMenu={subMenu}
          />
          <div className="section_wrap">
            <div className="section_top">
              <div className="tab_wrap">
                {tabs.map((tab) => (
                  <div
                    className="tab_sub_wrap"
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    style={{
                      backgroundColor: tab == currentTab ? "#5390f0" : "#fff",
                    }}
                  >
                    {tab == currentTab && (
                      <>
                        <div
                          style={{
                            'margin-top': "0px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {getCurrentIcon(
                            sessionStorage
                              .getItem("current_page")
                              ?.split("/")[2]
                          )}
                        </div>
                        <div style={{ color: "#fff" }}>
                          {sessionStorage.getItem("current_page") &&
                            getNameByLink(
                              sessionStorage
                                .getItem("current_page")
                                ?.split("/")[2],
                              sessionStorage
                                .getItem("current_page")
                                ?.split("/")[3]
                            )}
                        </div>
                        <button
                          style={{
                            display: tabs.length > 1 ? "" : "none",
                          }}
                          className="tab-x-button"
                          onClick={() => removeTab(tab)}
                        >
                          <TiDeleteOutline
                            size={20}
                            color="#000"
                          ></TiDeleteOutline>
                        </button>
                      </>
                    )}

                    {tab != currentTab && (
                      <>
                        <div
                          style={{
                            margin: "0px 10px",
                            display: "flex",
                            alignItems: "center",
                            color: "#000",
                          }}
                        >
                          {sessionStorage.getItem("current_page") &&
                            getDefaultCurrentIcon(
                              sessionStorage
                                .getItem(`tab_${tab}_url`)
                                ?.split("/")[2]
                            )}
                        </div>
                        <div style={{ color: "#000" }}>
                          {getNameByLink(
                            sessionStorage
                              .getItem(`tab_${tab}_url`)
                              ?.split("/")[2],
                            sessionStorage
                              .getItem(`tab_${tab}_url`)
                              ?.split("/")[3]
                          )}
                        </div>
                        <button
                          style={{
                            display: tabs.length > 1 ? "" : "none",
                          }}
                          className="tab-x-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTab(tab);
                          }}
                        >
                          <TiDeleteOutline
                            size={20}
                            color="#000"
                          ></TiDeleteOutline>
                        </button>
                      </>
                    )}
                  </div>
                ))}
                <div className="tab_add_button_wrap" style={{ width: "30px" }}>
                  <button className="tab_add_button" onClick={() => addTab()}>
                    +
                  </button>
                </div>
              </div>
              <div
                style={{
                  display:
                    location.pathname.split("/").length <= 3 ? "none" : "",
                }}
              >
                <BsBookmarkCheck
                  size={35}
                  color="#5390f0"
                  onClick={() => addBookMark()}
                  style={{
                    display: bookMarkList?.find(
                      (data) =>
                        data.pageUrl ==
                        "/" +
                          location.pathname.split("/").slice(2).join("/").trim()
                    )
                      ? "none"
                      : "",
                  }}
                />
                <BsBookmarkCheckFill
                  size={35}
                  color="#5390f0"
                  onClick={() => addBookMark()}
                  style={{
                    display: bookMarkList?.find(
                      (data) =>
                        data.pageUrl ==
                        "/" +
                          location.pathname.split("/").slice(2).join("/").trim()
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
