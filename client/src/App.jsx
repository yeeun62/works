import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templatepage from "./pages/Templatepage";
import Mypage from "./pages/Mypage";

function App() {
	return (
		<BrowserRouter>
			<div className="w-3/5 m-auto">
				<Routes>
					<Route path="/" element={<Templatepage />} />
					<Route path="/mypage" element={<Mypage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
