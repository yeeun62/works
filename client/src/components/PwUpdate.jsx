import { useState } from "react";
import axios from "axios";

export default function PwUpdate() {
	const [alertComment, setAlertComment] = useState("");
	const [newPw, setNewPw] = useState({ pw: "", confirm: "" });
	const [warning, setWarning] = useState({
		pw: "",
		pwConfirm: "",
		pwColor: "red",
		conColor: "red",
	});

	const pwHandler = (e) => {
		setNewPw({ ...newPw, [e.target.name]: e.target.value });

		if (e.target.name === "pw") {
			if (1 <= e.target.value.length && e.target.value.length < 5) {
				setAlertComment("비밀번호는 5자리 이상이여야 합니다");
				setWarning({
					...warning,
					pw: "비밀번호는 5자리 이상이여야 합니다",
					pwColor: "red",
				});
			} else if (e.target.value.length >= 5) {
				setAlertComment("");
				setWarning({
					...warning,
					pw: "사용가능한 비밀번호입니다.",
					pwColor: "#0ea5e9",
				});
			}
		} else if (e.target.name === "confirm") {
			if (newPw.pw !== e.target.value) {
				setAlertComment("비밀번호가 일치하지 않습니다.");
				setWarning({
					...warning,
					pwConfirm: "비밀번호가 일치하지 않습니다.",
					conColor: "red",
				});
			} else if (newPw.pw === e.target.value) {
				setAlertComment("");
				setWarning({
					...warning,
					pwConfirm: "비밀번호가 일치합니다.",
					conColor: "#0ea5e9",
				});
			}
		}
	};

	const updateHandler = async () => {
		if (!newPw.pw) {
			window.alert("변경하실 비밀번호를 입력해주세요!");
		} else if (!newPw.confirm) {
			window.alert("비밀번호 확인을 입력해주세요!");
		} else if (!alertComment) {
			let postReq = await axios.post(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/user/patchUser`,
				{ data: newPw.pw },
				{ withCredentials: true }
			);
			if (postReq.status === 200) {
				alert(postReq.data.message);
				window.location.reload();
			}
		} else if (alertComment) {
			window.alert(alertComment);
		}
	};

	return (
		<div className="pwUpdateWrapper">
			<label>
				새로운 비밀번호
				<input
					className="pw"
					type="password"
					placeholder="새로운 비밀번호를 입력하세요"
					minLength={5}
					name="pw"
					onChange={pwHandler}
				/>
				<span style={{ color: warning.pwColor }}>{warning.pw}</span>
			</label>
			<label>
				비밀번호 확인
				<input
					className="confirm"
					type="password"
					placeholder="한 번 더 입력해주세요"
					minLength={5}
					name="confirm"
					onChange={pwHandler}
				/>
				<span style={{ color: warning.conColor }}>{warning.pwConfirm}</span>
			</label>
			<button type="button" onClick={updateHandler} className="pwUpdateBtn">
				비밀번호 변경
			</button>
		</div>
	);
}
