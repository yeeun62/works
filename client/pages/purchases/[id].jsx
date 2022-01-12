import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Id() {
  const router = useRouter();
  const { id } = router.query;
  const [isMe, setIsMe] = useState(true);

  const approvalHandler = async (b) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_TEMPLATE_API_URL}??`, b)
      .then((res) => {});
  };

  let info = {
    title: "title",
    requester: "박은빈",
    responser: "누군가",
    updatedAt: "2020년 3월 19일",
    productName: "마우스",
    productInfo: "로지텍 마우스",
    quantity: "2",
    price: "10000",
    totalPrice: "20000",
    reason: "마우스가 필요합니다.",
    result: true,
  };
  // 로그인한 사용자와 responser가 같으면 승인 거절 버튼 보여주기.

  return (
    <>
      {info ? (
        <div className="templateContainer">
          <div className="top">
            <h1>🖥 {info.title}</h1>
            <p>작성자 {info.requester}</p>
            <p>작성일 {info.updatedAt}</p>
          </div>
          <div className="body">
            <ul>
              <li>
                품명 <span>{info.productName}</span>
              </li>
              <li>
                상품 정보 <span>{info.productInfo}</span>
              </li>
              <li>
                수량 <span>{info.quantity}</span>
              </li>
              <li>
                단가 <span>{info.price}</span>
              </li>
              <li>
                금액 <span>{info.totalPrice}</span>
              </li>
              <li>
                사유 <span>{info.reason}</span>
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

// export async function getServerSideProps(context) {
//   let path = window.location.pathname;
//   let id = path.slice(path.length);
//   let info;
//   let isMe;

//   await axios.get(`${process.env.TEMPLATE_API}/purchase/:${id}`).then((res) => {
//     info = res.data;
//     if (res.data.responser === req.headers.cookies) isMe = "true";
//   });
//   console.log("isMe = ", isMe);
//   console.log("info = ", info);

//   // 프롭스로 { info } 받기
//   return {
//     props: { info, isMe }, // will be passed to the page component as props
//   };
// }
