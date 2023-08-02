import React from "react";
import "../../style/layout/Dep2.css";
import { BiSolidFactory } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";

const Dep2 = () => {
  return (
    <div className="dep2_wrap">
      <div className="menu1">
        <div>
          <div className="menu_title">
            <div>
              <BiSolidFactory size={40} color="#fff" />
            </div>
            <div>기준정보관리</div>
          </div>
          <div className="menu_sub_wrap">
            <div>
              <span>메뉴-1</span>
            </div>
            <div>
              <span>메뉴-2</span>
            </div>
            <div>
              <span>메뉴-3</span>
            </div>
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
