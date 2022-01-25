import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinModal } from "../redux/modules/users";
import axios from "axios";
import Header from "../components/Header";
import "../style/purchaseDetail.css";

export default function PurchaseDetail() {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  let location = useLocation();
  const id = location.pathname.slice(10);

  const [templateInfo, setTemplateInfo] = useState(null);
  const [isMe, setIsMe] = useState(true);
  const [ogInfo, setOgInfo] = useState(null);

  useEffect(async () => {
    if (!user.isLogin) {
      return dispatch(signinModal());
    } else if (user.isLogin) {
      if (user.signinModal) {
        dispatch(signinModal());
      }
      try {
        let purchaseData = await axios.get(
          `${process.env.REACT_APP_TEMPLATE_API_URL}/purchase/${id}`,
          {
            withCredentials: true,
          }
        );
        setTemplateInfo(purchaseData.data.data);
        setIsMe(purchaseData.data.data.responser === user.userInfo.id);
      } catch (err) {
        if (
          err.response.status === 401 &&
          err.response.data.message === "접근권한이 없습니다😅"
        ) {
          window.alert(err.response.data.message);
          navigate("/");
        }
      }
    }
  }, [user.isLogin]);

  useEffect(() => {
    if (templateInfo) {
      axios
        .post(
          `${process.env.REACT_APP_TEMPLATE_API_URL}/purchase/og`,
          { url: templateInfo.productInfo },
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
    }
  }, [templateInfo]);

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
      window.location.replace(location.pathname);
    }
  };

  return (
    <>
      <Header />
      <p
        className="cursor-pointer pl-8 inline"
        onClick={() => navigate("/docpage")}
      >
        🔙 문서함으로 이동
      </p>
      {templateInfo ? (
        <div className="templateContainer">
          <div className="top">
            <h1>🖥 {templateInfo.title}</h1>
            <p>작성자 {templateInfo.name}</p>
            <p>작성일 {templateInfo.createdAt.slice(0, 10)}</p>
          </div>
          <div className="body">
            <ul>
              <li>
                품명 <span>{templateInfo.productName}</span>
              </li>
              <li>
                상품 정보
                <span className="truncate">{templateInfo.productInfo}</span>
              </li>
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
              <li>
                사유 <span>{templateInfo.reason}</span>
              </li>
              <li>
                단가 <span>{templateInfo.price}</span>
              </li>
              <li>
                수량 <span>{templateInfo.quantity}</span>
              </li>
              <li>
                총액 <span>{templateInfo.totalPrice}</span>
              </li>
              {templateInfo.file && (
                <p
                  className="cursor-pointer mt-4 inline-block"
                  onClick={() => window.open(templateInfo.file, "_blank")}
                >
                  📌 첨부파일 보기
                </p>
              )}
            </ul>
          </div>
          {templateInfo.result === null ? (
            isMe ? (
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
            ) : (
              <p className="text-center font-bold">대기 중인 요청입니다🤔</p>
            )
          ) : templateInfo.result ? (
            <p className="text-center text-sky-500 font-bold">
              승인된 요청입니다🥳
            </p>
          ) : (
            <p className="text-center text-rose-500 font-bold">
              거절된 요청입니다🥲
            </p>
          )}
        </div>
      ) : (
        <p>정보가 없습니다.</p>
      )}
    </>
  );
}
