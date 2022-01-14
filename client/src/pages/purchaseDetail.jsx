import { useState, useEffect } from "react";
import axios from "axios";
import "../style/PurchaseDetail.css";

export default function PurchaseDetail({ templateInfo }) {
  console.log(templateInfo);
  const [isMe, setIsMe] = useState(true);

  useEffect(() => {}, []);

  const approvalHandler = async (b) => {
    await axios
      .post(`${process.env.REACT_APP_TEMPLATE_API_URL}??`, b)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      {templateInfo ? (
        <div className="templateContainer">
          <div className="top">
            <h1>🖥 {templateInfo.title}</h1>
            <p>작성자 {templateInfo.requester}</p>
            <p>작성일 {templateInfo.updatedAt}</p>
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
          {isMe ? (
            <div className="temButtonWrap">
              <button
                type="button"
                className="temBtnApproval btn"
                onClick={() => approvalHandler(true)}
              >
                승인
              </button>
              <button
                type="button"
                className="temBtnReject btn"
                onClick={() => approvalHandler(false)}
              >
                거절
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <p>정보가 없습니다.</p>
      )}
    </>
  );
}
