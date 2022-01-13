import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templatepage from "./pages/Templatepage";
import Mypage from "./pages/Mypage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Templatepage />}></Route>
				<Route path="/mypage" element={<Mypage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
