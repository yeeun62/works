import { useState } from "react";
import Header from "../components/Header";
import PwCheck from "../components/PwCheck";
import PwUpdate from "../components/PwUpdate";
import axios from "axios";
import "../style/myPage.css";

import { useSelector } from "react-redux";

export default function MyPage() {
  const user = useSelector((state) => state.users);
  const [pwCheck, setPwCheck] = useState(false);
  const pwCheckHandler = async (pw) => {
    if (pw.length < 5) return alert("5글자 이상으로 입력해주세요 🖐");
    let postReq = await axios.post(
      `${process.env.REACT_APP_TEMPLATE_API_URL}/user/pwcheck`,
      { data: pw },
      { withCredentials: true }
    );
    if (postReq.status === 200) setPwCheck(true);
    else if (postReq.status === 500) {
      console.log(postReq);
      // 틀렸을 때 왜인지 안 알려준당..
      window.alert("비밀번호가 일치하지 않습니다 🥲");
    }
  };

  return (
    <div>
      <Header />
      <div className="myWrapper w-full mt-10">
        <div className="userInfoWrapper border-[#ddd] border lg:h-96 md: h-screen">
          <h1>회원정보</h1>
          <ul>
            {pwCheck ? null : (
              <>
                <li>
                  이메일 <span>{user.userInfo.email}</span>
                </li>
                <li>
                  이름 <span>{user.userInfo.name}</span>
                </li>
                <li>
                  휴대폰 번호 <span>{user.userInfo.phoneNumber}</span>
                </li>
              </>
            )}
            <div className="pwInput">
              {pwCheck ? (
                <PwUpdate />
              ) : (
                <PwCheck pwCheckHandler={pwCheckHandler} />
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
