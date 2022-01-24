import { useState, useEffect } from "react";

export default function PwCheck({ pwCheckHandler }) {
  const [pwCheck, setPwCheck] = useState("");

  return (
    <div>
      비밀번호 인증
      <input
        placeholder="비밀번호를 입력해주세요"
        className="border"
        type="password"
        onChange={(e) => setPwCheck(e.target.value)}
      />
      <button onClick={() => pwCheckHandler(pwCheck)}>확인</button>
    </div>
  );
}
