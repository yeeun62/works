import { useState, useEffect } from "react";
import "../modal/modal.css";
import axios from "axios";

//! 인풋값없을시 서버에러시!
const PurchaseModal = ({ modalHandler }) => {
	const [userList, setUserList] = useState(null);
	const [responserName, setResponserName] = useState(""); // responser name 표시 위한 state
	const [ogImg, setOgImg] = useState("");
	const [purchaseForm, setPurchaseForm] = useState({
		responser: {},
		productName: "",
		productInfo: "",
		quantity: "",
		price: "",
		totalPrice: "",
		reason: "",
		// file: "",
	});

	const purchaseFormHandler = (e) => {
		setPurchaseForm({
			...purchaseForm,
			[e.target.name]: e.target.value,
		});

		if (e.target.files) {
			console.log(e.target.files[0]);
			setPurchaseForm({ ...purchaseForm, [e.target.name]: e.target.files[0] });
		}

		if (e.target.name === "responser") {
			if (e.target.value === "all") {
				setResponserName("");
			} else {
				let findUser = userList.filter(
					(el) => el.id === Number(e.target.value)
				);
				setResponserName(findUser[0].name);
			}
		}

		if (e.target.name === "productInfo") {
			//console.log(e.target.value);
		}
	};

	useEffect(async () => {
		let userList = await axios.get(
			`${process.env.REACT_APP_TEMPLATE_API_URL}/user`,
			{
				withCredentials: true,
			}
		);
		setUserList(userList.data.data);
	}, []);

	const postPurchaseHandler = async () => {
		setPurchaseForm({
			...purchaseForm,
			totalPrice: purchaseForm.quantity * purchaseForm.price,
		});

		let postPurchase = await axios.post(
			`${process.env.REACT_APP_TEMPLATE_API_URL}/purchase`,
			purchaseForm,
			{ withCredentials: true }
		);
	};
	return (
		<div className="lg:flex">
			<div className="lg:w-full  lg:flex md:w-full md:h-full md:overflow-auto md:py-8">
				<div className="lg:w-8/12 lg:p-4 lg:border-r md:w-full md:h-full md:relative">
					<button className="absolute right-7 sm:top-px" onClick={modalHandler}>
						X
					</button>
					<p className="text-center text-2xl my-3">비품 신청</p>
					<p className="text-center text-sm	text-[#7c7c7c]">
						근무를 도와줄 물품을 신청해주세요!
					</p>
					<form className="">
						<label className="block my-4">
							<p>품명</p>
							<input
								className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
								onChange={purchaseFormHandler}
								type="text"
								name="productName"
								placeholder="마우스"
							/>
						</label>
						<label className="block my-4">
							<p>상품 정보(링크)</p>
							<input
								className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
								onChange={purchaseFormHandler}
								type="text"
								name="productInfo"
								placeholder="로지텍 마우스"
							></input>
						</label>
						<label className="block my-4">
							<p>사유</p>
							<input
								className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
								onChange={purchaseFormHandler}
								type="text"
								name="reason"
								placeholder="로지텍 마우스가 굉장히 좋습니다."
							/>
						</label>
						<label className="block my-4">
							<p>단가</p>
							<input
								className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
								onChange={purchaseFormHandler}
								type="number"
								name="price"
								id="priceInput"
								placeholder="10,000"
							/>
						</label>
						<label className="block my-4">
							<p>수량</p>
							<input
								className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
								onChange={purchaseFormHandler}
								type="number"
								min="0"
								name="quantity"
								placeholder="2"
							/>
						</label>
						<div className="lg:flex w-full flex-wrap">
							<label className="block my-4 lg:flex-[1_1_40%] md:mb-4">
								<p>총액</p>
								<div className="lg:w-9/12 md:w-full border-b border-[#c3c3c3] rounded-sm h-7 pl-1 relative">
									수량 x 단가 ={" "}
									<span className="text-rose-800 font-bold absolute right-0 ">
										{purchaseForm.price && purchaseForm.quantity
											? Number(purchaseForm.price) *
											  Number(purchaseForm.quantity)
											: 0}{" "}
										원
									</span>
								</div>
							</label>
							<div className="lg:w-9/12 md:w-full flex h-10 my-4 lg:flex-[1_1_40%] md:mt-4 md:m-auto">
								<label className="block h-10  handle-button">
									파일첨부
									<input
										type="file"
										onChange={purchaseFormHandler}
										name="file"
										style={{ display: "none", lineHeight: "2.5rem" }}
									/>
								</label>
								<p className="border-b w-1/2 text-xs h-10 leading-[2.5rem] ml-4">
									{purchaseForm.file ? purchaseForm.file.name : null}
								</p>
							</div>
						</div>
					</form>
				</div>
				<div className="select lg:top-10 lg:right-0 lg:w-2/5 p-4 relative items-center md:block md:mb-5 md:m-auto">
					<p className="text-s">받을 분을 선택해주세요👇</p>
					<select
						className="border w-40"
						onChange={purchaseFormHandler}
						name="responser"
					>
						<option value="all">대상 선택하기</option>
						{userList &&
							userList.map((user) => {
								return (
									<option key={user.id} value={user.id}>
										{user.name}
									</option>
								);
							})}
					</select>
					{responserName ? (
						<div
							id="senderNotice"
							className="border-y dashed  mt-8 text-sm text-center leading-[1.5rem] py-4"
							style={{ wordBreak: "keep-all" }}
						>
							{responserName}님에게 비품동의서 알림이 sms로 보내집니다.
						</div>
					) : null}
				</div>
				<div className="w-20 m-auto">
					<button
						type="button"
						className="lg:mt-6 lg:absolute lg:bottom-10 lg:right-10"
						onClick={postPurchaseHandler}
					>
						작성하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default PurchaseModal;
