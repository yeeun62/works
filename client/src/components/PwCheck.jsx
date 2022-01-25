import { useState, useEffect } from "react";

export default function PwCheck({ pwCheckHandler }) {
  const [pwCheck, setPwCheck] = useState("");

  return (
    <div>
      <span className="pwAuthLabel">비밀번호 변경 인증</span>
      <input
        placeholder="비밀번호를 입력해주세요"
        className="checkInput border"
        type="password"
        onChange={(e) => setPwCheck(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            return pwCheckHandler(pwCheck);
          }
        }}
      />
      <button
        type="button"
        onClick={() => pwCheckHandler(pwCheck)}
        style={{ padding: "2px", height: "1.5rem", lineHeight: "1.5rem" }}
      >
        확인
      </button>
    </div>
  );
}
