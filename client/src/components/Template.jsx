import "../style/TemPage.css";
import Modal from "react-modal";
import PurchaseModal from "../modal/PurchaseModal";
import { useState } from "react";

const Template = () => {
  const [open, setOpen] = useState(false);

  const modalHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={modalHandler}
        className="content w-3/5 md:w-full"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <PurchaseModal modalHandler={modalHandler} />
      </Modal>
      <div className="tempWrapper">
        <div className="templateDiv">
          <h2>🖥 비품 신청</h2>
          <button type="button" onClick={modalHandler}>
            작성하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Template;
