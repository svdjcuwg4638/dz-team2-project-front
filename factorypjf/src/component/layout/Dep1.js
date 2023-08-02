import React from "react";
import "../../style/layout/Dep1.css"
import { BsInfoCircle } from "react-icons/bs";
import { BiSolidFactory } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import { GoMoveToBottom, GoMoveToTop } from "react-icons/go";

const Dep1 = () => {
  return (
    <div className="dap1">
      <div className="icon_wrap">
        <div>
          <BiSolidFactory size={25} color="#fff" />
        </div>
        <div>
          <GoMoveToBottom size={25} color="#fff" />
        </div>
        <div>
          <GoMoveToTop size={25} color="#fff" />
        </div>
        <div>
          <MdOutlineInventory2 size={25} color="#fff" />
        </div>
        <div>
          <BsInfoCircle size={25} color="#fff" />
        </div>
      </div>
    </div>
  );
};

export default Dep1;
