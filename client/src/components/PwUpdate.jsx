import { useState } from "react";
import axios from "axios";

export default function PwUpdate() {
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
			if (!e.target.value.length)
				return setWarning({
					...warning,
					pw: "",
				});
			else if (1 <= e.target.value.length && e.target.value.length <= 4)
				return setWarning({
					...warning,
					pw: "비밀번호를 다섯 글자 이상 입력해주세요.",
					pwColor: "red",
				});
			else if (e.target.value.length >= 5) {
				setWarning({
					...warning,
					pw: "적합한 비밀번호입니다.",
					pwColor: "#0ea5e9",
				});
			}
		} else {
			if (!e.target.value.length)
				return setWarning({
					...warning,
					pwConfirm: "",
				});
			else if (e.target.value === newPw.pw && e.target.value.length >= 5)
				setWarning({
					...warning,
					pwConfirm: "비밀번호가 일치합니다.",
					conColor: "#0ea5e9",
				});
			else
				setWarning({
					...warning,
					pwConfirm: "비밀번호가 일치하지 않습니다.",
					conColor: "red",
				});
		}
	};

  const updateHandler = async () => {
    if (
      newPw.pw.length >= 5 &&
      warning.pwColor !== "red" &&
      warning.conColor !== "red"
    ) {
      let postReq = await axios.post(
        `${process.env.REACT_APP_TEMPLATE_API_URL}/user/patchUser`,
        { data: newPw.pw },
        { withCredentials: true }
      );
      if (postReq.status === 200) {
        alert(postReq.data.message);
        window.location.reload();
      } else {
        alert(postReq.data.message);
      }
    } else {
      alert("올바른 비밀번호가 아닙니다👻");
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
					className="pwConfirm"
					type="password"
					placeholder="한 번 더 입력해주세요"
					minLength={5}
					name="pwConfirm"
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
