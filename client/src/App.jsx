import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templatepage from "./pages/Templatepage";
import Mypage from "./pages/Mypage";
import PurchaseDetail from "./pages/purchaseDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="w-3/5 m-auto mb-10 md:min-w-full">
        <Routes>
          <Route path="/" element={<Templatepage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/purchase" element={<PurchaseDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
