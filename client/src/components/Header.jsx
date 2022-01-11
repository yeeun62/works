import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import axios from "axios";

export default function Header({ isSignIn, signInHandler }) {
  const [siModal, setSimodal] = useState(false);
  const [suModal, setSumodal] = useState(false);
  const siModalHandler = () => setSimodal(!siModal);
  const suModalHandler = () => setSumodal(!suModal);
  const getSignOut = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_TEMPLATE_API_URL}/user/signout`)
      .then((res) => {
        if (res.status === 200) signInHandler(false);
      });
  };

  return (
    <header className="header w-9/12 h-1.5 m-auto bg-blend-multiply absolute top-0 border-b-slate-300 flex-auto">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Link href="/">
        <h1 className="handle-logo-font">handle</h1>
      </Link>
      <div className="navButtonList">
        {isSignIn ? (
          <Link href="/myPage">
            <button type="button" className="btn">
              마이 페이지
            </button>
          </Link>
        ) : null}
        {isSignIn ? (
          <button type="button" onClick={getSignOut} className="btn">
            sign out
          </button>
        ) : (
          <>
            <button type="button" onClick={siModalHandler} className="btn">
              sign in
            </button>
            <div
              className={siModal}
              style={{ display: siModal ? "block" : "none" }}
            >
              <SignIn
                signInHandler={signInHandler}
                siModalHandler={siModalHandler}
              ></SignIn>
            </div>
            <button type="button" onClick={suModalHandler} className="btn">
              sign up
            </button>
            <div
              className={suModal}
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
