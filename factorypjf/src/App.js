import { Route, Routes } from "react-router-dom";
import "./style/App.css";
import "./style/Table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./component/layout/Layout";
import Storage from "./component/management/storage/Storage";
import Management from "./pages/Management";
import Partner from "./component/management/partner/Partner";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/management" element={<Management />}>
          <Route index path="storage" element={<Storage />} />
          <Route index path="partner" element={<Partner />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
