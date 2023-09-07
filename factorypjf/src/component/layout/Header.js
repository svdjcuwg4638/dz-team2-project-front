import React from "react";
import "../../style/layout/header.css";
import mainLogo from "../../img/mainLogo.png";

const Header = () => {
  return (
    <div>
      <div className="header_wrap">
        <div><img src={mainLogo} width={70} /></div>
        <div className="header_right">
          <div>김성민사원님 반갑습니다.</div>
          <div>
            <input type="text"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
