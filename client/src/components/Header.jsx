const Header = () => {
	return (
		<header className="flex justify-between h-16 border-b-[1px] mb-20">
			<p className="logo text-[#e0de1b] text-3xl cursor-pointer leading-[4rem]">
				handle
			</p>
			<div className="flex justify-around w-40 items-center">
				<button type="button">로그인</button>
				<button type="button">회원가입</button>
			</div>
		</header>
	);
};

export default Header;
