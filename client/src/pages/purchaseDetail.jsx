import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../style/PurchaseDetail.css";

export default function PurchaseDetail({ userInfo }) {
	let location = useLocation();
	const id = location.pathname.slice(10);

	const [templateInfo, setTemplateInfo] = useState(null);
	const [isMe, setIsMe] = useState(true);

	useEffect(async () => {
		if (userInfo) {
			let purchaseData = await axios.get(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/purchase/${id}`,
				{
					withCredentials: true,
				}
			);
			setTemplateInfo(purchaseData.data.data);
			setIsMe(purchaseData.data.data.responser === userInfo.id);
		}
	}, [userInfo]);

	const responseHandler = async (boolean) => {
		let result;
		if (boolean) {
			result = "승인";
		} else {
			result = "거절";
		}
		if (window.confirm(`요청을 ${result}하시겠습니까??`)) {
			let response = await axios.post(
				`${process.env.REACT_APP_TEMPLATE_API_URL}/purchase/request`,
				{
					requestResult: boolean,
					requesterId: templateInfo.userId,
					purchaseId: templateInfo.purchaseId,
				},
				{
					withCredentials: true,
				}
			);
			console.log(response);
			if (response.status === 200) {
			}
		}
	};

	return (
		<>
			<Header userInfo={userInfo} />
			{templateInfo ? (
				<div className="templateContainer">
					<div className="top">
						<h1>🖥 {templateInfo.title}</h1>
						<p>작성자 {templateInfo.name}</p>
						<p>작성일 {templateInfo.createdAt}</p>
					</div>
					<div className="body">
						<ul>
							<li>
								품명 <span>{templateInfo.productName}</span>
							</li>
							<li>
								상품 정보 <span>{templateInfo.productInfo}</span>
							</li>
							<li>
								수량 <span>{templateInfo.quantity}</span>
							</li>
							<li>
								단가 <span>{templateInfo.price}</span>
							</li>
							<li>
								금액 <span>{templateInfo.totalPrice}</span>
							</li>
							<li>
								사유 <span>{templateInfo.reason}</span>
							</li>
						</ul>
					</div>
					{isMe && (
						<div className="temButtonWrap">
							<button
								type="button"
								className="temBtnApproval btn"
								onClick={() => responseHandler(true)}
							>
								승인
							</button>
							<button
								type="button"
								className="temBtnReject btn"
								onClick={() => responseHandler(false)}
							>
								거절
							</button>
						</div>
					)}
				</div>
			) : (
				<p>정보가 없습니다.</p>
			)}
		</>
	);
}
