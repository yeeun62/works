import { useState } from "react";
import axios from "axios";

export default function SignIn({ signInHandler, siModalHandler }) {
  const [signInInfo, setSignInInfo] = useState({ id: "", pw: "" });

  const signInInfoHandler = (name, value) => {
    setSignInInfo({ ...signInInfo, [name]: value });
  };

  const requestSignIn = async () => {
    if (signInInfo.id.length > 0 && signInInfo.pw.length > 0) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_TEMPLATE_API_URL}/user/signin`,
          signInInfo
        )
        .then((res) => {
          if (res.status === 200) signInHandler(true);
          else console.log(res);
        });
    } else alert("모든 칸을 입력해주세요 ✌️");
  };

  return (
    <div className="signIn dim">
      <div className="signIn modal">
        <h1>SIGN IN</h1>
        <form>
          <input
            name="email"
            type="text"
            placeholder="e-mail@gmail.com"
            onChange={(e) => signInInfoHandler(e.target.name, e.target.value)}
          ></input>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => signInInfoHandler(e.target.name, e.target.value)}
          ></input>
          <button type="button" onClick={requestSignIn}>
            SIGN IN
          </button>
        </form>
        <button type="button" onClick={siModalHandler}>
          닫기
        </button>
      </div>
    </div>
  );
}
