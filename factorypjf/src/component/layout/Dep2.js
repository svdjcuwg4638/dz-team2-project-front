import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../style/layout/dep2.css";
import { Link, useLocation } from "react-router-dom";
import { menuActions } from "redux/reducers/menu";

const Dep2 = ({ bookMarkList, currentTab, subMenu }) => {
  const currentMenu = useSelector((state) => state.currentMenu.currentMenu);

  const location = useLocation();
  const pathParts = location.pathname.split("/").slice(2);
  const currentPage = pathParts.length > 0 ? "/" + pathParts.join("/") : location.pathname;


  const dispatch = useDispatch();

  const currentMenuName = useSelector(
    (state) => state.currentMenu.currentMenuName
  );

  function findMenuNameByUrl(url) {
    for (let menuKey in subMenu) {
      for (let menuItem of subMenu[menuKey]) {
        if (menuItem.link.split("/")[1] === url.split("/")[2]) {
          return menuItem.name;
        }
      }
    }
    return null;
  }

  function setMenu(url) {
    const menu = findMenuByUrl(url);
    if (menu) {
      dispatch(menuActions.setBookmarkMenu(menu));
    }
  }

  function findMenuByUrl(url) {
    let menuValue = url.split("/")[1];
    let menuNameValue = "";

    if (menuValue === "management") {
      menuNameValue = "기준정보관리";
    } else if (menuValue === "production") {
      menuNameValue = "생산관리";
    } else if (menuValue === "inbound") {
      menuNameValue = "입고관리";
    } else if (menuValue === "outbound") {
      menuNameValue = "출고관리";
    } else if (menuValue === "storage") {
      menuNameValue = "재고관리";
    }

    return { menu: menuValue, menuName: menuNameValue };
  }

  useEffect(() => {
    console.log(currentPage);
  }, [currentTab]);

  return (
    <div className="dep2_wrap">
      <div className="menu1">
        <div>
          <div className="menu_title">
            {/* <div>
              <LuFactory
                size={40}
                color="#fff"
                style={{ display: currentMenu == "production" ? "" : "none" }}
              />
              <FiPlusSquare
                size={40}
                color="#fff"
                style={{ display: currentMenu == "inbound" ? "" : "none" }}
              />
              <FiMinusSquare
                size={40}
                color="#fff"
                style={{ display: currentMenu == "outbound" ? "" : "none" }}
              />
              <MdOutlineInventory2
                size={40}
                color="#fff"
                style={{ display: currentMenu == "storage" ? "" : "none" }}
              />
              <BsInfoCircle
                size={40}
                color="#fff"
                style={{ display: currentMenu == "management" ? "" : "none" }}
              />
            </div> */}
            <div>{currentMenuName}</div>
          </div>
          <div className="menu_sub_wrap">
            {currentTab &&
              subMenu[currentMenu].map((el, index) => (
                <div>
                  <div
                    key={index}
                    style={{
                      backgroundColor:
                        "/" + currentMenu + el.link == currentPage
                          ? "#5390F0"
                          : "",
                    }}
                  >
                    <Link to={"/" + currentTab + "/" + currentMenu + el.link}>
                      <div
                        style={{
                          color:
                            "/" + currentMenu + el.link == currentPage
                              ? "#fff"
                              : "",
                        }}
                      >
                        {el.name}
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="menu2">
        <div className="menu_title">
          {/* <div>
            <BsFillBookmarkFill size={25} color="#fff" />
          </div> */}
          <div>즐겨찾기</div>
        </div>
        <div className="menu_sub_wrap">
          {bookMarkList &&
            bookMarkList.map((data, index) => (
              <div>
                <div>
                  <Link to={"/" + currentTab + data.pageUrl} onClick={() => setMenu(data.pageUrl)}>
                    <div>{findMenuNameByUrl(data.pageUrl)}</div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dep2;
