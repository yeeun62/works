const { users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
	const { name, email, password, phoneNumber } = req.body;

	let findUser = await users.findOne({ where: { email } });

	let userInfo = {
		name,
		email,
		password,
		phoneNumber,
	};

	if (findUser) {
		return res.status(409).json({ message: "사용중인 이메일입니다🥲" });
	} else {
		if (password) {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, async (err, hash) => {
					if (err) {
						console.log("bcrypt 에러!");
						throw err;
					} else {
						await users.create({
							...userInfo,
							password: hash,
						});
						const userToken = await jwt.sign(userInfo, process.env.TOKEN);
						res
							.cookie("handleToken", userToken, { httpOnly: true })
							.status(200)
							.json({ message: "회원가입에 성공하였습니다🥳" });
					}
				});
			});
		} else {
			return res.status(200).json({ message: "사용가능한 이메일입니다🥳" });
		}
	}
};
