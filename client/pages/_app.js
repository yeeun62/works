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
