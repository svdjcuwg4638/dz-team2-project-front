import React, { useEffect, useState } from "react";
import Dep1 from "./Dep1";
import Dep2 from "./Dep2";
import Header from "./Header";
import Section from "./Section";
import { useDispatch, useSelector } from "react-redux";
import api from "redux/api";
import { commonAction } from "redux/actions/common/commonAction";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { useLocation, useNavigate  } from "react-router-dom";

const Layout = ({ children}) => {
  const dispatch = useDispatch();

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

  const navi = useNavigate();

  //#region bookmark 코드
  
  const { bookMarkAll } = useSelector((state) => state.common);

  const [bookMarkList, setBookMarkList] = useState();

  const location = useLocation();

  useEffect(() => {
    dispatch(commonAction.getBookMark());
  }, []);

  useEffect(() => {
    setBookMarkList(bookMarkAll.data);
  }, [bookMarkAll]);

  const addBookMark = async () => {
    const submitData = {
      company_id: "1",
      pageUrl: sessionStorage.getItem("current_page"),
    };
    try {
      const rsponse = await api.post("/bookMark/add", submitData);
    } catch (error) {
      console.log(error);
    }
    dispatch(commonAction.getBookMark());
  };
  //#endregion
  
  sessionStorage.setItem('current_tab',1)

  const initialTabList = JSON.parse(sessionStorage.getItem('tab_list')) || [1];
  const [tabs, setTabs] = useState(initialTabList);

  const [currentTab, setCurrentTab] = useState(sessionStorage.getItem('current_tab') || 1);

  useEffect(() => {
    sessionStorage.setItem('tab_list', JSON.stringify(tabs));
  }, [tabs]);
  
  // 탭을 추가했을 때
  const addTab = () => {
    const maxTabNumber = Math.max(...tabs);
    const newTab = maxTabNumber + 1;
    setTabs(prevTabs => [...prevTabs, newTab]);
    sessionStorage.setItem(`tab_${currentTab}_url`, sessionStorage.getItem('current_page')); // 현재 탭의 URL 저장
    sessionStorage.setItem('current_tab',newTab) // 현재 탭을 새 탭으로 설정
    setCurrentTab(newTab)
    navi(newTab + '/'); // 초기 URL로 이동
  };

  const removeTab = (tabToRemove) => {
    setTabs(prevTabs => prevTabs.filter(tab => tab !== tabToRemove));
  };

  // 탭을 클릭했을 때
  const handleTabClick = (tab) => {
    sessionStorage.setItem(`tab_${currentTab}_url`, sessionStorage.getItem('current_page')); // 현재 탭의 URL 저장
    sessionStorage.setItem('current_tab',tab)
    setCurrentTab(tab)
    const lastUrl = sessionStorage.getItem(`tab_${tab}_url`);
    if (lastUrl) {
      navi(lastUrl);
    } else {
      navi(tab + '/');
    }
  };

  function findTabNameByURL(url) {
    // 주어진 URL을 "/" 로 split
    const splitURL = url.split('/');
  
    // /0/management/item의 경우 "management"를 가져옵니다.
    const menuKey = splitURL[2];
  
    // "management"를 통해 해당 서브 메뉴 항목을 가져옵니다.
    const items = subMenu[menuKey];
  
    // 가져온 서브 메뉴 항목에서 주어진 URL과 일치하는 항목을 찾아 name을 반환합니다.
    for (let item of items) {
      if (item.link === '/' + splitURL[3]) {
        return item.name;
      }
    }
  
    // 일치하는 항목을 찾을 수 없는 경우 null을 반환합니다.
    return null;
  }



  return (

    <div className="wrap">
      <Dep1 />
      <div className="wd-100p">
        <Header />
        <div className="flex">
          <Dep2 bookMarkList={bookMarkList} currentTab={currentTab} subMenu={subMenu} />
          <div className="section_wrap">
            <div className="section_top">
              <div className="tap_wrap">
                {tabs.map(tab => (
                  <div key={tab} onClick={() => handleTabClick(tab)}>
                    tab {tab}
                    <button onClick={() => removeTab(tab)}>x</button>
                  </div>
                ))}
                <button onClick={() => addTab()}>+</button>
              </div>
              <div>
                <BsBookmarkCheck
                  size={45}
                  color="#5390f0"
                  onClick={() => addBookMark()}
                  style={{
                    display: bookMarkList?.find(
                      (data) => data.pageUrl == location.pathname
                    )
                      ? "none"
                      : "",
                  }}
                />
                <BsBookmarkCheckFill
                  size={45}
                  color="#5390f0"
                  onClick={() => addBookMark()}
                  style={{
                    display: bookMarkList?.find(
                      (data) => data.pageUrl == location.pathname
                    )
                      ? ""
                      : "none",
                  }}
                />
              </div>
            </div>
              <Section idx='1'>{children}</Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
