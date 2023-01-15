import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import App1 from "./App1";
import App2 from "./App2";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App1 />} />
          <Route path="/app2" element={<App2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
