import { useState } from "react";
import axios from "axios";

export default function UserInfo() {
  const [newPw, setNewPw] = useState({ pw: "", confirm: null });
  const updateHandler = async () => {
    let postReq = await axios.post(
      `${process.env.REACT_APP_TEMPLATE_API_URL}/user/update`,
      { data: newPw.pw },
      { withCredentials: true }
    );
    if (postReq.status === 200) alert(postReq.message);
  };

  return (
    <>
      <div>
        <label>
          <input
            className="pw"
            placeholder="새로운 비밀번호를 입력하세요"
            minLength={5}
            onChange={(e) => setNewPw({ ...newPw, pw: e.target.value })}
          />
        </label>
        <label>
          <input
            className="pwConfirm"
            placeholder="한 번 더 입력해주세요"
            minLength={5}
            onChange={(e) => {
              if (e.target.value === newPw.pw)
                setNewPw({ ...newPw, confirm: true });
              else setNewPw({ ...newPw, confirm: false });
            }}
          />
          {newPw.confirm ? (
            <span>비밀번호가 일치합니다.</span>
          ) : (
            <span>비밀번호가 일치하지 않습니다.</span>
          )}
        </label>
        <button type="button" onClick={updateHandler}>
          비밀번호 변경
        </button>
      </div>
    </>
  );
}
