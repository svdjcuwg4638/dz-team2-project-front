import React from "react";
import Dep1 from "./Dep1";
import Dep2 from "./Dep2";
import Header from "./Header";
import Section from "./Section";
import { BiBookmark } from "react-icons/bi";


const Layout = ({ children }) => {
  return (
    <div className="wrap">
      <Dep1 />
      <div className="wd-100p">
        <Header />
        <div className="flex">
          <Dep2 />
          <div className="section_wrap">
            <div className="section_top">
              <div className="tap_wrap">
                <div><span>tab1</span><span>x</span></div>
                <div><span>tab1</span><span>x</span></div>
                <div><span>tab1</span><span>x</span></div>
              </div>
              <div>
                <BiBookmark size={45}/>
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
