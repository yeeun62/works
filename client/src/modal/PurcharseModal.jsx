import "../modal/modal.css";

const PurchaseModal = ({ modalHandler }) => {
	return (
		<div className="flex">
			<div className="w-8/12 p-4 border-r">
				<p className="text-center text-2xl my-3">비품 신청</p>
				<p className="text-center text-sm	text-[#7c7c7c]">
					근무를 도와줄 물품을 신청해주세요!
				</p>
				<form className="">
					<label className="block my-4">
						<p>품명</p>
						<input
							className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
							type="text"
							name="productName"
							placeholder="마우스"
						/>
					</label>
					<label className="block my-4">
						<p>상품 정보(링크)</p>
						<input
							className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
							type="text"
							name="productInfo"
							placeholder="로지텍 마우스"
						></input>
					</label>
					<label className="block my-4">
						<p>수량</p>
						<input
							className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
							type="text"
							name="quantity"
							placeholder="2"
						/>
					</label>
					<label className="block my-4">
						<p>단가</p>
						<input
							className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
							type="text"
							name="price"
							placeholder="10,000"
						/>
					</label>
					<label className="block my-4">
						<p>금액</p>
						<input
							className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
							type="text"
							name="totalPrice"
							placeholder="20,000"
						/>
					</label>
					<label className="block my-4">
						<p>사유</p>
						<input
							className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
							type="text"
							name="reason"
							placeholder="로지텍 마우스가 굉장히 좋습니다."
						/>
					</label>
					<button type="button" className="mt-6">
						작성하기
					</button>
				</form>
			</div>
			<div className="p-4 relative items-center">
				<p className="text-s">받을분을 선택해주세요👇</p>
				<select className="border w-40">
					<option>대상 선택하기</option>
					{/* {sendList.map((send, i) => {
							return (
								<option key={i} onChange={formHandler} name={responser}>
									{send.name}
								</option>
							);
						})} */}
				</select>
			</div>
			<button className="absolute right-7" onClick={modalHandler}>
				X
			</button>
		</div>
	);
};

export default PurchaseModal;
