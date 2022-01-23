import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../modal/modal.css";
import axios from "axios";

//! 인풋값없을시 서버에러시!
const PurchaseModal = ({ modalHandler }) => {
  const [userList, setUserList] = useState(null);
  const [responserName, setResponserName] = useState("");
  const [ogInfo, setOgInfo] = useState(null);
  const [fileName, setFileName] = useState("");
  const [purchaseForm, setPurchaseForm] = useState({
    responser: 0,
    productName: "",
    productInfo: "",
    quantity: 0,
    price: 0,
    totalPrice: "",
    reason: "",
    file: "",
  });

  const fileuploadHandler = (e) => {
    const storage = getStorage();
    const file = e.target.files[0];
    setFileName(e.target.files[0].name);
    const filename = e.target.files[0].name;
    const fileRef = ref(storage, filename);
    uploadBytes(fileRef, file)
      .then((el) => {
        getDownloadURL(ref(storage, filename)).then((el) =>
          setPurchaseForm({ ...purchaseForm, file: el })
        );
      })
      .catch((err) => console.log("file upload 에러!"));
  };

  const purchaseFormHandler = (e) => {
    if (purchaseForm.quantity && purchaseForm.price) {
      setPurchaseForm({
        ...purchaseForm,
        totalPrice: String(
          Number(purchaseForm.quantity) * Number(purchaseForm.price)
        ),
        [e.target.name]: e.target.value,
      });
    } else {
      setPurchaseForm({
        ...purchaseForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  const choiceUserHandler = (e) => {
    if (e.target.value === "all") {
      setResponserName("");
    } else {
      let findUser = userList.filter((el) => el.id === Number(e.target.value));
      setResponserName(findUser[0].name);
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

  const ogHandler = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_TEMPLATE_API_URL}/purchase/og`,
        { url: e.target.value },
        { withCredentials: true }
      )
      .then((el) => {
        setOgInfo(el.data.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setOgInfo(null);
        }
      });
  };

  const postPurchaseHandler = async () => {
    try {
      let postPurchase = await axios.post(
        `${process.env.REACT_APP_TEMPLATE_API_URL}/purchase`,
        purchaseForm,
        { withCredentials: true }
      );
      if (postPurchase.status === 200) {
        modalHandler();
        window.alert(postPurchase.data.message);
      }
    } catch (err) {
      console.log(err);
      if (err.response === 400) {
        window.alert("모든칸을 입력해주세요!");
      }
    }
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-full lg:flex">
        <div className="lg:w-8/12 lg:p-4 lg:border-r md:relative">
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
            <label className={`block ${ogInfo ? "mt-4 mb-1" : "my-4"}`}>
              <p>상품 정보(링크)</p>
              <input
                className="w-full border border-[#c3c3c3] rounded-sm h-7 pl-1"
                onChange={purchaseFormHandler}
                onBlur={ogHandler}
                type="text"
                name="productInfo"
                placeholder="로지텍 마우스"
              ></input>
            </label>
            {ogInfo && (
              <div
                className="flex border-solid border border-[#ccc] rounded p-0.5 cursor-pointer"
                onClick={() => window.open(ogInfo.url, "_blank")}
              >
                <img className="w-28 mr-4" src={ogInfo.imgUrl} />
                <div>
                  <p className="text-sm font-semibold">{ogInfo.title}</p>
                  <p className="text-xs text-zinc-800">{ogInfo.desc}</p>
                </div>
              </div>
            )}
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
                  <span className="text-xs">수량 x 단가 = </span>
                  <span className="text-rose-800 font-bold absolute right-0 ">
                    {purchaseForm.price && purchaseForm.quantity
                      ? Number(purchaseForm.price) *
                        Number(purchaseForm.quantity)
                      : 0}
                    원
                  </span>
                </div>
              </label>
              <div className="lg:w-9/12 md:w-full flex my-4 lg:flex-[1_1_40%] md:mt-4 md:m-auto lg:mt-7">
                <label className="cursor-pointer">
                  📎 파일첨부 {fileName && `: ${fileName}`}
                  <input
                    type="file"
                    onChange={fileuploadHandler}
                    name="file"
                    style={{ display: "none", lineHeight: "2.5rem" }}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:top-10 lg:right-0 lg:w-2/5 p-4 relative items-center md:block md:mb-5 md:m-auto">
          <p className="text-s">받을 분을 선택해주세요👇</p>
          <select
            className="mb-4 border-b w-40 p-0.5 ml-4"
            onChange={(e) => {
              choiceUserHandler(e);
              purchaseFormHandler(e);
            }}
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
          {responserName && (
            <div
              id="senderNotice"
              className="border-y dashed  mt-8 text-sm text-center leading-[1.5rem] py-4"
              style={{ wordBreak: "keep-all" }}
            >
              {responserName}님에게 비품동의서 알림이 sms로 보내집니다.
            </div>
          )}
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
