import Modal from "react-modal";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinModal, signupModal } from "../redux/modules/users";
import { getUserInfo } from "../redux/modules/users";
import SignIn from "../modal/SignIn";
import SignUp from "../modal/SignUp";
import axios from "axios";
import "../modal/modal.css";

const Header = () => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const signinHandler = () => {
    dispatch(signinModal());
  };
  const signupHandler = () => {
    dispatch(signupModal());
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
        isOpen={user.signinModal}
        onRequestClose={signinHandler}
        overlayClassName="overlay"
        ariaHideApp={false}
        className="content signModal"
      >
        <SignIn signinHandler={signinHandler}></SignIn>
      </Modal>
      <Modal
        isOpen={user.signupModal}
        onRequestClose={signupHandler}
        overlayClassName="overlay"
        ariaHideApp={false}
        className="content signModal"
      >
        <SignUp signupHandler={signupHandler}></SignUp>
      </Modal>
      <header className="flex justify-between h-16 border-b-[1px] lg:mb-20 mb-5 px-3">
        <Link to="/">
          <p className="logo text-[#E0DE1B] text-3xl cursor-pointer leading-[4rem]">
            handle
          </p>
        </Link>
        <div className="flex justify-around w-50 items-center sm:text-xs sm:font-semibold">
          {user.isLogin ? (
            <>
              <div className="tooltip rounded-full border mr-4 sm:mr-2 border-yellowGreen w-7 h-7 text-center leading-7 cursor-pointer hover:bg-[#e0de1b]">
                {user.userInfo.name.slice(0, 1)}
                <div className="tooltipInner bg-[#e0de1b] p-4 w-56 text-white text-left font-bold rounded-2xl shadow-xl hidden text-xs">
                  이메일 {user.userInfo.email} <br /> 이름 {user.userInfo.name}
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
