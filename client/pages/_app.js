import React, { useState } from "react";
import Header from "../src/components/Header";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/header.css";

function MyApp({ Component, pageProps }) {
  const [isSignIn, setIsSignInLogin] = useState(false);

  const signInHandler = (b) => {
    setIsSignInLogin(b);
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
      <Component isSignIn={isSignIn} {...pageProps} />
    </div>
  );
}

export default MyApp;
