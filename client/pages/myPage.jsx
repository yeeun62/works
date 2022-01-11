import Head from "next/head";
import { useState } from "react";
import ReceivedRequest from "../src/components/ReceivedRequest";
import MyRequest from "../src/components/MyRequest";
import axios from "axios";

export default function MyPage() {
	// props로 list  받아오고 스테이트 지우기.
	const [list, setList] = useState({ myRequest: [], myResponse: [] });
	const [tabMenu, setTabMenu] = useState(false);
	const tabHandler = () => {
		setTabMenu(!tabMenu);
	};

	return (
		<>
			<Head>
				<title>handle works | my page</title>
				<link
					rel="stylesheet"
					href="https://api.handle.im/handle/css/handle.common.css"
				></link>
			</Head>
			<div>
				<button type="button" className="myRequest btn" onClick={tabHandler}>
					보낸 요청
				</button>
				<button
					type="button"
					className="receivedRequest btn"
					onClick={tabHandler}
				>
					받은 요청
				</button>
				{tabMenu ? (
					<MyRequest list={list.myRequest}></MyRequest>
				) : (
					<ReceivedRequest list={list.myResponse}></ReceivedRequest>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	console.log(context.req);
	let list;
	await axios
		.get(`${process.env.NEXT_PUBLIC_TEMPLATE_API_URL}/user/doc`)
		.then((res) => {
			list = {
				myRequest: res.data.myRequest,
				myResponse: res.data.myResponse,
			};
		});

	return {
		props: { list }, // will be passed to the page component as props
	};
}
