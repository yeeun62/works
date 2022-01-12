import React, { useState } from "react";
import Header from "../src/components/Header";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/temPage.css";
import "../styles/myPage.css";
import "../styles/purchaseDetail.css";

function MyApp({ Component, pageProps }) {
  const [isSignIn, setIsSignIn] = useState(false);

  const signInHandler = (b) => {
    setIsSignIn(b);
  };

  return (
    <div className="wrapper">
      <Head>
        <title>handle works</title>
        <link
          rel="stylesheet"
          href="https://api.handle.im/handle/css/handle.common.css"
        ></link>
      </Head>
      <Header isSignIn={isSignIn} signInHandler={signInHandler}></Header>
      <Component
        isSignIn={isSignIn}
        signInHandler={signInHandler}
        {...pageProps}
      />
    </div>
  );
}

export default MyApp;

// 페이지 전환시 레이아웃, 상태값 유지
// 추가적인 데이터를 페이지로 주입 가능
// componentDidCatch를 이용해 커스텀 에러 핸들링가능
// 글로벌 css 이곳에 선언
