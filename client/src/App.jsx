import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Templatepage from "./pages/Templatepage";
import Mypage from "./pages/Mypage";
import "./App.css";
import axios from "axios";

function App() {
	const [userInfo, setUserInfo] = useState(null);

	useEffect(async () => {
		try {
			let user = await axios.get(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/user/userInfo`,
				{
					withCredentials: true,
				}
			);
			setUserInfo(user.data.userInfo);
		} catch {}
	}, []);

	return (
		<BrowserRouter>
			<div className="w-3/5 m-auto mb-10">
				<Routes>
					<Route path="/" element={<Templatepage userInfo={userInfo} />} />
					<Route path="/mypage" element={<Mypage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
