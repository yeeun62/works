import React, { useState } from "react";
import Purchase from "../src/components/Purchase";

export default function Home() {
  const [modal, setModal] = useState(false);

  const modalHandler = (b) => {
    setModal(b);
  };

  return (
    <div className="tempWrapper">
      <div className="templateDiv">
        <h2>🖥 비품 신청</h2>
        <button type="button" onClick={() => modalHandler(true)}>
          작성하기
        </button>
      </div>
      {modal ? <Purchase modalHandler={modalHandler}></Purchase> : null}
      <div className="templateDiv">
        <h2>📋 비품 신청</h2>
        <button type="button" onClick={() => modalHandler(true)}>
          작성하기
        </button>
      </div>
      <div className="templateDiv">
        <h2>📋 비품 신청</h2>
        <button type="button" onClick={() => modalHandler(true)}>
          작성하기
        </button>
      </div>
    </div>
  );
}
