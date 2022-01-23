import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import DocList from "../components/DocList";
import "../style/mypage.css";

const Mypage = () => {
  const [tabMenu, setTabMenu] = useState(false);
  const [list, setList] = useState({ myRequestList: [], myResponseList: [] });
  const [filter, setFilter] = useState("all");

  const tabHandler = (boolean) => {
    setTabMenu(boolean);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TEMPLATE_API_URL}/user/doc`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setList({
            myRequestList: res.data.myRequestList,
            myResponseList: res.data.myResponserList,
          });
        }
      });
  }, []);

  return (
    <>
      <Header />
      <div className="myPageWrapper">
        <select
          className="filterDoc mb-4 border-b border-[#282828] p-0.5 ml-4"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">모든 문서</option>
          <option value="null">대기 중</option>
          <option value="true">승인</option>
          <option value="false">거절</option>
        </select>
        <div className="tabs is-boxed">
          <ul>
            <li
              className={tabMenu ? "is-active w-1/2 leftTab" : "w-1/2"}
              onClick={() => tabHandler(true)}
            >
              <a>
                <span className="icon is-small">
                  <i className="fas fa-image" aria-hidden="true"></i>
                </span>
                <span>보낸 요청</span>
              </a>
            </li>
            <li
              className={tabMenu ? "w-1/2" : "is-active w-1/2 rightTab"}
              onClick={() => tabHandler(false)}
            >
              <a>
                <span className="icon is-small">
                  <i className="far fa-file-alt" aria-hidden="true"></i>
                </span>
                <span>받은 요청</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="tabMenu w-full bg-white border border-[#ddd] text-slate-600">
          {
            <DocList
              tabMenu={tabMenu}
              list={tabMenu ? list.myRequestList : list.myResponseList}
              filter={filter}
            />
          }
        </div>
      </div>
    </>
  );
};

export default Mypage;
