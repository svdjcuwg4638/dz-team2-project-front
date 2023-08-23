import { Route, Routes } from "react-router-dom";
import "style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "component/layout/Layout";
import ProductionRoutes from "router/ProductionRoutes";
import InboundRoutes from 'router/InboundRoutes'
import StorageRoutes from 'router/StorageRoutes'


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/production/*" element={<ProductionRoutes/>}/>
        {/* <Route path="/inbound/*" element={<InboundRoutes/>}/>
        <Route path="/storage/*" element={<StorageRoutes/>}/> */}
      </Routes>
    </Layout>
  );
}

export default App;
