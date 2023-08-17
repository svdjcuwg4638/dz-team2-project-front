import { Route, Routes } from "react-router-dom";
import "./style/App.css";
import "./style/Table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./component/layout/Layout";
import Storage from "./component/management/storage/Storage";
import Management from "./pages/Management";
import Partner from "./component/management/partner/Partner";
import Item from "./component/management/item/Item";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/management" element={<Management />}>
          <Route index path="item" element={<Item />} />
          <Route path="storage" element={<Storage />} />
          <Route path="partner" element={<Partner />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
