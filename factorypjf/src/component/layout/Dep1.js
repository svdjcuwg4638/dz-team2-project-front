import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import "style/layout/dep1.css";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuFactory } from "react-icons/lu";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { menuActions } from "../../redux/reducers/menu";

const Dep1 = ({ currentTab }) => {
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
  const managementHandler = () => {
    dispatch(menuActions.management());
  };

  const location = useLocation();
  const currentMenu = location.pathname.split("/")[2];

  return (
    <div className="dap1">
      <div className="icon_wrap">
        <Link to={currentTab + "/production/line"} onClick={productionHandler}>
          <div
            title="생산관리"
            style={{
              backgroundColor: currentMenu == "production" ? "#fff" : "",
            }}
          >
            <LuFactory
              size={25}
              color={currentMenu === "production" ? "#5390F0" : "#fff"}
            />
          </div>
        </Link>
        <Link to={currentTab + "/inbound/start"} onClick={inboundHandler}>
          <div
            title="입고관리"
            style={{
              backgroundColor: currentMenu == "inbound" ? "#fff" : "",
            }}
          >
            <FiPlusSquare
              size={25}
              color={currentMenu === "inbound" ? "#5390F0" : "#fff"}
            />
          </div>
        </Link>

        <Link to={currentTab + "/outbound/start"} onClick={outboundHandler}>
          <div
            title="출고관리"
            style={{
              backgroundColor: currentMenu == "outbound" ? "#fff" : "",
            }}
          >
            <FiMinusSquare
              size={25}
              color={currentMenu === "outbound" ? "#5390F0" : "#fff"}
            />
          </div>
        </Link>

        <Link to={currentTab + "/storage/list"} onClick={storageHandler}>
          <div
            title="재고관리"
            style={{
              backgroundColor: currentMenu == "storage" ? "#fff" : "",
            }}
          >
            <MdOutlineInventory2
              size={25}
              color={currentMenu === "storage" ? "#5390F0" : "#fff"}
            />
          </div>
        </Link>
        <Link to={currentTab + "/management/item"} onClick={managementHandler}>
          <div
            title="기준정보관리"
            style={{
              backgroundColor: currentMenu == "management" ? "#fff" : "",
            }}
          >
            <BsInfoCircle
              size={25}
              color={currentMenu === "management" ? "#5390F0" : "#fff"}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dep1;
