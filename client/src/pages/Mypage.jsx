import { useState } from "react";
import Header from "../components/Header";
import PwCheck from "../components/PwCheck";
import UserInfo from "../components/UserInfo";
import axios from "axios";

export default function MyPage() {
	const [pwCheck, setPwCheck] = useState(false);

	const pwCheckHandler = async (pw) => {
		let postReq = await axios.post(
			`${process.env.REACT_APP_TEMPLATE_API_URL}/user/pwcheck`,
			{ data: pw },
			{ withCredentials: true }
		);
		if (postReq.status === 200) setPwCheck(true);
		console.log(postReq);
	};

	return (
		<div>
			<Header />
			<div className="myWrapper">
				{pwCheck ? <UserInfo /> : <PwCheck pwCheckHandler={pwCheckHandler} />}
			</div>
		</div>
	);
}
