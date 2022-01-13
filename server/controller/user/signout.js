module.exports = (req, res) => {
	res
		.status(200)
		.cookie("handleToken", "", {
			httpOnly: true,
			maxAge: 1,
		})
		.json({ message: "로그아웃이 완료되었습니다🥳" });
};
