import { Link } from "react-router-dom";

export default function DocList({ list, tabMenu, filter }) {
  const listArr = (list, filter) => {
    if (filter === "all") return list;
    return list.filter((el) => {
      return `${el.result}` == filter;
    });
  };

  return (
    <div className="RequestContainer overflow-hidden">
      <div className="header">
        {tabMenu ? (
          <p className="writer">요청자</p>
        ) : (
          <p className="writer">작성자</p>
        )}
        <p className="header_title">제목</p>
        <p className="result">결과</p>
        <p className="date">요청일</p>
      </div>
      <ul className="sm:text-sm">
        {list.length ? (
          listArr(list, filter).length ? (
            listArr(list, filter).map((el) => {
              let purchaseId = `/purchase/${el.purchaseId}`;
              return (
                <Link key={el.purchaseId} to={purchaseId}>
                  <li className="requestList sm:text-xs">
                    <p className="requester">{el.requester}</p>
                    <p className="header_title">{el.title}</p>
                    <p className="result">
                      {el.result
                        ? "승인"
                        : el.result == null
                        ? "대기중"
                        : "거절"}
                    </p>
                    <p className="date">{el.createdAt.slice(0, 10)}</p>
                  </li>
                </Link>
              );
            })
          ) : (
            <p className="noRequest"> 요청이 없습니다 🙌</p>
          )
        ) : (
          <p className="noRequest"> 요청이 없습니다 🙌</p>
        )}
      </ul>
    </div>
  );
}
