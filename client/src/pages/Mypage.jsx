import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import DocList from "../components/DocList";
import "../style/mypage.css";

const Mypage = ({ userInfo }) => {
  const [tabMenu, setTabMenu] = useState(false);
  const [list, setList] = useState({ myRequest: [], myResponse: [] });
  
  const tabHandler = (b) => {
    setTabMenu(b);
  };

  // useEffect(() => {
  //   console.log(document.cookie);
  //   let cookie = document.cookie;
  //   try {
  //     axios
  //       .get(`${process.env.REACT_APP_TEMPLATE_API_URL}/user/doc`, {
  //         headers: { cookie: cookie },
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setList({
  //             myRequest: res.data.myRequest,
  //             myResponse: res.data.myResponser,
  //           });
  //           console.log(res.data);
  //         } else {
  //           console.log(res);
  //         }
  //       });
  //   } catch (err) {
  //     console.log("캐치에러", err);
  //   }
  // }, [list]);

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
							list={tabMenu ? list.myRequest : list.myResponse}
							userInfo={userInfo}
						></DocList>
					}
				</div>
			</div>
		</>
	);
};

export default Mypage;
