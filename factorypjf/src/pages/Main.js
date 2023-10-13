import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ImUserTie } from "react-icons/im";
import { getAxios } from "function/axiosFuction";
import { Link } from "react-router-dom";
import { menuActions } from "redux/reducers/menu";
const Main = () => {
  const dispatch = useDispatch();

  const [summary, setSummary] = useState({
    inventory: "",
    inBound: "",
    outBound: "",
    production: "",
  });

  useEffect(() => {
    getAxios("main", null, success, fail);
  }, []);
  function success(data) {
    let obj = {};
    for (let key in data.data) {
      if (data.data[key] === null) {
        obj[key] = "0";
      } else {
        obj[key] = data.data[key];
      }
    }
    setSummary(obj);
    console.log(summary);
  }
  function fail(data) {
    console.log(data);
  }



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

  const [currentTab, setCurrentTab] = useState(
    sessionStorage.getItem("current_tab") || 1
  );

  return (
    <div className="section-main">
      {/* <div className='main_box_wrap'>
        <div>
          <ImUserTie size={40}/>
          <div>김성민</div>
        </div>
        <div>
          <ImUserTie size={40}/>
          <div>옥승철</div>
        </div>
        <div>
          <ImUserTie size={40}/>
          <div>최원호</div>
        </div>
        <div>
          <ImUserTie size={40}/>
          <div>김대현</div>
        </div>
      </div> */}
      <div className="main_header">
        <div className="header_title">DISTRIBUTION SOLUTION</div>
      </div>
      <div className="main_content">
        <div className="content_left">
          <div className="notice_label">NOTICE</div>
          <div className="notice_wrap">
            안녕하세요. 물류관리 시스템입니다.
            <br></br>
            <br></br>
            &nbsp; - 정기점검일 안내: 10/9~10/12<br></br>
            &nbsp; - 물류관리 시스템 안내
          </div>
        </div>
        <div className="content_middle">
          <div className="notice_label">TODAY</div>
          <div className="summary_wrap">
            <div className="wrap-summary">
              <h4 className="summary_title">입고량</h4>
              <a href={`/${currentTab}/inbound/end`} onClick={inboundHandler}>
                <div className="summary_content">{summary.inBound}&nbsp;건</div>
              </a>
            </div>
            <div className="wrap-summary">
              <h4 className="summary_title">출고량</h4>
              <a href={`/${currentTab}/outbound/end`} onClick={outboundHandler}>
              <div className="summary_content">{summary.outBound}&nbsp;건</div>
              </a>
            </div>
            <div className="wrap-summary">
              <h4 className="summary_title">생산량</h4>
              <a href={`/${currentTab}/production/list`} onClick={productionHandler}>
              <div className="summary_content">
                {summary.production}&nbsp;건
              </div>
              </a>
            </div>
          </div>
        </div>
        <div className="content_right">
          <Link to={`/${currentTab}/production/add`}  onClick={productionHandler}>
            <div className="menu-link">
              <div className="link_text">생산관리 + </div>
              <div className="link_icon">
                <i class="fa-solid fa-industry"></i>
              </div>
            </div>
          </Link>
          <Link to={`/${currentTab}/storage/list`} onClick={storageHandler}>
            <div className="menu-link">
              <div className="link_text">재고관리 + </div>
              <div className="link_icon">
                <i class="fa-solid fa-box"></i>
              </div>
            </div>
          </Link>
          <Link to={`/${currentTab}/inbound/start`} onClick={inboundHandler}>
            <div className="menu-link">
              <div className="link_text">입고관리 + </div>
              <div className="link_icon">
                <i class="fa-solid fa-right-to-bracket"></i>
              </div>
            </div>
          </Link>
          <Link to={`/${currentTab}/outbound/start`} onClick={outboundHandler}>
            <div className="menu-link">
              <div className="link_text">출고관리 + </div>
              <div className="link_icon">
                <i class="fa-solid fa-right-from-bracket"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
