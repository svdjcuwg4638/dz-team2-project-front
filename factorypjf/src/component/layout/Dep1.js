import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "style/layout/dep1.css";
import { BsInfoCircle } from "react-icons/bs";
import { BiSolidFactory } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import { GoMoveToBottom, GoMoveToTop } from "react-icons/go";
import { menuActions } from "../../redux/reducers/menu";

const Dep1 = () => {
  const dispatch = useDispatch();
  const productionHandler = () => {
    dispatch(menuActions.production());
  };
  const inboundHandler = () => {
    dispatch(menuActions.inbound());
  };
  const outboundHandler = () => {
    dispatch(menuActions.outbound());
  };
  const storageHandler = () => {
    dispatch(menuActions.storage());
  };

  return (
    <div className="dap1">
      <div className="icon_wrap">
        <Link to="/production" onClick={productionHandler}>
          <div title="생산관리">
            <BiSolidFactory size={25} color="#fff" />
          </div>
        </Link>
        <Link to="/inbound" onClick={inboundHandler}>
          <div title="입고관리">
            <GoMoveToBottom size={25} color="#fff" />
          </div>
        </Link>
        <Link to="/outbound" onClick={outboundHandler}>
          <div title="출고관리">
            <GoMoveToTop size={25} color="#fff" />
          </div>
        </Link>
        <Link to="/storage" onClick={storageHandler}>
          <div title="재고관리">
            <MdOutlineInventory2 size={25} color="#fff" />
          </div>
        </Link>
        <div>
          <BsInfoCircle size={25} color="#fff" />
        </div>
      </div>
    </div>
  );
};

export default Dep1;
