import { useState } from "react";
import axios from "axios";

export default function Template({ modalHandler }) {
  const [sendList, setSendList] = useState([]);

  const [form, setForm] = useState({
    title: "비품 신청",
    responser: "",
    productName: "",
    productInfo: "",
    quantity: "",
    price: "",
    totalPrice: "",
    reason: "",
  });

  let requester;

  const formHandler = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const postForm = async () => {
    if (Object.values(form).filter((e) => e.length <= 0).length)
      alert("모든 칸을 채워주세요😃");
    else {
      await axios
        .post(process.env.WORKS_PURCHASE, form, {
          headers: { handleToken: requester },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("요청이 완료되었습니다 👍");
          } else {
            alert("요청이 실패했습니다 🤔");
          }
        });
    }
  };

  return (
    <div className="dim">
      <div className="templateWrapper">
        <div>
          <h1>비품 신청</h1>
          <p>일하는 데 필요한 물품을 신청해주세요!</p>
          <form>
            <input
              type="text"
              name="productName"
              onChange={formHandler}
              placeholder="품명"
            ></input>
            <input
              type="text"
              name="productInfo"
              onChange={formHandler}
              placeholder="상품 정보(링크)"
            ></input>
            <input
              type="text"
              name="quantity"
              onChange={formHandler}
              placeholder="수량"
            ></input>
            <input
              type="text"
              name="price"
              onChange={formHandler}
              placeholder="단가"
            ></input>
            <input
              type="text"
              name="totalPrice"
              onChange={formHandler}
              placeholder="금액"
            ></input>
            <input
              type="text"
              name="reason"
              onChange={formHandler}
              placeholder="사유"
            ></input>
            <button onClick={postForm} className="btn">
              작성하기
            </button>
          </form>
        </div>
        <div className="sendTo">
          <select>
            <option>대상 선택하기</option>
            {sendList.map((send, i) => {
              return (
                <option
                  key={i}
                  onChange={formHandler}
                  name={responser}
                  onChange={formHandler}
                >
                  {send.name}
                </option>
              );
            })}
          </select>
        </div>
        <p className="close" onClick={() => modalHandler(false)}>
          닫기
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(context.req);
  //setSendList -> 보낼 사람 목록 요청해서 받아오기.
  //requester = context.req.headers.cookies;
  return {
    props: {}, // will be passed to the page component as props
  };
}