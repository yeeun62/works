import React, { useState, useEffect } from "react";
import Link from "next/link";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import axios from "axios";

export default function Header({ isSignIn, signInHandler }) {
  const [siModal, setSimodal] = useState(false);
  const [suModal, setSumodal] = useState(false);
  const siModalHandler = () => setSimodal(!siModal);
  const suModalHandler = () => setSumodal(!suModal);
  const [location, setLocation] = useState(true);

  const getSignOut = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_TEMPLATE_API_URL}/user/signout`)
      .then((res) => {
        if (res.status === 200) signInHandler(false);
      });
  };

  useEffect(() => {
    if (window.location.pathname.toString().length <= 1) setLocation(true);
    // 템플릿 페이지
    else setLocation(false); // my page
  }, []);

  return (
    <header className="header w-9/12 h-1.5 m-auto bg-blend-multiply absolute top-0 border-b-slate-300 flex-auto">
      <Link href="/">
        <h1 className="handle-logo-font">handle</h1>
      </Link>
      <div className="navButtonList">
        {isSignIn ? (
          location ? (
            <>
              <Link href="/myPage">
                <button type="button" className="btn navBtn">
                  마이 페이지
                </button>
              </Link>
              <button type="button" className="btn navBtn">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/">
                <button
                  type="button"
                  className="btn navBtn"
                  onClick={getSignOut}
                >
                  템플릿 페이지
                </button>
              </Link>
              <button type="button" className="btn navBtn">
                로그아웃
              </button>
            </>
          )
        ) : (
          <>
            <button
              type="button"
              onClick={siModalHandler}
              className="btn navBtn"
            >
              로그인
            </button>
            <div
              className="modal-dim"
              style={{ display: siModal ? "block" : "none" }}
            >
              <SignIn
                signInHandler={signInHandler}
                siModalHandler={siModalHandler}
              ></SignIn>
            </div>
            <button
              type="button"
              onClick={suModalHandler}
              className="btn navBtn"
            >
              회원가입
            </button>
            <div
              className="modal-dim"
              style={{ display: suModal ? "block" : "none" }}
            >
              <SignUp
                signInHandler={suModalHandler}
                suModalHandler={suModalHandler}
              ></SignUp>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
