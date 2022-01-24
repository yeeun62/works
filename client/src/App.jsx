import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplatePage from "./pages/TemplatePage";
import PurchaseDetail from "./pages/PurchaseDetail";
import DocPage from "./pages/DocPage";
import MyPage from "./pages/MyPage";
import "./App.css";
import "./config";

function App() {
	return (
		<BrowserRouter>
			<div className="w-3/5 m-auto mb-10 md:min-w-full sm:overflow-auto sm:h-fit">
				<Routes>
					<Route path="/" element={<TemplatePage />} />
					<Route path="/docpage" element={<DocPage />} />
					<Route path="/purchase/:id" element={<PurchaseDetail />} />
					<Route path="/mypage" element={<MyPage />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
