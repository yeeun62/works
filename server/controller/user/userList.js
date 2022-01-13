const { users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	console.log(req.cookies);
	const handleToken = req.cookies.handleToken;
	const userInfo = await jwt.verify(handleToken, process.env.TOKEN);
	try {
		const allUser = await users.findAll();
		let userList = [];
		allUser.forEach((el) => {
			if (el.dataValues.id !== userInfo.id) {
				userList.push(el.name);
			}
		});
		res.status(200).json({ data: userList });
	} catch (err) {
		console.log("getUser 에러!", err);
		res.status(500).json({ message: "서버에러입니다." });
	}
	// const handleToken = req.cookies.handleToken;
	// const userInfo = await jwt.verify(handleToken, process.env.TOKEN);
	// let userList;
	// try {
	// 	if (userInfo) {
	// 		userList = await users.findAll({ attributes: ["name"] });
	// 		res.status(200).json({ data: userList });
	// 	} else res.status(500).json({ message: "유효하지 않은 토큰입니다." });
	// } catch (err) {
	// 	console.log("getUser 에러!", err);
	// 	res.status(500).json({ message: "서버에러입니다." });
	// }
};
