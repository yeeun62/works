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
