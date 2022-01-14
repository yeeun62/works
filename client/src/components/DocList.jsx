import { Link } from "react-router-dom";

export default function DocList({ list, userInfo }) {
  return (
    <>
      <div className="RequestContainer">
        <div className="header">
          <p className="writer">작성자</p>
          <p className="title">제목</p>
          <p className="result">결과</p>
          <p className="date">요청일</p>
        </div>
        <ul>
          {list.length ? (
            list.map((el) => {
              <li key={el.id} className="requestList">
                <Link to="/purchase" state={{ templateInfo: el }}>
                  <p className="requester">{el.requester}</p>
                  <p className="title">{el.title}</p>
                  <p className="result">{el.result}</p>
                  <p className="date">{el.updatedAt}</p>
                </Link>
              </li>;
            })
          ) : (
            <p className="noRequest"> 요청이 없습니다 🙌</p>
          )}
        </ul>
      </div>
    </>
  );
}
