import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Id({ info }) {
  const { id } = useRouter.query;
  const [isMe, setIsMe] = useState(true);

  // useEffect(()=> {
  //   if(info.responser === )
  // }, []);
  // 로그인한 사용자와 responser가 같으면 승인 거절 버튼 보여주기.

  return (
    <div className="templateContainer">
      <div className="top">
        <h1>🖥 {info.title}</h1>
        <p>{info.requester}</p>
        <p>{info.updatedAt}</p>
      </div>
      <div className="body">
        <ul>
          <li>품명 {info.productName}</li>
          <li>상품 정보 {info.productInfo}</li>
          <li>수량 {info.quantity}</li>
          <li>단가 {info.price}</li>
          <li>금액 {info.totalPrice}</li>
          <li>사유 {info.reason}</li>
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let path = window.location.pathname;
  let id = path.slice(path.length);
  let info;

  await axios.get(`${process.env.TEMPLATE_API}/purchase/:${id}`).then((res) => {
    info = res.data;
  });

  return {
    props: { info }, // will be passed to the page component as props
  };
}
