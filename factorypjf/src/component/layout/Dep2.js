import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../style/layout/dep2.css";
import { BiSolidFactory } from "react-icons/bi";
import { BsFillBookmarkFill, BsInfoCircle } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { menuActions } from "redux/reducers/menu";
import { LuFactory } from "react-icons/lu";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";

const Dep2 = ({ bookMarkList }) => {
  const currentMenu = useSelector((state) => state.currentMenu.currentMenu);

  const dispatch = useDispatch();

  const currentMenuName = useSelector(
    (state) => state.currentMenu.currentMenuName
  );

  const subMenu = {
    production: [
      { link: "", name: "생산등록" },
      { link: "/list", name: "생산내역조회" },
      { link: "/line", name: "생산라인관리" },
    ],
    inbound: [
      { link: "", name: "입고예정" },
      { link: "/ing", name: "입고중" },
      { link: "/after", name: "입고완료" },
    ],
    outbound: [
      { link: "", name: "출고예정" },
      { link: "/ing", name: "출고중" },
      { link: "/after", name: "출고완료" },
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
      { link: "", name: "재고조회" },
      { link: "/registration", name: "기초재고등록" },
    ],
  };

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

  return (
    <div className="dep2_wrap">
      <div className="menu1">
        <div>
          <div className="menu_title">
            <div>
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
            </div>
            <div>{currentMenuName}</div>
          </div>
          <div className="menu_sub_wrap">
            {subMenu[currentMenu].map((el, index) => (
              <div key={index}>
                <Link to={currentMenu + el.link}>
                  <span>{el.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="menu2">
        <div className="menu_title">
          <div>
            <BsFillBookmarkFill size={25} color="#fff" />
          </div>
          <div>즐겨찾기</div>
        </div>
        <div className="menu_sub_wrap">
          {bookMarkList &&
            bookMarkList.map((data, index) => (
              <div key={index}>
                <Link to={data.pageUrl} onClick={() => setMenu(data.pageUrl)}>
                  <span>{findMenuNameByUrl(data.pageUrl)}</span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dep2;
