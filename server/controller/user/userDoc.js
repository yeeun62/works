const { purchaseAgreement } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const handleToken = req.cookies.handleToken;
	try {
		const userInfo = await jwt.verify(handleToken, process.env.TOKEN);
		let myRequest = await purchaseAgreement.findAll({
			where: { requester: userInfo.id },
		});
		let myResponser = await await purchaseAgreement.findAll({
			where: {
				responser: userInfo.id,
			},
		});

		res.status(200).json({ myRequest, myResponser });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "서버에러입니다." });
	}
};
