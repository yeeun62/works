const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const handleToken = req.cookies.handleToken;
	if (!handleToken) {
		return res.status(404).json({ message: "로그인이 되어있지 않습니다." });
	}
	const userInfo = await jwt.verify(handleToken, process.env.TOKEN);
	console.log("??", userInfo);
	// delete userInfo.createdAt;
	// delete userInfo.updatedAt;
	// delete userInfo.iat;
	res.status(200).json({ userInfo });
};
