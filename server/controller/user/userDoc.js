const { users, purchaseAgreement } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const handleToken = req.cookies.handleToken;
	try {
		const userInfo = await jwt.verify(handleToken, process.env.TOKEN);

		let myRequest = await purchaseAgreement.findAll({
			where: { requester: userInfo.id },
		});

		let myRequestList = await Promise.all(
			myRequest.map(async (res) => {
				let list = await users
					.findOne({ where: { id: res.responser } })
					.then((el) => {
						return {
							id: el.id,
							requester: el.name,
							title: res.title,
							result: res.result,
							createdAt: res.createdAt,
						};
					});
				return list;
			})
		);

		let myResponser = await purchaseAgreement.findAll({
			where: {
				responser: userInfo.id,
			},
		});

		let myResponserList = await Promise.all(
			myResponser.map(async (res) => {
				let list = await users
					.findOne({ where: { id: res.requester } })
					.then((el) => {
						return {
							id: el.id,
							requester: el.name,
							title: res.title,
							result: res.result,
							createdAt: res.createdAt,
						};
					});
				return list;
			})
		);

		res.status(200).json({ myRequestList, myResponserList });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "서버에러입니다." });
	}
};
