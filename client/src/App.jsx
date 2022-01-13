import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templatepage from "./pages/Templatepage";
import Mypage from "./pages/Mypage";
import Templateidpage from "./pages/Templateidpage";

function App() {
  return (
    <BrowserRouter>
      <div className="w-3/5 m-auto mb-10">
        <Routes>
          <Route path="/" element={<Templatepage />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/template" element={<Templateidpage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
