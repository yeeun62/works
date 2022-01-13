import { useState } from "react";
import axios from "axios";
import "../style/modal.css";
import "../style/signIn.css";

export default function Signin({ signInHandler, modalHandler }) {
	const [signInInfo, setSignInInfo] = useState({ email: "", password: "" });

	const signInInfoHandler = (name, value) => {
		setSignInInfo({ ...signInInfo, [name]: value });
	};

	const requestSignIn = async () => {
		if (signInInfo.email.length > 0 && signInInfo.password.length > 0) {
			await axios
				.post(
					`${process.env.REACT_APP_TEMPLATE_API_URL}/user/signin`,
					signInInfo,
					{
						withCredentials: true,
						xsrfCookieName: "XSRF-TOKEN",
						xsrfHeaderName: "X-XSRF-TOKEN",
					}
				)
				.then((res) => {
					if (res.status === 200) {
						signInHandler(true);
					} else console.log(res);
				});
		} else alert("모든 칸을 입력해주세요 ✌️");
	};

	return (
		<>
			<h1>로그인</h1>
			<form>
				<label>
					이메일
					<input
						name="email"
						type="text"
						placeholder="e-mail@gmail.com"
						onChange={(e) => signInInfoHandler(e.target.name, e.target.value)}
					></input>
				</label>
				<label>
					비밀번호
					<input
						name="password"
						type="password"
						placeholder="password"
						onChange={(e) => signInInfoHandler(e.target.name, e.target.value)}
					></input>
				</label>
				<button className="btn signBtn" type="button" onClick={requestSignIn}>
					로그인
				</button>
			</form>
			<button
				className="btn closeModal"
				type="button"
				onClick={() => modalHandler(false)}
			>
				X
			</button>
		</>
	);
}
