import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../style/PurchaseDetail.css";

export default function PurchaseDetail({ userInfo }) {
  const [templateInfo, setTemplateInfo] = useState({});
  const [id, setId] = useState(window.location.pathname.slice(10));
  const [isMe, setIsMe] = useState(true);

  useEffect(async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_TEMPLATE_API_URL}/purchase/${id}`,
      {
        withCredentials: true,
      }
    );
    setTemplateInfo(res.data.data);
    console.log(templateInfo);
    //setIsMe(res.data.data.responser.name === userInfo.name);
  }, []);

  console.log(templateInfo);

  const approvalHandler = async (b) => {
    await axios
      .post(`${process.env.REACT_APP_TEMPLATE_API_URL}/${id}`, b, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <Header userInfo={userInfo}></Header>
      {Object.values(templateInfo).length > 0 ? (
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
