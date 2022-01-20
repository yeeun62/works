import "../style/TemPage.css";
import Modal from "react-modal";
import PurchaseModal from "../modal/PurchaseModal";
import { useDispatch, useSelector } from "react-redux";
import { purchaseModal } from "../redux/modules/purchase";
import { signinModal } from "../redux/modules/users";

const Template = () => {
  const purchase = useSelector((state) => state.purchase);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const modalHandler = () => {
    if (user.userInfo.name) {
      dispatch(purchaseModal());
    } else {
      window.alert("로그인을 먼저 해주세요!");
      dispatch(signinModal());
    }
  };

  return (
    <>
      <Modal
        isOpen={purchase.purchaseModal}
        onRequestClose={modalHandler}
        className="content md:w-full ml:w-11/12 overflow-auto sm:h-screen"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <PurchaseModal modalHandler={modalHandler} />
      </Modal>
      {/* sm:w-1/2 sm:h-x sm:m-4 */}
      <div className="templateDiv rounded-xl p-2 relative border border-[#ddd]">
        <h2 className="text-center sm:h-1/2 leading-12 block text-slate-700">
          🖥 비품 신청
        </h2>
        <button
          type="button"
          onClick={modalHandler}
          className="absolute bottom-4 right-4 sm:text-sm sm:h-fit"
        >
          작성하기
        </button>
      </div>
    </>
  );
};

export default Template;
