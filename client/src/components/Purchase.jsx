import { useState } from "react";
import axios from "axios";

export default function Template({ modalHandler }) {
  const [sendList, setSendList] = useState([]);
  const [form, setForm] = useState({
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
        .post(`${process.env.NEXT_PUBLIC_TEMPLATE_API_URL}/purchase`, form, {
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
    <div className="modal-dim">
      <div className="templateWrapper">
        <div className="leftSide">
          <h1>비품 신청</h1>
          <p>일하는 데 필요한 물품을 신청해주세요!</p>
          <form>
            <label>
              품명
              <input
                type="text"
                name="productName"
                onChange={formHandler}
                placeholder="마우스"
              ></input>
            </label>
            <label>
              상품 정보(링크)
              <input
                type="text"
                name="productInfo"
                onChange={formHandler}
                placeholder="로지텍 마우스"
              ></input>
            </label>
            <label>
              수량
              <input
                type="text"
                name="quantity"
                onChange={formHandler}
                placeholder="2"
              ></input>
            </label>
            <label>
              단가
              <input
                type="text"
                name="price"
                onChange={formHandler}
                placeholder="10,000"
              ></input>
            </label>
            <label>
              금액
              <input
                type="text"
                name="totalPrice"
                onChange={formHandler}
                placeholder="20,000"
              ></input>
            </label>
            <label>
              사유
              <input
                type="text"
                name="reason"
                onChange={formHandler}
                placeholder="로지텍 마우스가 굉장히 좋습니다."
              ></input>
            </label>
            <button type="button" onClick={postForm} className="btn submitBtn">
              작성하기
            </button>
          </form>
        </div>
        <div className="sendTo rightSide">
          <p>보낼 대상을 선택해주세요👇</p>
          <select>
            <option>대상 선택하기</option>
            {sendList.map((send, i) => {
              return (
                <option key={i} onChange={formHandler} name={responser}>
                  {send.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className="closeModal" onClick={() => modalHandler(false)}>
          X
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let sendList;
  await axios
    .get(`${process.env.NEXT_PUBLIC_TEMPLATE_API_URL}/user`)
    .then((res) => {
      sendList;
    });

  return {
    props: { sendList }, // will be passed to the page component as props
  };
}
