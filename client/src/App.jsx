import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templatepage from "./pages/Templatepage";
import PurchaseDetail from "./pages/PurchaseDetail";
import Mypage from "./pages/Mypage";
import "./App.css";
import axios from "axios";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(async () => {
    let user = await axios.get(
      `${process.env.REACT_APP_TEMPLATE_API_URL}/user/userInfo`,
      {
        withCredentials: true,
      }
    );
    setUserInfo(user.data.userInfo);
  }, []);

  return (
    <BrowserRouter>
      <div className="w-3/5 m-auto mb-10 md:min-w-full sm:min-w-[320px]">
        <Routes>
          <Route path="/" element={<Templatepage userInfo={userInfo} />} />
          <Route path="/mypage" element={<Mypage userInfo={userInfo} />} />
          <Route
            path="/purchase/:id"
            element={<PurchaseDetail userInfo={userInfo} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
