import Modal from "react-modal";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SignIn from "../modal/SignIn";
import SignUp from "../modal/SignUp";
import axios from "axios";
import "../modal/modal.css";

const Header = ({ userInfo }) => {
  let location = useLocation();
  const navigate = useNavigate();

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
        className="content signModal"
      >
        <SignIn signinHandler={signinHandler}></SignIn>
      </Modal>
      <Modal
        isOpen={openSignup}
        onRequestClose={signupHandler}
        overlayClassName="overlay"
        ariaHideApp={false}
        className="content signModal"
      >
        <SignUp signupHandler={signupHandler}></SignUp>
      </Modal>
      <header className="flex justify-between h-16 border-b-[1px] mb-20 px-3">
        <Link to="/">
          <p className="logo text-[#E0DE1B] text-3xl cursor-pointer leading-[4rem]">
            handle
          </p>
        </Link>
        <div className="flex justify-around w-50 items-center">
          {userInfo ? (
            <>
              <div className="tooltip rounded-full border mr-4 sm:mr-2 border-yellowGreen w-7 h-7 text-center leading-7 cursor-pointer hover:bg-[#e0de1b]">
                {userInfo.name.slice(0, 1)}
                <div className="tooltipInner bg-[#e0de1b] p-4 min-w-fit text-white text-left font-bold rounded-2xl shadow-xl hidden text-xs">
                  이메일 {userInfo.email} <br /> 이름 {userInfo.name}
                </div>
              </div>
              {location.pathname === "/" ? (
                <button
                  type="button"
                  onClick={() => {
                    navigate("/mypage");
                  }}
                  className="mr-4 sm:mr-2"
                >
                  문서함
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                  className="mr-4 sm:min-w-fit sm:mr-2"
                >
                  템플릿 페이지
                </button>
              )}
              <button
                type="button"
                onClick={signoutHandler}
                className="sm:min-w-fit"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={signinHandler} className="mr-4">
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
