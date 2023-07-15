import "antd/dist/antd.css";
import "./App.css";
import Route from "./router/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { initAxios } from "./utilities/utilities";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  initAxios(null);

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
};

export default App;
