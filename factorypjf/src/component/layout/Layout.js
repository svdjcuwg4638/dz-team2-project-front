import React from "react";
import Dap1 from "./Dap1";
import Dap2 from "./Dap2";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Dap1 />
      <div className="wd_100p">
        <Header />
        <div className="flex">
          <Dap2 />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
