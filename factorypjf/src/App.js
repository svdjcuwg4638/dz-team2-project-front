import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./component/layout/Layout";
import Storage from "./component/management/Storage";
import Management from "./pages/Management";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/management" element={<Management />}>
          <Route index path="storage" element={<Storage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
