import { Link } from "react-router-dom";

export default function DocList({ list, tabMenu, filter }) {
  const listArray = (filter, list) => {
    if (filter === "all") {
      return list.map((el) => {
        let purchaseId = `/purchase/${el.purchaseId}`;
        return (
          <Link key={el.purchaseId} to={purchaseId}>
            <li className="requestList">
              <p className="requester">{el.requester}</p>
              <p className="title">{el.title}</p>
              <p className="result">
                {el.result ? "승인" : el.result == null ? "대기중" : "거절"}
              </p>
              <p className="date">{el.createdAt.slice(0, 10)}</p>
            </li>
          </Link>
        );
      });
    } else {
      let filtered = list.filter((el) => {
        return el.result === filter;
      });

      return filtered.map((el) => {
        let purchaseId = `/purchase/${el.purchaseId}`;
        return (
          <Link key={el.purchaseId} to={purchaseId}>
            <li className="requestList">
              <p className="requester">{el.requester}</p>
              <p className="title">{el.title}</p>
              <p className="result">
                {el.result ? "승인" : el.result == null ? "대기중" : "거절"}
              </p>
              <p className="date">{el.createdAt.slice(0, 10)}</p>
            </li>
          </Link>
        );
      });
    }
  };
  console.log("그냥 리스트", list, "필터", filter);

  console.log("리스트어레이", listArray(filter, list));

  return (
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
          // list.map((el) => {
          //   let purchaseId = `/purchase/${el.purchaseId}`;
          //   return (
          //     <Link key={el.purchaseId} to={purchaseId}>
          //       <li className="requestList">
          //         <p className="requester">{el.requester}</p>
          //         <p className="title">{el.title}</p>
          //         <p className="result">
          //           {el.result ? "승인" : el.result == null ? "대기중" : "거절"}
          //         </p>
          //         <p className="date">{el.createdAt.slice(0, 10)}</p>
          //       </li>
          //     </Link>
          //   );
          // })
          listArray(filter, list)
        ) : (
          <p className="noRequest"> 요청이 없습니다 🙌</p>
        )}
      </ul>
    </div>
  );
}
