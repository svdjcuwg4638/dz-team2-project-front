import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../style/layout/dep2.css";
import { BiSolidFactory } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Dep2 = () => {
  const currentMenu = useSelector((state) => state.currentMenu.currentMenu);
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
    setting: [
      { link: "", name: "기준정보1" },
      { link: "/ing", name: "기준정보2" },
      { link: "/after", name: "기준정보3" },
    ],
    storage: [
      { link: "", name: "재고조회" },
      { link: "/registration", name: "기초재고등록" },
    ],
  };

  return (
    <div className="dep2_wrap">
      <div className="menu1">
        <div>
          <div className="menu_title">
            <div>
              <BiSolidFactory size={40} color="#fff" />
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
          <div>
            <span>즐겨찾기-1</span>
          </div>
          <div>
            <span>즐겨찾기-2</span>
          </div>
          <div>
            <span>즐겨찾기-3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dep2;
