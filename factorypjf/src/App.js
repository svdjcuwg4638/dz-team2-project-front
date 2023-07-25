import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./component/Navigation";
import Main from "./pages/Main";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
