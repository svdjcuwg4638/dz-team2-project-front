import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "style/Table.css";
import Layout from "./component/layout/Layout";
import Storage from "./component/management/storage/Storage";
import Management from "./pages/Management";
import Partner from "./component/management/partner/Partner";
import Item from "./component/management/item/Item";
import UnitPrice from "./component/management/unitPrice/UnitPrice";
import Code from "component/management/code/Code";
import StorageRoutes from "./pages/Storage";
import StorageInquiry from "./component/storage//item/Inquiry";
import Registration from "./component/storage/registration/Registration";
import ProductionRoutes from "router/ProductionRoutes";
import InboundRoutes from "router/InboundRoutes";
import OutboundRoutes from "router/OutboundRoutes";
import ItemRelation from "component/management/itemRelation/ItemRelation";
import { useCallback, useEffect, useState } from "react";
import Main from "pages/Main";
// import InBound from "component/management/inbound/InBound";
import { MovementsList } from "component/storage/movement/MovementsList";
import Movement from "component/storage/movement/Movement";

function App() {
  //#region 현재위치 세션저장
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();

  const navi = useNavigate();

  if (location.pathname == "/") {
    navi("/1/");
  }
  useEffect(() => {
    console.log('crtab',sessionStorage.getItem('current_tab'));
    setCurrentPage(location.pathname);
    sessionStorage.setItem("current_page", location.pathname);
    sessionStorage.setItem('currnet_tab',location.pathname.split('/')[1])
  }, [location]);
  //#endregion

  return (
    <Layout>
      <Routes>
        <Route path={"/:tabId/"} element={<Main />} />

        <Route path="/:tabId/storage" element={<StorageRoutes />}>
          <Route index path="list" element={<StorageInquiry />} />
          <Route path="movement" element={<Movement />} />
          <Route path="movementsList" element={<MovementsList />} />
          <Route path="registration" element={<Registration />} />
        </Route>

        <Route path="/:tabId/production/*" element={<ProductionRoutes />} />

        <Route path="/:tabId/inbound/*" element={<InboundRoutes/>}/>
        <Route path="/:tabId/outbound/*" element={<OutboundRoutes/>}/>
          
        <Route path="/:tabId/management" element={<Management />}>
          <Route index path="item" element={<Item />} />
          <Route path="storage" element={<Storage />} />
          <Route path="partner" element={<Partner />} />
          <Route path="unitprice" element={<UnitPrice />} />
          <Route path="code" element={<Code />} />
          <Route path="relation" element={<ItemRelation />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
