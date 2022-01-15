const { users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const handleToken = req.cookies.handleToken;
	const userInfo = await jwt.verify(handleToken, process.env.TOKEN);
	let userEmail = userInfo.email;
	try {
		const allUser = await users.findAll();
		let userList = [];
		allUser.forEach((el) => {
			if (el.email !== userEmail) {
				let user = {};
				user.name = el.name;
				user.id = el.id;
				userList.push(user);
			}
		});
		res.status(200).json({ data: userList });
	} catch (err) {
		console.log("getUser 에러!", err);
		res.status(500).json({ message: "서버에러입니다." });
	}
};
