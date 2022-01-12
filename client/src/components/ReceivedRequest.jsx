import Link from "next/link";

export default function ReceivedRequest({ list }) {
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
          {/* {list.length ? (
            list.map((el, i) => {
              <Link
                href={{
                  pathname: `/purchases/${el.id}`,
                  query: { id: el.id },
                }}
              >
                <li key={i} className="requestList">
                  <p className="writer">{el.requester}</p>
                  <p className="title">{el.title}</p>
                  <p className="result">{el.result}</p>
                  <p className="date">{el.createdDate}</p>
                </li>
              </Link>;
            })
          ) : (
            <p>받은 요청이 없습니다 🙌</p>
          )} */}
          <Link
            href={{
              pathname: `/purchases/${1}`,
              query: { id: 1 },
            }}
          >
            <li className="requestList">
              <p className="writer">박은빈</p>
              <p className="title">마우스가 필요합니다.</p>
              <p className="result">진행 중</p>
              <p className="date">21.12.31</p>
            </li>
          </Link>
          <li className="requestList">
            <p className="writer">방예은</p>
            <p className="title">키보드가 너무 좋습니다.</p>
            <p className="result">진행 중</p>
            <p className="date">22.01.02</p>
          </li>
        </ul>
      </div>
    </>
  );
}
