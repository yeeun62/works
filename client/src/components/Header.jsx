import Modal from "react-modal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SignIn from "../modal/SignIn";
import SignUp from "../modal/SignUp";
import axios from "axios";

const Header = ({ userInfo }) => {
  let location = useLocation();
  console.log(userInfo);

  const [openSignin, setOpenSignin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const signinHandler = () => {
    setOpenSignin(!openSignin);
  };
  const signupHandler = () => {
    setOpenSignup(!openSignup);
  };

  const signoutHandler = async () => {
    let signout = await axios.get(
      `${process.env.REACT_APP_TEMPLATE_API_URL}/user/signout`,
      { withCredentials: true }
    );
    window.alert(signout.data.message);
    window.location.replace("/");
  };

  return (
    <>
      <Modal
        isOpen={openSignin}
        onRequestClose={signinHandler}
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <SignIn signinHandler={signinHandler}></SignIn>
      </Modal>
      <Modal
        isOpen={openSignup}
        onRequestClose={signupHandler}
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <SignUp signupHandler={signupHandler}></SignUp>
      </Modal>
      <header className="flex justify-between h-16 border-b-[1px] mb-20 px-3">
        <p className="logo text-[#E0DE1B] text-3xl cursor-pointer leading-[4rem]">
          handle
        </p>
        <div className="flex justify-around w-40 items-center">
          {userInfo ? (
            <>
              {location.pathname === "/" ? (
                <button type="button">문서함</button>
              ) : (
                <button type="button">템플릿 페이지</button>
              )}
              <button type="button" onClick={signoutHandler}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={signinHandler}>
                로그인
              </button>
              <button type="button" onClick={signupHandler}>
                회원가입
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
