import { Route, Routes } from "react-router-dom";
import "style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "style/Table.css";
import Layout from "./component/layout/Layout";
import Storage from "./component/management/storage/Storage";
import Management from "./pages/Management";
import Partner from "./component/management/partner/Partner";
import Item from "./component/management/item/Item";
import Product from "./component/management/product/Product";
import UnitPrice from "./component/management/unitPrice/UnitPrice";
import Code from "component/management/code/Code";
import StorageRoutes from "./pages/Storage";
// import StorageItem from "./component/storage/item/List";
import StorageInquiry from "./component/storage/item/Inquiry ";
import Registration from "./component/storage/registration/Registration";

function App() {
  return (
    <Layout>
      <Routes>
        {/*
        <Route path="/production/*" element={<ProductionRoutes/>}/>
        <Route path="/inbound/*" element={<InboundRoutes/>}/>
        <Route path="/storage/*" element={<StorageRoutes/>}/>
        */}
        <Route path="/storage/" element={<StorageRoutes />}>
          {/* <Route path="" element={<StorageItem />} /> */}
          <Route path="" element={<StorageInquiry />} />
          <Route path="registration" element={<Registration />} />
        </Route>

        <Route path="/management" element={<Management />}>
          <Route index path="item" element={<Item />} />
          <Route path="storage" element={<Storage />} />
          <Route path="partner" element={<Partner />} />
          <Route path="product" element={<Product />} />
          <Route path="unitprice" element={<UnitPrice />} />
          <Route path="code" element={<Code />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
