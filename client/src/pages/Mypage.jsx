import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import DocList from "../components/DocList";
import "../style/mypage.css";

const Mypage = ({ userInfo }) => {
  const [tabMenu, setTabMenu] = useState(false);
  const [list, setList] = useState({ myRequestList: [], myResponseList: [] });

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
      <Header userInfo={userInfo} />
      <div className="myPageWrapper">
        <div className="tabButton">
          <button
            className={tabMenu ? "myRequest btn trueTab" : "myRequest btn"}
            onClick={() => tabHandler(true)}
          >
            보낸 요청
          </button>
          <button
            className={
              tabMenu ? "receivedRequest btn" : "receivedRequest btn trueTab"
            }
            onClick={() => tabHandler(false)}
          >
            받은 요청
          </button>
        </div>
        <div className="tabMenu">
          {
            <DocList
              tabMenu={tabMenu}
              list={tabMenu ? list.myRequestList : list.myResponseList}
            />
          }
        </div>
      </div>
    </>
  );
};

export default Mypage;
