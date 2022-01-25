import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signinModal } from "../redux/modules/users";
import Header from "../components/Header";
import PwCheck from "../components/PwCheck";
import PwUpdate from "../components/PwUpdate";
import axios from "axios";
import "../style/myPage.css";

export default function MyPage() {
	const user = useSelector((state) => state.users);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [curPw, setCurPw] = useState("");
	const [pwCheck, setPwCheck] = useState(false);

	useEffect(() => {
		if (!user.isLogin) {
			navigate("/");
			window.alert("로그인을 먼저 해주세요!");
			dispatch(signinModal());
		}
	}, [user]);

	const pwCheckHandler = (curPw) => {
		try {
			if (curPw.length < 5) {
				return alert("5글자 이상으로 입력해주세요 🖐");
			}
			axios
				.post(
					`${process.env.REACT_APP_TEMPLATE_API_URL}/user/pwcheck`,
					{ data: curPw },
					{ withCredentials: true }
				)
				.then(() => setPwCheck(true));
		} catch (err) {
			if (err.response.status === 401) {
				window.alert(err.response.data.message);
			}
		}
	};

	return (
		<>
			<Header />
			<div className="myWrapper w-full mt-10">
				<div className="userInfoWrapper border-[#ddd] border lg:h-96 md: h-screen">
					{pwCheck ? <h1>비밀번호 수정</h1> : <h1>회원정보</h1>}
					{pwCheck ? (
						<PwUpdate />
					) : (
						<ul>
							<li>
								이메일 <span>{user.userInfo.email}</span>
							</li>
							<li>
								이름 <span>{user.userInfo.name}</span>
							</li>
							<li>
								휴대폰 번호 <span>{user.userInfo.phoneNumber}</span>
							</li>
							<li>
								비밀번호 변경 인증
								<span>
									<input
										placeholder="비밀번호를 입력해주세요"
										className="checkInput border"
										type="password"
										onChange={(e) => setCurPw(e.target.value)}
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												return pwCheckHandler(curPw);
											}
										}}
									/>
									<button
										type="button"
										onClick={() => pwCheckHandler(curPw)}
										style={{
											padding: "2px",
											height: "1.5rem",
											lineHeight: "1.5rem",
										}}
									>
										확인
									</button>
								</span>
							</li>
						</ul>
					)}
				</div>
			</div>
		</>
	);
}
