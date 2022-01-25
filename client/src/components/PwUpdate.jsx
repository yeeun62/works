import { useState } from "react";
import axios from "axios";

export default function PwUpdate() {
  const [alertComment, setAlertComment] = useState("");
  const [newPw, setNewPw] = useState({ pw: "", confirm: "" });
  const [warning, setWarning] = useState({
    pw: "",
    confirm: "",
    pwColor: "red",
    conColor: "red",
  });

  const pwHandler = (e) => {
    setNewPw({ ...newPw, [e.target.name]: e.target.value });
    warningHandler({ [e.target.name]: e.target.value });
    // let temp = { [e.target.name]: e.target.value };
    // if (temp.pw) {
    //   if (temp.pw !== newPw.confirm) {
    //     setAlertComment("비밀번호가 일치하지 않습니다.");
    //     setWarning({
    //       ...warning,
    //       confirm: "비밀번호가 일치하지 않습니다.",
    //       conColor: "red",
    //     });
    //   } else {
    //     setAlertComment("");
    //     setWarning({
    //       ...warning,
    //       confirm: "비밀번호가 일치합니다.",
    //       conColor: "#0ea5e9",
    //     });
    //   }
    //   console.log(warning);
    //   if (temp.pw.length >= 5) {
    //     setAlertComment("");
    //     setWarning({
    //       ...warning,
    //       pw: "사용가능한 비밀번호입니다.",
    //       pwColor: "#0ea5e9",
    //     });
    //   } else {
    //     setAlertComment("비밀번호는 5자리 이상이여야 합니다");
    //     setWarning({
    //       ...warning,
    //       pw: "비밀번호는 5자리 이상이여야 합니다",
    //       pwColor: "red",
    //     });
    //   }
    // } else if (temp.confirm) {
    //   if (temp.confirm !== newPw.pw) {
    //     setAlertComment("비밀번호가 일치하지 않습니다.");
    //     setWarning({
    //       ...warning,
    //       confirm: "비밀번호가 일치하지 않습니다.",
    //       conColor: "red",
    //     });
    //   } else if (temp.confirm === newPw.pw) {
    //     setAlertComment("");
    //     setWarning({
    //       ...warning,
    //       confirm: "비밀번호가 일치합니다.",
    //       conColor: "#0ea5e9",
    //     });
    //   }
    // }
    // ---------------------------------
    // if (e.target.name === "pw") {
    //   if (1 <= e.target.value.length && e.target.value.length < 5) {
    //     setAlertComment("비밀번호는 5자리 이상이여야 합니다");
    //     setWarning({
    //       ...warning,
    //       pw: "비밀번호는 5자리 이상이여야 합니다",
    //       pwColor: "red",
    //     });
    //   } else if (e.target.value.length >= 5) {
    //     setAlertComment("");
    //     setWarning({
    //       ...warning,
    //       pw: "사용가능한 비밀번호입니다.",
    //       pwColor: "#0ea5e9",
    //     });
    //   }
    // } else if (e.target.name === "confirm") {
    //   if (newPw.pw !== e.target.value) {
    //     setAlertComment("비밀번호가 일치하지 않습니다.");
    //     setWarning({
    //       ...warning,
    //       confirm: "비밀번호가 일치하지 않습니다.",
    //       conColor: "red",
    //     });
    //   } else if (newPw.pw === e.target.value) {
    //     setAlertComment("");
    //     setWarning({
    //       ...warning,
    //       confirm: "비밀번호가 일치합니다.",
    //       conColor: "#0ea5e9",
    //     });
    //   }
    // }
  };

  const warningHandler = (temp) => {
    if (temp.pw === newPw.confirm || temp.confirm === newPw.pw) {
      console.log("같은가?!!?", temp);
      if (temp.pw) {
        if (temp.pw.length >= 5) {
          setWarning({
            pw: "사용가능한 비밀번호입니다.",
            pwColor: "#0ea5e9",
            confirm: "비밀번호가 일치합니다.",
            conColor: "#0ea5e9",
          });
        } else {
          setAlertComment("비밀번호는 5자리 이상이여야 합니다");
          setWarning({
            pw: "비밀번호는 5자리 이상이여야 합니다",
            pwColor: "red",
            confirm: "비밀번호가 일치합니다.",
            conColor: "#0ea5e9",
          });
        }
      } else if (temp.confirm) {
        setWarning({
          pw: "사용가능한 비밀번호입니다.",
          pwColor: "#0ea5e9",
          confirm: "비밀번호가 일치합니다.",
          conColor: "#0ea5e9",
        });
      }
    } else if (temp.pw !== newPw.confirm || temp.confirm !== newPw.pw) {
      setAlertComment("비밀번호가 일치하지 않습니다.");
      if (temp.pw) {
        if (temp.pw.length >= 5) {
          setWarning({
            pw: "사용가능한 비밀번호입니다.",
            pwColor: "#0ea5e9",
            confirm: "비밀번호가 일치하지 않습니다.",
            conColor: "red",
          });
        } else if (temp.pw.length < 5) {
          setAlertComment("비밀번호는 5자리 이상이여야 합니다");
          setWarning({
            ...warning,
            pw: "비밀번호는 5자리 이상이여야 합니다",
            pwColor: "red",
          });
        }
      } else if (temp.confirm) {
        setWarning({
          ...warning,
          confirm: "비밀번호가 일치하지 않습니다.",
          conColor: "red",
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
          //type="password"
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
          //type="password"
          placeholder="한 번 더 입력해주세요"
          minLength={5}
          name="confirm"
          onChange={pwHandler}
        />
        <span style={{ color: warning.conColor }}>{warning.confirm}</span>
      </label>
      <button type="button" onClick={updateHandler} className="pwUpdateBtn">
        비밀번호 변경
      </button>
    </div>
  );
}
