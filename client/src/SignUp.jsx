import { useState } from "react";
import axios from "axios";

export default function SignUp({ signInHandler, suModalHandler }) {
  const [isSame, setIsSame] = useState("input");
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const signUpInfoHandler = (name, value) => {
    if (name === "phoneNumber") {
      setSignUpInfo({
        ...signUpInfo,
        [name]: value
          .split("")
          .filter((el) => typeof el === "Number")
          .join(""),
      });
    }
    setSignUpInfo({ ...signUpInfo, [name]: value });
    if (
      (name === "passwordConfirm" && value === signUpInfo.password) ||
      (name === "password" && value === signUpInfo.passwordConfirm)
    )
      setIsSame("input true");
  };

  const requestSignUp = async () => {
    let { email, name, password, phoneNumber } = signUpInfo;
    if (!Object.values(signUpInfo).filter((el) => !el.length).length) {
      await axios
        .post(`${process.env.TEMPLATE_API}/user/signup`, {
          email,
          name,
          password,
          phoneNumber,
        })
        .then((res) => {
          // email 겹치는지 확인하는 기능 나중에 추가
          if (res.status === 200) signInHandler(true);
        });
    } else alert("모든 칸을 입력하세요! 😺");
  };

  return (
    <div className="signUp-modal signModal">
      <h1>회원가입</h1>
      <form>
        <label>
          이메일
          <input
            name="email"
            type="text"
            placeholder="e-mail@gmail.com"
            onChange={(e) => signUpInfoHandler(e.target.name, e.target.value)}
          ></input>
        </label>
        <label>
          이름
          <input
            name="name"
            type="text"
            placeholder="Andrew"
            onChange={(e) => signUpInfoHandler(e.target.name, e.target.value)}
          ></input>
        </label>
        <label>
          비밀번호
          <input
            name="password"
            type="password"
            placeholder="password"
            className={isSame}
            onChange={(e) => signUpInfoHandler(e.target.name, e.target.value)}
          ></input>
        </label>
        <label>
          비밀번호 확인
          <input
            name="passwordConfirm"
            type="password"
            placeholder="password"
            className={isSame}
            onChange={(e) => signUpInfoHandler(e.target.name, e.target.value)}
          ></input>
        </label>
        <label>
          휴대폰번호
          <input
            name="phoneNumber"
            type="text"
            placeholder="01012345678"
            onChange={(e) => signUpInfoHandler(e.target.name, e.target.value)}
          ></input>
        </label>
        <button className="btn signBtn" type="button" onClick={requestSignUp}>
          회원가입
        </button>
      </form>
      <button className="btn closeModal" type="button" onClick={suModalHandler}>
        X
      </button>
    </div>
  );
}
