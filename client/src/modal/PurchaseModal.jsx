import { useState, useEffect } from "react";
import "../modal/modal.css";
import axios from "axios";

//! 인풋값없을시 서버에러시!
const PurchaseModal = ({ modalHandler }) => {
  const [userList, setUserList] = useState(null);
  const [responserName, setName] = useState(""); // resonser name 표시 위한 state
  const [ogImg, setOgImg] = useState("");
  const [purchaseForm, setPurchaseForm] = useState({
    responser: {},
    productName: "",
    productInfo: "",
    quantity: "",
    price: "",
    totalPrice: "",
    reason: "",
    file: "",
  });

  const purchaseFormHandler = (e) => {
    console.log(e.target.value);
    setPurchaseForm({
      ...purchaseForm,
      [e.target.name]: { ...e.target.value },
    });

    if (e.target.file) {
      setPurchaseForm({ ...purchaseForm, [e.target.name]: e.target.files[0] });
    }
    if (e.target.name === "responser") {
      if (e.target.value === "all") setName("");
      else setName(...userList.filter((el) => el.id == e.target.value));
    }

    if (e.target.name === "productInfo") {
      console.log(e.target.value);
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
    purchaseForm.totalPrice = purchaseForm.price * purchaseForm.quantity;
    purchaseForm.responser = purchaseForm.responser.id;

    let postPurchase = await axios.post(
      `${process.env.REACT_APP_TEMPLATE_API_URL}/purchase`,
      purchaseForm,
      { withCredentials: true }
    );

    if (postPurchase.status === 200) {
      modalHandler();
      window.alert(postPurchase.data.message);
    }
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-full  lg:flex sm:w-full sm:h-full sm:overflow-auto sm:py-8">
        <div className="lg:w-8/12 lg:p-4 lg:border-r sm:w-full sm:h-full sm:relative">
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
                type="text"
                name="price"
                placeholder="10,000"
              />
            </label>
            <label className="block my-4">
              <p>수량</p>
              <input
                className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
                onChange={purchaseFormHandler}
                type="text"
                name="quantity"
                placeholder="2"
              />
            </label>
            <label className="block my-4">
              <p>총액</p>
              <div className="w-1/2 border-b border-[#c3c3c3] rounded-sm h-7 pl-1 relative">
                수량 x 단가 ={" "}
                <span className="text-rose-800 font-bold absolute right-0">
                  {purchaseForm.price * purchaseForm.quantity} 원
                </span>
              </div>
            </label>
            <label className="block my-4 handle-button">
              관련된 파일첨부
              <input
                type="file"
                onChange={purchaseFormHandler}
                name="file"
                style={{ display: "none" }}
              />
            </label>
          </form>
        </div>
        <div className="select lg:top-10 lg:right-0 lg:w-2/5  p-4 relative items-center sm:block sm:mb-5 sm:m-auto">
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
          {responserName.name ? (
            <div
              id="senderNotice"
              className="border-b dashed border-t mt-8 text-sm text-center leading-[1.5rem] py-4"
              style={{ wordBreak: "keep-all" }}
            >
              {responserName.name}님에게 비품동의서 알림이 sms로 보내집니다.
            </div>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        className="lg:mt-6 sm:m-auto lg:absolute lg:bottom-10 lg:right-10"
        onClick={postPurchaseHandler}
      >
        작성하기
      </button>
    </div>
  );
};

export default PurchaseModal;
