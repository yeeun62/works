const { handle_works_users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
	const { name, email, password, phoneNumber } = req.body;

	let existEmail;
	let existPhoneNumber;
	if (email) {
		existEmail = await handle_works_users.findOne({ where: { email } });
	} else if (phoneNumber) {
		existPhoneNumber = await handle_works_users.findOne({
			where: { phoneNumber },
		});
	}

	let userInfo = {
		name,
		email,
		phoneNumber,
	};

	if (existEmail) {
		return res.status(409).json({ message: "사용중인 이메일입니다🥲" });
	} else if (existPhoneNumber) {
		return res.status(409).json({
			message:
				"해당 휴대폰번호로 가입된 계정이 있습니다. 한 휴대폰번호로 한 번만 가입이 가능합니다🥲",
		});
	} else {
		if (password) {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, async (err, hash) => {
					if (err) {
						console.log("bcrypt 에러!");
						throw err;
					} else {
						let newUser = await handle_works_users.create({
							...userInfo,
							password: hash,
						});
						userInfo.id = newUser.id;
						const userToken = await jwt.sign(userInfo, process.env.TOKEN);
						res
							.cookie("handleToken", userToken, { httpOnly: true })
							.status(200)
							.json({ message: "회원가입에 성공하였습니다🥳" });
					}
				});
			});
		} else {
			return res.status(200).json({ message: "사용중인 유저가 없습니다🥳" });
		}
	}
};
