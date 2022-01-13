module.exports = (req, res) => {
	console.log("들어옴");
	res
		.cookie("handleToken", "", {
			httpOnly: true,
			maxAge: 1,
		})
		.status(200)
		.json({ message: "로그아웃이 완료되었습니다🥳" });
};
