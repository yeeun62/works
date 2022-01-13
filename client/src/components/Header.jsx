import Modal from "react-modal";
import { useState } from "react";
import SignIn from "../modal/SignIn";
import SignUp from "../modal/SignUp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalHandler = (b) => {
    setIsOpen(b);
  };

  return (
    <>
      <Modal isOpen={isOpen} overlayClassName="overlay" ariaHideApp={false}>
        <SignIn modalHandler={modalHandler}></SignIn>
      </Modal>
      <Modal isOpen={isOpen} overlayClassName="overlay" ariaHideApp={false}>
        <SignUp modalHandler={modalHandler}></SignUp>
      </Modal>
      <header className="flex justify-between h-16 border-b-[1px] mb-20 px-3">
        <p className="logo text-[#E0DE1B] text-3xl cursor-pointer leading-[4rem]">
          handle
        </p>
        <div className="flex justify-around w-40 items-center">
          <button type="button" onClick={() => modalHandler(true)}>
            로그인
          </button>
          <button type="button" onClick={() => modalHandler(true)}>
            회원가입
          </button>
        </div>
      </header>
    </>
  );
};
export default Header;
