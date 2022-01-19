import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templatepage from "./pages/Templatepage";
import PurchaseDetail from "./pages/PurchaseDetail";
import Mypage from "./pages/Mypage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="w-3/5 m-auto mb-10 md:min-w-full sm:overflow-auto sm:h-fit">
        <Routes>
          <Route path="/" element={<Templatepage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/purchase/:id" element={<PurchaseDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
