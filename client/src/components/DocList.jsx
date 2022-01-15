import { useNavigate } from "react-router-dom";

export default function DocList({ list, tabMenu }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="RequestContainer">
        <div className="header">
          {tabMenu ? (
            <p className="writer">요청자</p>
          ) : (
            <p className="writer">작성자</p>
          )}
          <p className="title">제목</p>
          <p className="result">결과</p>
          <p className="date">요청일</p>
        </div>
        <ul>
          {list.length ? (
            list.map((el, i) => {
              return (
                <li
                  key={i}
                  className="requestList"
                  onClick={() => {
                    navigate(`/purchase/${el.id}`, {
                      state: { isMe: tabMenu },
                    });
                  }}
                >
                  <p className="requester">{el.requester}</p>
                  <p className="title">{el.title}</p>
                  <p className="result">
                    {el.result ? "승인" : el.result == null ? "대기중" : "거절"}
                  </p>
                  <p className="date">{el.createdAt.slice(0, 10)}</p>
                </li>
              );
            })
          ) : (
            <p className="noRequest"> 요청이 없습니다 🙌</p>
          )}
        </ul>
      </div>
    </>
  );
}
