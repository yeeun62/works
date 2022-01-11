import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/handle_logo.png";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import axios from "axios";

export default function Header({ isSignIn, signInHandler }) {
	const [siModal, setSimodal] = useState(false);
	const [suModal, setSumodal] = useState(false);
	const siModalHandler = () => setSimodal(!siModal);
	const suModalHandler = () => setSumodal(!suModal);
	const getSignOut = () => {
		axios.get(`${process.env.NEXT_PUBLIC_TEMPLATE_API_URL}/user/signout`);
	};

	return (
		<header className="w-full m-auto bg-blend-multiply absolute top-0 border-b-slate-300 flex-auto">
			<h1>
				<Image src={logo} alt="handle logo" width={100} height={100}></Image>
			</h1>
			<div className="navButtonList">
				{isSignIn ? (
					<Link href="/myPage">
						<button type="button" className="btn">
							마이 페이지
						</button>
					</Link>
				) : null}
				<Link href="/">
					<button type="button" className="btn">
						템플릿 페이지
					</button>
				</Link>
				{isSignIn ? (
					<button
						type="button"
						onClick={() => {
							signInHandler(false);
							getSignOut();
						}}
						className="btn"
					>
						sign out
					</button>
				) : (
					<>
						<button type="button" onClick={siModalHandler} className="btn">
							sign in
						</button>
						<div
							className={siModal}
							style={{ display: siModal ? "block" : "none" }}
						>
							<SignIn
								signInHandler={signInHandler}
								siModalHandler={siModalHandler}
							></SignIn>
						</div>
						<button type="button" onClick={suModalHandler} className="btn">
							sign up
						</button>
						<div
							className={suModal}
							style={{ display: suModal ? "block" : "none" }}
						>
							<SignUp
								signInHandler={suModalHandler}
								suModalHandler={suModalHandler}
							></SignUp>
						</div>
					</>
				)}
			</div>
		</header>
	);
}
